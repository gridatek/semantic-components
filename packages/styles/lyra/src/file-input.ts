import type { ScFileInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no file input), in lyra: the dropzone as the style's Empty
// (its corners, its padding, its icon box), a file as its outline Item at
// size sm (corners, padding, text), the thumbnail as the Item's image media.
export const fileInput: ScFileInputStyles = {
  dropzone:
    'rounded-none p-6 gap-3 text-xs/relaxed [&>svg]:box-content [&>svg]:p-2 [&>svg]:rounded-none [&>svg]:bg-muted [&>svg]:text-foreground [&>svg:not([class*=size-])]:size-4',
  item: 'rounded-none gap-2.5 px-3 py-2.5 text-xs',
  preview: 'size-8 rounded-none',
  size: 'text-xs/relaxed',
};
