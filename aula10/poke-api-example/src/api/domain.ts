export interface Pokemon { }
export interface PokemonListResult {
  name: string
  url: string
}

export interface PokemonDataResult {
  id: number
  name: string
  cries: {
    latest: string
  }
  sprites: {
    front_default: string
  }
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
}
