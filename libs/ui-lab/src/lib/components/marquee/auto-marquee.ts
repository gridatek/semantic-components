import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-auto-marquee',
  template: `
    <div [class]="trackClass()">
      <div [class]="contentClass()">
        <ng-content />
      </div>
      <div [class]="contentClass()" aria-hidden="true">
        <ng-content select="[clone]" />
      </div>
    </div>
  `,
  host: {
    'data-slot': 'auto-marquee',
    '[class]': 'class()',
    '[style.--marquee-duration]': 'duration() + "s"',
    '[style.--marquee-gap]': 'gap() + "px"',
    '[attr.data-pause-on-hover]': 'pauseOnHover() || null',
  },
  styles: `
    [data-slot='auto-marquee'] {
      --marquee-duration: 30s;
      --marquee-gap: 16px;
      overflow: hidden;
    }

    [data-slot='auto-marquee'] [data-slot='auto-marquee-track'] {
      display: flex;
      gap: var(--marquee-gap);
      width: max-content;
      animation: auto-marquee-scroll var(--marquee-duration) linear infinite;
    }

    [data-slot='auto-marquee'][data-pause-on-hover]:hover
      [data-slot='auto-marquee-track'] {
      animation-play-state: paused;
    }

    @keyframes auto-marquee-scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(calc(-50% - var(--marquee-gap) / 2));
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAutoMarquee {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly duration = input<number>(30);
  readonly gap = input<number>(16);
  readonly pauseOnHover = input<boolean>(true);

  protected readonly class = computed(() => cn('w-full', this.classInput()));

  protected readonly trackClass = computed(() => cn('flex'));

  protected readonly contentClass = computed(() =>
    cn('flex shrink-0 items-center gap-[--marquee-gap]'),
  );
}
