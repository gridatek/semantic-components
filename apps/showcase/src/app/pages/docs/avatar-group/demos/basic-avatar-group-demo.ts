import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatarGroup,
  type AvatarGroupItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-avatar-group-demo',
  imports: [ScAvatarGroup],
  template: `
    <sc-avatar-group
      [avatars]="users"
      [max]="4"
      (avatarClick)="onAvatarClick($event)"
      (overflowClick)="onOverflowClick($event)"
    />
    @if (clickedUser()) {
      <p class="mt-2 text-sm text-muted-foreground">
        Clicked: {{ clickedUser() }}
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAvatarGroupDemo {
  readonly clickedUser = signal<string | null>(null);

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

  onAvatarClick(event: { avatar: AvatarGroupItem; index: number }): void {
    this.clickedUser.set(event.avatar.name || `Avatar ${event.index + 1}`);
  }

  onOverflowClick(avatars: AvatarGroupItem[]): void {
    this.clickedUser.set(`+${avatars.length} more users`);
  }
}
