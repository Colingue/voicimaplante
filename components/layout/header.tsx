import { GalleryVerticalEnd } from 'lucide-react';
import { ProfileDropdown } from './profile-dropdown';
import Link from 'next/link';
import { Button } from '../ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          {user ? (
            <>
              <ProfileDropdown />
              <Link href={'/offers/new'}>
                <Button>Déposer une annonce</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={'/signup'}>
                <Button variant={'link'}>S'inscrire</Button>
              </Link>
              <Link href={'/login'}>
                <Button>Se connecter</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
