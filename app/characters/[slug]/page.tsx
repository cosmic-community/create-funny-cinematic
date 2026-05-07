// app/characters/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCharacter } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const character = await getCharacter(slug)

  if (!character) notFound()

  const name = getMetafieldValue(character.metadata?.name) || character.title
  const description = getMetafieldValue(character.metadata?.description)
  const voiceStyle = getMetafieldValue(character.metadata?.voice_style)
  const language = getMetafieldValue(character.metadata?.language_accent)
  const personality = getMetafieldValue(character.metadata?.personality_traits)
  const image = character.metadata?.reference_image

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/characters" className="text-yellow-400 hover:text-yellow-300 text-sm mb-8 inline-block">
        ← Back to Characters
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {image && (
          <div className="rounded-2xl overflow-hidden bg-cinema-darker">
            <img
              src={`${image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider gradient-text mb-6">
            {name}
          </h1>

          {description && (
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{description}</p>
          )}

          <div className="space-y-6">
            {voiceStyle && (
              <div className="p-4 rounded-lg bg-cinema-darker border border-yellow-500/20">
                <div className="text-yellow-400 text-sm font-medium mb-1">🎤 Voice Style</div>
                <div className="text-white">{voiceStyle}</div>
              </div>
            )}
            {language && (
              <div className="p-4 rounded-lg bg-cinema-darker border border-yellow-500/20">
                <div className="text-yellow-400 text-sm font-medium mb-1">🌍 Language / Accent</div>
                <div className="text-white">{language}</div>
              </div>
            )}
            {personality && (
              <div className="p-4 rounded-lg bg-cinema-darker border border-yellow-500/20">
                <div className="text-yellow-400 text-sm font-medium mb-1">✨ Personality Traits</div>
                <div className="text-white">{personality}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}