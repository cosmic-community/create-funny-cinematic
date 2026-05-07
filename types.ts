export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    name?: string;
    description?: string;
    voice_style?: string;
    language_accent?: string;
    personality_traits?: string;
    reference_image?: CosmicImage;
  };
}

export interface Scene extends CosmicObject {
  type: 'scenes';
  metadata: {
    scene_name?: string;
    description?: string;
    ambient_sounds?: string;
    lighting_notes?: string;
    reference_photo?: CosmicImage;
  };
}

export interface VideoPrompt extends CosmicObject {
  type: 'video-prompts';
  metadata: {
    title?: string;
    scene_description?: string;
    dialogue?: string;
    dialogue_translation?: string;
    style_notes?: string;
    duration?: string;
    generation_status?: string;
    reference_photo?: CosmicImage;
    character?: Character;
    scene?: Scene;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}