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
  selector: 'app-team-avatar-group-demo',
  imports: [ScAvatarGroup],
  template: `
    <div class="flex items-center gap-3 p-4 border rounded-lg">
      <sc-avatar-group [avatars]="members" [max]="3" size="sm" />
      <span class="text-sm text-muted-foreground">Working on this project</span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamAvatarGroupDemo {
  readonly members: AvatarGroupItem[] = [
    { id: '1', src: 'https://i.pravatar.cc/150?u=dev1', name: 'Alex Chen' },
    { id: '2', src: 'https://i.pravatar.cc/150?u=dev2', name: 'Sam Taylor' },
    { id: '3', src: 'https://i.pravatar.cc/150?u=dev3', name: 'Jordan Lee' },
    { id: '4', src: 'https://i.pravatar.cc/150?u=dev4', name: 'Casey Morgan' },
    { id: '5', src: 'https://i.pravatar.cc/150?u=dev5', name: 'Riley Parker' },
  ];
}
