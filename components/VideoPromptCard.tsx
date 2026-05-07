import Link from 'next/link'
import type { VideoPrompt } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function VideoPromptCard({ prompt }: { prompt: VideoPrompt }) {
  const title = getMetafieldValue(prompt.metadata?.title) || prompt.title
  const description = getMetafieldValue(prompt.metadata?.scene_description)
  const status = getMetafieldValue(prompt.metadata?.generation_status)
  const duration = getMetafieldValue(prompt.metadata?.duration)
  const image = prompt.metadata?.reference_photo

  const statusColor =
    status.toLowerCase().includes('complete') || status.toLowerCase().includes('done')
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : status.toLowerCase().includes('progress') || status.toLowerCase().includes('generating')
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'

  return (
    <Link href={`/video-prompts/${prompt.slug}`}>
      <article className="card-glow rounded-xl overflow-hidden bg-cinema-darker h-full">
        {image && (
          <div className="aspect-video overflow-hidden bg-black relative">
            <img
              src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              {status && (
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColor}`}>
                  {status}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="p-6">
          <h3 className="font-display text-2xl tracking-wide gradient-text mb-2">{title}</h3>
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
            {duration && <span>⏱ {duration}</span>}
          </div>
          {description && (
            <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
          )}
        </div>
      </article>
    </Link>
  )
}