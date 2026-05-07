// app/video-prompts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getVideoPrompt, getMetafieldValue } from '@/lib/cosmic'

export default async function VideoPromptPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const prompt = await getVideoPrompt(slug)

  if (!prompt) notFound()

  const title = getMetafieldValue(prompt.metadata?.title) || prompt.title
  const sceneDescription = getMetafieldValue(prompt.metadata?.scene_description)
  const dialogue = getMetafieldValue(prompt.metadata?.dialogue)
  const dialogueTranslation = getMetafieldValue(prompt.metadata?.dialogue_translation)
  const styleNotes = getMetafieldValue(prompt.metadata?.style_notes)
  const duration = getMetafieldValue(prompt.metadata?.duration)
  const status = getMetafieldValue(prompt.metadata?.generation_status)
  const image = prompt.metadata?.reference_photo
  const character = prompt.metadata?.character
  const scene = prompt.metadata?.scene

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/video-prompts" className="text-yellow-400 hover:text-yellow-300 text-sm mb-8 inline-block">
        ← Back to Video Prompts
      </Link>

      {image && (
        <div className="rounded-2xl overflow-hidden mb-8 max-w-5xl mx-auto">
          <img
            src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={1200}
            height={675}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {status && (
            <span className="px-3 py-1 text-xs font-medium rounded-full border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              {status}
            </span>
          )}
          {duration && (
            <span className="text-gray-500 text-sm">⏱ {duration}</span>
          )}
        </div>

        <h1 className="font-display text-5xl md:text-6xl tracking-wider gradient-text mb-8">
          {title}
        </h1>

        {sceneDescription && (
          <section className="mb-8 p-6 rounded-xl bg-cinema-darker border border-yellow-500/20">
            <h2 className="font-display text-2xl text-yellow-400 mb-4 tracking-wider">📝 SCENE DESCRIPTION</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{sceneDescription}</p>
          </section>
        )}

        {(dialogue || dialogueTranslation) && (
          <section className="mb-8 p-6 rounded-xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/30">
            <h2 className="font-display text-2xl text-yellow-400 mb-4 tracking-wider">🗣️ DIALOGUE</h2>
            {dialogue && (
              <div className="mb-4">
                <div className="text-yellow-400/60 text-xs uppercase tracking-wider mb-2">Original (Darija)</div>
                <p className="arabic-text text-white">{dialogue}</p>
              </div>
            )}
            {dialogueTranslation && (
              <div>
                <div className="text-yellow-400/60 text-xs uppercase tracking-wider mb-2">Translation</div>
                <p className="text-gray-300 italic">{dialogueTranslation}</p>
              </div>
            )}
          </section>
        )}

        {styleNotes && (
          <section className="mb-8 p-6 rounded-xl bg-cinema-darker border border-yellow-500/20">
            <h2 className="font-display text-2xl text-yellow-400 mb-4 tracking-wider">🎨 STYLE NOTES</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{styleNotes}</p>
          </section>
        )}

        {/* Related Character & Scene */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {character && character.metadata && (
            <Link href={`/characters/${character.slug}`}>
              <div className="card-glow rounded-xl p-6 bg-cinema-darker">
                <div className="text-yellow-400/60 text-xs uppercase tracking-wider mb-3">Featured Character</div>
                <div className="flex items-center gap-4">
                  {character.metadata.reference_image && (
                    <img
                      src={`${character.metadata.reference_image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={character.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-display text-xl gradient-text">
                      {getMetafieldValue(character.metadata.name) || character.title}
                    </div>
                    <div className="text-gray-500 text-sm">View Profile →</div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {scene && scene.metadata && (
            <Link href={`/scenes/${scene.slug}`}>
              <div className="card-glow rounded-xl p-6 bg-cinema-darker">
                <div className="text-yellow-400/60 text-xs uppercase tracking-wider mb-3">Scene Setting</div>
                <div className="flex items-center gap-4">
                  {scene.metadata.reference_photo && (
                    <img
                      src={`${scene.metadata.reference_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={scene.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <div className="font-display text-xl text-white">
                      {getMetafieldValue(scene.metadata.scene_name) || scene.title}
                    </div>
                    <div className="text-gray-500 text-sm">View Scene →</div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}