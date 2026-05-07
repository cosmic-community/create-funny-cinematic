import { createBucketClient } from '@cosmicjs/sdk'
import type { Character, Scene, VideoPrompt } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Character[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacter(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'characters', slug })
      .depth(1)
    return response.object as Character
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch character')
  }
}

export async function getScenes(): Promise<Scene[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'scenes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Scene[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch scenes')
  }
}

export async function getScene(slug: string): Promise<Scene | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'scenes', slug })
      .depth(1)
    return response.object as Scene
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch scene')
  }
}

export async function getVideoPrompts(): Promise<VideoPrompt[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'video-prompts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as VideoPrompt[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch video prompts')
  }
}

export async function getVideoPrompt(slug: string): Promise<VideoPrompt | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'video-prompts', slug })
      .depth(1)
    return response.object as VideoPrompt
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch video prompt')
  }
}