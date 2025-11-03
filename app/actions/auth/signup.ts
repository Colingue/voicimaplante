'use server';

import { FormState, SignupFormSchema } from '@/utils/definition';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  const supabase = await createClient();

  console.log('Signup action called with state:', state, formData);
  console.log(formData.get('email'), formData.get('password'));
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { message: 'An error occurred while creating your account' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
