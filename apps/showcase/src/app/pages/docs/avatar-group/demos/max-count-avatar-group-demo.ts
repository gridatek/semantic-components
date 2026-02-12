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
  selector: 'app-max-count-avatar-group-demo',
  imports: [ScAvatarGroup],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <span class="text-sm w-20">Max 2:</span>
        <sc-avatar-group [avatars]="users" [max]="2" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-20">Max 4:</span>
        <sc-avatar-group [avatars]="users" [max]="4" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-20">Max 6:</span>
        <sc-avatar-group [avatars]="users" [max]="6" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-20">Show all:</span>
        <sc-avatar-group [avatars]="users" [max]="100" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxCountAvatarGroupDemo {
  readonly users: AvatarGroupItem[] = [
    {
      id: '1',
      src: 'https://i.pravatar.cc/150?u=user1',
      name: 'Alice Johnson',
    },
    { id: '2', src: 'https://i.pravatar.cc/150?u=user2', name: 'Bob Smith' },
    { id: '3', src: 'https://i.pravatar.cc/150?u=user3', name: 'Carol White' },
    { id: '4', src: 'https://i.pravatar.cc/150?u=user4', name: 'David Brown' },
    { id: '5', src: 'https://i.pravatar.cc/150?u=user5', name: 'Eve Davis' },
    { id: '6', src: 'https://i.pravatar.cc/150?u=user6', name: 'Frank Miller' },
    { id: '7', src: 'https://i.pravatar.cc/150?u=user7', name: 'Grace Wilson' },
  ];
}
