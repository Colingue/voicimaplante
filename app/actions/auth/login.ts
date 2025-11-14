'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { LoginFormSchema, LoginFormState } from '@/utils/definition';

export async function login(initialState: LoginFormState, formData: FormData) {
  const supabase = await createClient();

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: dataSupabase } =
    await supabase.auth.signInWithPassword(data);

  console.log('Login Error:', error, dataSupabase);
  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
