import { getVideoPrompts } from '@/lib/cosmic'
import VideoPromptCard from '@/components/VideoPromptCard'

export default async function VideoPromptsPage() {
  const prompts = await getVideoPrompts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider gradient-text mb-4">
          🎬 VIDEO PROMPTS
        </h1>
        <p className="text-gray-400 text-lg">
          AI-ready prompts for Veo 3 generation
        </p>
      </div>

      {prompts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No video prompts available yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <VideoPromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  )
}