import { getCharacters } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export default async function CharactersPage() {
  const characters = await getCharacters()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider gradient-text mb-4">
          🐵 CHARACTERS
        </h1>
        <p className="text-gray-400 text-lg">
          Meet the cast of our cinematic universe
        </p>
      </div>

      {characters.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No characters available yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  )
}