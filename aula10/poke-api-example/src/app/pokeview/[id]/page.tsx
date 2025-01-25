import { getPokemonData } from "@/api/requests"

type Props = {
  params: Promise<{ id: string }>
}

export default async function PokeViewPage({ params }: Props) {
  const id = (await params).id
  const data = await getPokemonData(id)

  return (
    <div>
      <h1>NOME: {data.name}</h1>
      <img src={data.sprites.front_default} alt="" />

      <h2>types</h2>
      {data.types.map(it => {
        return <span key={it.slot}>{it.type.name}</span>
      })}
    </div>
  )
}
