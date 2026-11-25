import type { ScFileInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no file input), in mira: the dropzone as the style's Empty
// (its corners, its padding, its icon box), a file as its outline Item at
// size sm (corners, padding, text), the thumbnail as the Item's image media.
export const fileInput: ScFileInputStyles = {
  dropzone:
    'rounded-xl p-6 gap-3 text-xs/relaxed [&>svg]:box-content [&>svg]:p-2 [&>svg]:rounded-md [&>svg]:bg-muted [&>svg]:text-foreground [&>svg:not([class*=size-])]:size-4',
  item: 'rounded-md gap-2.5 px-3 py-2.5 text-xs/relaxed',
  preview: 'size-8 rounded-sm',
  size: 'text-xs/relaxed',
};
