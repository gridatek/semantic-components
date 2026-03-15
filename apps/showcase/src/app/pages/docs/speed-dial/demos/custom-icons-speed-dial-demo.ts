import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';
import {
  SiFacebookIcon,
  SiLinkedinIcon,
  SiMailIcon,
  SiShare2Icon,
  SiTwitterIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-icons-speed-dial-demo',
  imports: [ScSpeedDial],
  template: `
    <div class="bg-muted/20 relative h-64 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <sc-speed-dial
          [actions]="socialActions()"
          [icon]="shareIcon"
          ariaLabel="Share options"
        />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsSpeedDialDemo {
  readonly shareIcon = SiShare2Icon;

  readonly socialActions = signal<SpeedDialAction[]>([
    {
      id: 'facebook',
      icon: SiFacebookIcon,
      label: 'Facebook',
    },
    {
      id: 'twitter',
      icon: SiTwitterIcon,
      label: 'Twitter',
    },
    {
      id: 'linkedin',
      icon: SiLinkedinIcon,
      label: 'LinkedIn',
    },
    {
      id: 'email',
      icon: SiMailIcon,
      label: 'Email',
    },
  ]);
}
