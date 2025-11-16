import PlantDetailInfo from '@/features/plants/PlantDetailInfo';
import { Plant } from '@/utils/definition';
import { createClient } from '@/utils/supabase/server';

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
    </div>
  );
}
