# Create Funny Cinematic

![App Preview](https://imgix.cosmicjs.com/b0ec67d0-49d9-11f1-bcf8-37f10fb0697d-autopilot-photo-1504674900247-0877df9cc836-1778133475010.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A cinematic showcase platform for AI-generated video prompts featuring the "Ghardouch" monkey character. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🎭 Character profiles with voice styles, personality traits, and reference images
- 🎥 Scene library with ambient sounds and lighting notes
- 🎬 Complete video prompts with bilingual dialogue (Moroccan Darija + English)
- 🌟 Generation status tracking for each prompt
- 🎨 Beautiful cinematic dark theme with smooth animations
- 📱 Fully responsive design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69fc29a0a963c4f5f0d9997d&clone_repository=69fc2a8da963c4f5f0d9999b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Create a funny cinematic animation from the uploaded factory photo using Veo 3.
The young monkey character "Ghardouch" appears inside the fish packaging room, jumping playfully around the workers. He laughs loudly and points at the leg of the man wearing the red hoodie. The atmosphere is comedic, energetic, and friendly. Workers are smiling and laughing naturally. Realistic movement, handheld camera feeling, subtle factory ambient sounds, detailed lighting, realistic shadows, playful facial expressions.
Ghardouch speaks in Moroccan Darija with a funny exaggerated voice:
"هاااذ شييبانى الكرغغغولى خاصو ييياكلل المسمن!"
The monkey then bursts into laughter while lightly tapping the worker's leg jokingly.
Style: ultra realistic, cinematic comedy, smooth animation, natural body movement, expressive face animation, lively Moroccan humor, 4K quality, Veo 3 style, immersive audio, realistic indoor cold-room environment."

### Code Generation Prompt

> Build a Next.js application for a website called "Create funny cinematic". The content is managed in Cosmic CMS with the following object types: characters, scenes, video-prompts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Cosmic SDK](https://www.cosmicjs.com/docs) - Content management
- [Bun](https://bun.sh) - Package manager and runtime

## Getting Started

### Prerequisites

- Bun installed
- A Cosmic account with a bucket configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env.local` file with your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun run dev
   ```

## Cosmic SDK Examples

### Fetching Video Prompts with Related Content

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'video-prompts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Character

```typescript
const response = await cosmic.objects
  .findOne({ type: 'characters', slug: 'ghardouch' })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three Cosmic object types:

- **Characters**: Character profiles with voice styles and reference images
- **Scenes**: Scene descriptions with ambient sounds and lighting notes
- **Video Prompts**: Complete prompts linking characters and scenes with dialogue

## Deployment Options

Deploy easily to:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)

Set environment variables in your hosting platform's dashboard.
<!-- README_END -->