'use server';

import { SignupFormState, SignupFormSchema } from '@/utils/definition';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signup(
  initialState: SignupFormState,
  formData: FormData,
) {
  const supabase = await createClient();

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!validatedFields.success) {
    return {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm-password') as string,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    name: validatedFields.data.name,
  };

  const { error, data: dataSupabase } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  console.log('Signup Error:', error, dataSupabase);

  if (error) {
    return { message: 'An error occurred while creating your account' };
  }

  revalidatePath('/', 'layout');
  redirect('/mail-confirmation');
}
