import { computed, Directive, input } from '@angular/core';
import { Tab } from '@angular/aria/tabs';
import { cn } from '../../utils';

@Directive({
  selector: '[scTab]',
  hostDirectives: [
    {
      directive: Tab,
      inputs: ['value', 'disabled', 'id'],
    },
  ],
  host: {
    'data-slot': 'tabs-trigger',
    '[class]': 'class()',
  },
})
export class ScTab {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium',
      'group-data-[variant=default]/tab-list:aria-selected:shadow-sm group-data-[variant=line]/tab-list:aria-selected:shadow-none',
      "[&_svg:not([class*='size-'])]:size-4",
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring',
      'text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground',
      'relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all',
      'group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start',
      'focus-visible:ring-[3px] focus-visible:outline-1',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      // line variant styles
      'group-data-[variant=line]/tab-list:bg-transparent group-data-[variant=line]/tab-list:aria-selected:bg-transparent',
      'dark:group-data-[variant=line]/tab-list:aria-selected:border-transparent dark:group-data-[variant=line]/tab-list:aria-selected:bg-transparent',
      // active styles
      'aria-selected:bg-background dark:aria-selected:text-foreground dark:aria-selected:border-input dark:aria-selected:bg-input/30 aria-selected:text-foreground',
      // line variant underline/side indicator
      'after:bg-foreground after:absolute after:opacity-0 after:transition-opacity',
      'group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5',
      'group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5',
      'group-data-[variant=line]/tab-list:aria-selected:after:opacity-100',
      this.classInput(),
    ),
  );
}
