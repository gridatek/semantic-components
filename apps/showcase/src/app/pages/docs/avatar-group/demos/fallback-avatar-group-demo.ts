import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatarGroup,
  type AvatarGroupItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-fallback-avatar-group-demo',
  imports: [ScAvatarGroup],
  template: `
    <sc-avatar-group [avatars]="users" [max]="6" />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackAvatarGroupDemo {
  readonly users: AvatarGroupItem[] = [
    { id: '1', src: 'https://i.pravatar.cc/150?u=team1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith', fallback: 'JS' },
    { id: '3', src: 'https://i.pravatar.cc/150?u=team3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Williams' },
    { id: '5', name: 'Tom Brown', fallback: 'TB' },
    { id: '6', src: 'https://i.pravatar.cc/150?u=team6', name: 'Emily Davis' },
  ];
}
