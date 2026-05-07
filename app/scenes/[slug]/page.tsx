// app/scenes/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getScene, getMetafieldValue } from '@/lib/cosmic'

export default async function ScenePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const scene = await getScene(slug)

  if (!scene) notFound()

  const name = getMetafieldValue(scene.metadata?.scene_name) || scene.title
  const description = getMetafieldValue(scene.metadata?.description)
  const ambient = getMetafieldValue(scene.metadata?.ambient_sounds)
  const lighting = getMetafieldValue(scene.metadata?.lighting_notes)
  const image = scene.metadata?.reference_photo

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/scenes" className="text-yellow-400 hover:text-yellow-300 text-sm mb-8 inline-block">
        ← Back to Scenes
      </Link>

      {image && (
        <div className="rounded-2xl overflow-hidden mb-8 max-w-5xl mx-auto">
          <img
            src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={name}
            width={1200}
            height={675}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-6">
          {name}
        </h1>

        {description && (
          <p className="text-gray-300 text-lg leading-relaxed mb-8">{description}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ambient && (
            <div className="p-6 rounded-lg bg-cinema-darker border border-yellow-500/20">
              <div className="text-yellow-400 text-sm font-medium mb-2">🔊 Ambient Sounds</div>
              <div className="text-white">{ambient}</div>
            </div>
          )}
          {lighting && (
            <div className="p-6 rounded-lg bg-cinema-darker border border-yellow-500/20">
              <div className="text-yellow-400 text-sm font-medium mb-2">💡 Lighting Notes</div>
              <div className="text-white">{lighting}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}