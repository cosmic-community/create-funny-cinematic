import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-yellow-500/10 bg-cinema-darker/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🎬</span>
            <span className="font-display text-2xl tracking-wider gradient-text">
              FUNNY CINEMATIC
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/characters" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Characters
            </Link>
            <Link href="/scenes" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Scenes
            </Link>
            <Link href="/video-prompts" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Video Prompts
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}