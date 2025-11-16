'use client';

import { Input } from '../ui/input';

type SearchBarProps = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div className="mt-4">
      <Input
        type="text"
        placeholder="Rechercher une plante..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
      />
    </div>
  );
}
