"use client"

import { PokemonListResult } from "@/api/domain";
import { listPokemons } from "@/api/requests";
import PokeCard from "@/components/PokeCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchQuery = useState('')
  const [pokemons, setPokemons] = useState<PokemonListResult[]>([])

  useEffect(() => {
    listPokemons()
      .then(setPokemons)
      .catch(it => setErrorMsg(it.message))
  }, [])

  return (
    <>
      <header className="py-3 bg-gray-600 flex items-center justify-center">
        <SearchBar />
      </header>
      <main>
        <div className="px-3 pt-4 flex items-center gap-2 flex-col">
          {pokemons.map(it => <PokeCard key={it.name} data={it} />)}
        </div>
      </main>
      <footer></footer>
    </>
  );
}
