'use client';

import { useActionState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { postOffer } from '@/app/actions/offers/postOffer';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function OfferForm({
  plants,
}: {
  plants: { id: number; name: string }[];
}) {
  const searchParams = useSearchParams();
  const prefillPlantId = searchParams.get('plantid') || '';
  const router = useRouter();

  const [state, action, pending] = useActionState(postOffer, undefined);
  console.log('state', state);
  useEffect(() => {
    if (state?.message) {
      toast.success('Votre annonce a bien été créée !');
      router.push('/profile');
    }
  }, [state?.message]);

  return (
    <form action={action} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="plantId">Plante</FieldLabel>
        <Select name="plantId" defaultValue={state?.plantId ?? prefillPlantId}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une plante" />
          </SelectTrigger>
          <SelectContent>
            {plants.map((plant) => (
              <SelectItem key={plant.id} value={plant.id.toString()}>
                {plant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.plantId && (
          <FieldError
            errors={state?.errors?.plantId.map((e) => ({
              message: e,
            }))}
          />
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="description" className="block text-sm font-medium">
          Description
        </FieldLabel>
        <Textarea
          name="description"
          placeholder="Ajoutez une description (facultatif)"
          defaultValue={state?.description}
        />
        {state?.errors?.description && (
          <FieldError
            errors={state?.errors?.description.map((e) => ({
              message: e,
            }))}
          />
        )}
      </Field>
      <Button type="submit" disabled={pending}>
        Déposer l'annonce
      </Button>
    </form>
  );
}
