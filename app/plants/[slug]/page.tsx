import { Button } from '@/components/ui/button';
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

  return (
    <div className="mt-16">
      <PlantDetailInfo name={plant.name} photoUrl={'/img/monstera.png'} />
      <Link href={`/offers/new?plantid=${plant.id}`}>
        <Button>Déposer une annonce de mon {plant.name}</Button>
      </Link>
    </div>
  );
}
