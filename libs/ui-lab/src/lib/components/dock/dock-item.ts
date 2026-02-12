import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cn } from '../../utils';
import { SC_DOCK } from './dock';
import type { DockItem } from './dock-types';

@Component({
  selector: 'button[sc-dock-item]',
  template: `
    <span
      class="inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
      [innerHTML]="sanitizedIcon()"
    ></span>
    <ng-content />
  `,
  host: {
    'data-slot': 'dock-item',
    type: 'button',
    '[class]': 'class()',
    '[style.transform]': 'transform()',
    '[disabled]': 'item().disabled',
    '[attr.aria-label]': 'item().label',
    '[title]': 'item().label',
    '(click)': 'onClick()',
    '(mouseenter)': 'onMouseEnter()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDockItem {
  readonly dock = inject(SC_DOCK);
  private readonly sanitizer = inject(DomSanitizer);
  readonly item = input.required<DockItem>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly itemIndex = this.dock.registerItem();

  protected readonly sanitizedIcon = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.item().icon),
  );

  protected readonly class = computed(() => {
    const size = this.dock.size();

    return cn(
      'relative flex items-center justify-center',
      'rounded-xl transition-all duration-150 ease-out',
      'bg-muted/50 hover:bg-muted',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      size === 'sm' && 'w-10 h-10 p-2',
      size === 'md' && 'w-12 h-12 p-2.5',
      size === 'lg' && 'w-14 h-14 p-3',
      this.classInput(),
    );
  });

  protected readonly transform = computed(() =>
    this.dock.getItemTransform(this.itemIndex),
  );

  protected onClick(): void {
    this.dock.onItemClick(this.item());
  }

  protected onMouseEnter(): void {
    this.dock.onMouseEnter(this.itemIndex);
  }
}
