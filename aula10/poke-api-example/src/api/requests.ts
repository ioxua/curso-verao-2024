import { PokemonDataResult, PokemonListResult } from "./domain"

const baseUrl = 'https://pokeapi.co/api/v2'

export function listPokemons(): Promise<PokemonListResult[]> {
  const url = `${baseUrl}/pokemon`

  return fetch(url)
    .then(it => it.json())
    .then(it => it.results)
}

export function getPokemonData(id: string): Promise<PokemonDataResult> {
  const url = `${baseUrl}/pokemon/${id}`

  return fetch(url)
    .then(it => it.json())
}
