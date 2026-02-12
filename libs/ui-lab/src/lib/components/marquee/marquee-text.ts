import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-marquee-text',
  template: `
    <div [class]="trackClass()">
      <span [class]="textClass()">{{ text() }}</span>
      <span [class]="separatorClass()">{{ separator() }}</span>
      <span [class]="textClass()">{{ text() }}</span>
      <span [class]="separatorClass()">{{ separator() }}</span>
      <span [class]="textClass()">{{ text() }}</span>
      <span [class]="separatorClass()">{{ separator() }}</span>
      <span [class]="textClass()">{{ text() }}</span>
      <span [class]="separatorClass()">{{ separator() }}</span>
    </div>
  `,
  host: {
    'data-slot': 'marquee-text',
    '[class]': 'class()',
    '[style.--text-duration]': 'duration() + "s"',
    '[attr.data-pause-on-hover]': 'pauseOnHover() || null',
    '[attr.data-reverse]': 'reverse() || null',
  },
  styles: `
    [data-slot='marquee-text'] {
      --text-duration: 20s;
      overflow: hidden;
      white-space: nowrap;
    }

    [data-slot='marquee-text'] > div {
      display: inline-block;
      animation: marquee-text-scroll var(--text-duration) linear infinite;
    }

    [data-slot='marquee-text'][data-reverse] > div {
      animation-direction: reverse;
    }

    [data-slot='marquee-text'][data-pause-on-hover]:hover > div {
      animation-play-state: paused;
    }

    @keyframes marquee-text-scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMarqueeText {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly text = input.required<string>();
  readonly separator = input<string>('•');
  readonly duration = input<number>(20);
  readonly pauseOnHover = input<boolean>(true);
  readonly reverse = input<boolean>(false);

  protected readonly class = computed(() => cn('w-full', this.classInput()));

  protected readonly trackClass = computed(() => cn('whitespace-nowrap'));

  protected readonly textClass = computed(() => cn('inline-block px-4'));

  protected readonly separatorClass = computed(() =>
    cn('inline-block px-2 text-muted-foreground'),
  );
}
