import { Badge } from '@/components/ui/badge';
import { Plant } from '@/utils/definition';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';

export default function PlantGridCart({ plant }: { plant: Plant }) {
  return (
    <div className="flex flex-col items-centertext-gray-500">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Image
          src={'/img/monstera.png'}
          alt={plant.name}
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <p className="mt-2 ">{plant.name}</p>

      <Badge className="mt-1" variant={'secondary'}>
        0 annonce disponible
      </Badge>
    </div>
  );
}
