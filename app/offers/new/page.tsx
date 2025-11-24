import OfferForm from '@/features/offers/forms/offer-form';
import { createClient } from '@/utils/supabase/server';

export default async function NewOfferPage() {
  const supabase = await createClient();
  const { data: plants } = await supabase
    .from('plants')
    .select('id, name')
    .order('name');

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Déposer une annonce</h1>
      <OfferForm plants={plants || []} />
    </div>
  );
}
