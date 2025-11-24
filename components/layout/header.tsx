import { GalleryVerticalEnd } from 'lucide-react';
import { ProfileDropdown } from './profile-dropdown';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="container mx-auto w-full border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-green-600 text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Voicimaplante.
        </Link>
        <div className="flex gap-4 items-center">
          <ProfileDropdown />
          <Link href={'/offers/new'}>
            <Button>Déposer une annonce</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
