import Link from 'next/link'
import type { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CharacterCard({ character }: { character: Character }) {
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const description = getMetafieldValue(character.metadata?.description)
  const voiceStyle = getMetafieldValue(character.metadata?.voice_style)
  const image = character.metadata?.reference_image

  return (
    <Link href={`/characters/${character.slug}`}>
      <article className="card-glow rounded-xl overflow-hidden bg-cinema-darker h-full">
        {image && (
          <div className="aspect-[4/3] overflow-hidden bg-black">
            <img
              src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={name}
              width={400}
              height={300}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-display text-2xl tracking-wide gradient-text mb-2">{name}</h3>
          {voiceStyle && (
            <p className="text-yellow-400/80 text-sm mb-3 italic">🎤 {voiceStyle}</p>
          )}
          {description && (
            <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
          )}
        </div>
      </article>
    </Link>
  )
}