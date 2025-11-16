import { Card } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';

export default async function ProfileOffers() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const offers = await supabase
    .from('offers')
    .select('*, plants!inner(name)')
    .eq('user_id', user?.id);
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Mes plantes disponibles à l'échange
      </h2>
      {offers.data === null ? (
        <div>You have no offers.</div>
      ) : (
        <div>
          {offers.data?.map((offer) => (
            <div key={offer.id} className="mb-2">
              <p className="font-bold">{offer.plants.name}</p>
              {offer.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
