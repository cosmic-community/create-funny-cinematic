import Link from 'next/link'
import type { Scene } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function SceneCard({ scene }: { scene: Scene }) {
  const name = getMetafieldValue(scene.metadata?.scene_name) || scene.title
  const description = getMetafieldValue(scene.metadata?.description)
  const ambient = getMetafieldValue(scene.metadata?.ambient_sounds)
  const image = scene.metadata?.reference_photo

  return (
    <Link href={`/scenes/${scene.slug}`}>
      <article className="card-glow rounded-xl overflow-hidden bg-cinema-darker h-full">
        {image && (
          <div className="aspect-video overflow-hidden bg-black">
            <img
              src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={name}
              width={400}
              height={225}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-display text-2xl tracking-wide text-white mb-2">{name}</h3>
          {ambient && (
            <p className="text-yellow-400/80 text-sm mb-3">🔊 {ambient}</p>
          )}
          {description && (
            <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
          )}
        </div>
      </article>
    </Link>
  )
}