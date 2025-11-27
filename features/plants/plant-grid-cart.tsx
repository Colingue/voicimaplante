import { Badge } from '@/components/ui/badge';
import { Plant } from '@/utils/definition';
import Image from 'next/image';
import Link from 'next/link';

export default function PlantGridCart({
  plant,
  offerCount = 0,
}: {
  plant: Plant;
  offerCount?: number;
}) {
  return (
    <Link href={`/plants/${plant.slug}`}>
      <div className="flex flex-col items-centertext-gray-500">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={
              Math.random() > 0.6
                ? '/img/monstera.png'
                : Math.random() > 0.3
                  ? '/img/calathea.png'
                  : '/img/ficus.png'
            }
            alt={plant.name}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
        <p className="mt-2 ">{plant.name}</p>

        <Badge
          className="mt-1"
          variant={offerCount > 0 ? 'default' : 'secondary'}
        >
          {offerCount}{' '}
          {offerCount && offerCount > 1
            ? 'offres disponibles'
            : 'offre disponible'}
        </Badge>
      </div>
    </Link>
  );
}
