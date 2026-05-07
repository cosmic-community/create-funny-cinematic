import { getScenes } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'

export default async function ScenesPage() {
  const scenes = await getScenes()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider gradient-text mb-4">
          🎥 SCENES
        </h1>
        <p className="text-gray-400 text-lg">
          Cinematic settings for our productions
        </p>
      </div>

      {scenes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No scenes available yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      )}
    </div>
  )
}