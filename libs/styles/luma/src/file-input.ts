import type { ScFileInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no file input), in luma: the dropzone as the style's Empty
// (its corners, its padding, its icon box), a file as its outline Item at
// size sm (corners, padding, text), the thumbnail as the Item's image media.
export const fileInput: ScFileInputStyles = {
  dropzone:
    'rounded-2xl p-12 gap-4 text-sm [&>svg]:box-content [&>svg]:p-2.5 [&>svg]:rounded-xl [&>svg]:bg-muted [&>svg]:text-foreground [&>svg:not([class*=size-])]:size-5',
  item: 'rounded-2xl gap-3.5 px-3.5 py-3 text-sm',
  preview: 'size-8 rounded-xl',
  size: 'text-sm',
};
