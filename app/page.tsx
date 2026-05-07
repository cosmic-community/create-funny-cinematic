import Link from 'next/link'
import { getCharacters, getScenes, getVideoPrompts } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'
import SceneCard from '@/components/SceneCard'
import VideoPromptCard from '@/components/VideoPromptCard'

export default async function HomePage() {
  const [characters, scenes, prompts] = await Promise.all([
    getCharacters(),
    getScenes(),
    getVideoPrompts(),
  ])

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center py-16 md:py-24 animate-fade-in">
        <div className="inline-block mb-4 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-sm">
          🎬 Powered by Veo 3 AI
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider mb-6">
          <span className="gradient-text">CREATE FUNNY</span>
          <br />
          <span className="text-white">CINEMATIC</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Cinematic AI video prompts featuring Ghardouch the monkey, lively Moroccan humor, and ultra-realistic comedy scenes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/video-prompts"
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
          >
            View Video Prompts
          </Link>
          <Link
            href="/characters"
            className="px-8 py-3 border border-yellow-500/30 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-all"
          >
            Meet Characters
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 max-w-3xl mx-auto py-8 mb-16">
        <div className="text-center">
          <div className="font-display text-4xl md:text-5xl gradient-text">{characters.length}</div>
          <div className="text-gray-500 text-sm uppercase tracking-wider">Characters</div>
        </div>
        <div className="text-center">
          <div className="font-display text-4xl md:text-5xl gradient-text">{scenes.length}</div>
          <div className="text-gray-500 text-sm uppercase tracking-wider">Scenes</div>
        </div>
        <div className="text-center">
          <div className="font-display text-4xl md:text-5xl gradient-text">{prompts.length}</div>
          <div className="text-gray-500 text-sm uppercase tracking-wider">Prompts</div>
        </div>
      </section>

      {/* Featured Video Prompts */}
      {prompts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white">
              🎬 LATEST PROMPTS
            </h2>
            <Link href="/video-prompts" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.slice(0, 3).map((prompt) => (
              <VideoPromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>
      )}

      {/* Characters */}
      {characters.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white">
              🐵 CHARACTERS
            </h2>
            <Link href="/characters" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.slice(0, 3).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      )}

      {/* Scenes */}
      {scenes.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white">
              🎥 SCENES
            </h2>
            <Link href="/scenes" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenes.slice(0, 3).map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}