'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('Logging out user:', user);
  if (user) {
    supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}
