import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Offer } from '@/utils/definition';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function OfferCard({ offer }: { offer: Offer }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userInitials = user?.user_metadata.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() as string;

  return (
    <>
      <div className="flex gap-4 space-x-4">
        <div>
          <Image
            src={'/img/monstera.png'}
            alt={offer.plants?.name || 'Plant Image'}
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold text-lg">{offer.plants?.name}</p>
          <p>{offer.description}</p>
          <div className="flex gap-2 items-center">
            <Avatar className="cursor-pointer">
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <Link href={'/'}>
              {offer.profiles?.username || 'Utilisateur inconnu'}
            </Link>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}
