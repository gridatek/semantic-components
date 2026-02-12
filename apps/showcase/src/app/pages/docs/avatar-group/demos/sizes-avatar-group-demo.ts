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
  selector: 'app-sizes-avatar-group-demo',
  imports: [ScAvatarGroup],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <span class="text-sm w-12">Small:</span>
        <sc-avatar-group [avatars]="users" [max]="4" size="sm" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-12">Medium:</span>
        <sc-avatar-group [avatars]="users" [max]="4" size="md" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-12">Large:</span>
        <sc-avatar-group [avatars]="users" [max]="4" size="lg" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-12">XL:</span>
        <sc-avatar-group [avatars]="users" [max]="4" size="xl" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesAvatarGroupDemo {
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
