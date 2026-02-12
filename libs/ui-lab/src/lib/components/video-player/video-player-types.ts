export interface ScVideoSource {
  src: string;
  type?: string;
  label?: string;
}

export interface ScVideoTrack {
  src: string;
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  srclang: string;
  label: string;
  default?: boolean;
}
