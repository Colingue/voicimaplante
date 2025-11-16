'use client';

import SearchBar from '@/components/forms/search-bar';
import { PlantGrid } from './plant-grid';
import { useState } from 'react';

export default function PlantCatalog() {
  const [search, setSearch] = useState('');
  return (
    <>
      <h1 className="text-3xl font-bold">
        Trouver la plante qui est faite pour vous
      </h1>

      <SearchBar onChange={setSearch} />
      <PlantGrid filters={{ name: search }} />
    </>
  );
}
