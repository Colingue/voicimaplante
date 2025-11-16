'use client';

import { logout } from '@/app/actions/auth/logout';
import { Button } from '../ui/button';
import { GalleryVerticalEnd } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between h-16 flex items-center">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-green-600 text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Voicimaplante.
        </a>
        <Button variant={'outline'} onClick={logout}>
          Se deconnecter
        </Button>
      </div>
    </header>
  );
}
