export type AudioPlatform = "CD" | "Digital";
export type VideoPlatform = "DVD" | "BluRay" | "Digital";

export type AudioItem = {
  _id: string;
  title: string;
  publisher: string;
  releaseYear?: number;
  mediaType: "Audio";
  platform: AudioPlatform;
};

export type VideoItem = {
  _id: string;
  title: string;
  publisher: string;
  releaseYear?: number;
  mediaType: "Video";
  platform: VideoPlatform;
};

export type GameItem = {
  _id: string;
  title: string;
  publisher: string;
  releaseYear?: number;
  mediaType: "Game";
  platform: string;
};

export type MediaItem = AudioItem | VideoItem | GameItem;
