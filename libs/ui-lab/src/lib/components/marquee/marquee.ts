import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-marquee',
  template: `
    <div [class]="innerClass()">
      <ng-content />
    </div>
    <div [class]="innerClass()" aria-hidden="true">
      <ng-content select="[sc-marquee-clone]" />
    </div>
  `,
  host: {
    'data-slot': 'marquee',
    '[class]': 'class()',
    '[style.--duration]': 'duration() + "s"',
    '[style.--gap]': 'gap() + "px"',
    '[attr.data-direction]': 'direction()',
    '[attr.data-pause-on-hover]': 'pauseOnHover() || null',
    '[attr.data-reverse]': 'reverse() || null',
  },
  styles: `
    [data-slot='marquee'] {
      --duration: 40s;
      --gap: 16px;
      display: flex;
      overflow: hidden;
      gap: var(--gap);
    }

    [data-slot='marquee'] > div {
      display: flex;
      flex-shrink: 0;
      gap: var(--gap);
      animation: marquee var(--duration) linear infinite;
    }

    [data-slot='marquee'][data-direction='vertical'] {
      flex-direction: column;
    }

    [data-slot='marquee'][data-direction='vertical'] > div {
      flex-direction: column;
      animation-name: marquee-vertical;
    }

    [data-slot='marquee'][data-reverse] > div {
      animation-direction: reverse;
    }

    [data-slot='marquee'][data-pause-on-hover]:hover > div {
      animation-play-state: paused;
    }

    @keyframes marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(calc(-100% - var(--gap)));
      }
    }

    @keyframes marquee-vertical {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(calc(-100% - var(--gap)));
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMarquee {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly duration = input<number>(40);
  readonly gap = input<number>(16);
  readonly pauseOnHover = input<boolean>(true);
  readonly reverse = input<boolean>(false);

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly innerClass = computed(() =>
    cn('flex shrink-0 items-center justify-around'),
  );
}
