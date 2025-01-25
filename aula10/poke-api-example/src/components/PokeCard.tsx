import { PokemonListResult } from "@/api/domain"

export type Props = {
  data: PokemonListResult
}

export default function PokeCard({ data }: Props) {
  const urlParts = new URL(data.url).pathname.split('/').filter(it => it != '')
  const id = urlParts[urlParts.length - 1]
  const href = `/pokeview/${id}`

  return (
    <a href={href} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
      src={data.image} alt="" /> */}
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h5>
        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
      </div>
    </a>
  )
}
