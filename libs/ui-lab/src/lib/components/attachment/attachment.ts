import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { type VariantProps, cva } from 'class-variance-authority';

export type ScAttachmentState =
  'idle' | 'uploading' | 'processing' | 'error' | 'done';

export const attachmentVariants = cva(
  'group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed',
  {
    variants: {
      size: {
        default:
          'gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2',
        sm: 'gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5',
        xs: 'gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1',
      },
      orientation: {
        horizontal: 'min-w-40 items-center',
        vertical: 'w-24 flex-col has-data-[slot=attachment-content]:w-30',
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
    },
  },
);

export type ScAttachmentVariants = VariantProps<typeof attachmentVariants>;

@Directive({
  selector: 'div[scAttachment]',
  host: {
    'data-slot': 'attachment',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScAttachment {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = input<ScAttachmentState>('done');
  readonly size = input<ScAttachmentVariants['size']>('default');
  readonly orientation =
    input<ScAttachmentVariants['orientation']>('horizontal');

  protected readonly class = computed(() =>
    cn(
      attachmentVariants({
        size: this.size(),
        orientation: this.orientation(),
      }),
      this.classInput(),
    ),
  );
}
