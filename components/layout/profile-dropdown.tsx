import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { logout } from '@/app/actions/auth/logout';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export async function ProfileDropdown() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>Profil</DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Se deconnecter</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
