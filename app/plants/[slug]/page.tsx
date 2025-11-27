import { Button } from '@/components/ui/button';
import OffersList from '@/features/offers/offers-list';
import PlantDetailInfo from '@/features/plants/plant-detail-info';
import { Plant } from '@/utils/definition';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

interface PlantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlantPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: plant } = await supabase
    .from('plants')
    .select('*')
    .eq('slug', slug)
    .single<Plant>();

  if (!plant) {
    return <div>Plant not found</div>;
  }

  const { data: offers } = await supabase
    .from('offers')
    .select(
      `
      *,
      plants!inner (
        name,
        slug
      ),
      profiles (
        username
      )
    `,
    )
    .eq('plants.slug', slug);

  return (
    <div className="mt-16">
      <div className="mb-8">
        <PlantDetailInfo name={plant.name} photoUrl={'/img/monstera.png'} />
      </div>

      <OffersList offers={offers || []} />
    </div>
  );
}
