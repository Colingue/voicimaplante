'use client';

import { createClient } from '@/utils/supabase/client';
import PlantGridCart from './plant-grid-cart';
import { useEffect, useState } from 'react';
import { Plant } from '@/utils/definition';

type PlantGridProps = {
  filters: {
    name?: string;
  };
};

export function PlantGrid({ filters }: PlantGridProps) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data } = await supabase
        .from('plants')
        .select('*')
        .ilike('name', `%${filters.name || ''}%`);
      setPlants(data as Plant[]);
    };

    fetchPlants();
  }, [filters.name]);

  return (
    <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {plants.map((plant, index) => (
        <PlantGridCart key={index} plant={plant} />
      ))}
    </div>
  );
}
