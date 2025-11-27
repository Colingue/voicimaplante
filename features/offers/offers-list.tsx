import { Offer } from '@/utils/definition';
import OfferCard from './components/offer-card';

interface OffersListProps {
  offers: Offer[];
}

export default function OffersList({ offers }: OffersListProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Annonces disponibles</h3>
      {offers.map((offer) => (
        <OfferCard offer={offer} />
      ))}
    </div>
  );
}
