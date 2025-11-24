'use server';

import { OfferFormSchema, OfferFormState } from '@/utils/definition';
import { createClient } from '@/utils/supabase/server';

export async function postOffer(
  initialState: OfferFormState,
  formData: FormData,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const validatedFields = OfferFormSchema.safeParse({
    plantId: formData.get('plantId'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      plantId: formData.get('plantId') as string,
      description: formData.get('description') as string,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await supabase.from('offers').insert({
    plant_id: validatedFields.data.plantId,
    description: validatedFields.data.description,
    user_id: user?.id,
  });

  return {
    message: 'Votre annonce a bien été créée.',
  };
}
