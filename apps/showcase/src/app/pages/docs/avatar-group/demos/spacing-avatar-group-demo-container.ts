import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpacingAvatarGroupDemo } from './spacing-avatar-group-demo';

@Component({
  selector: 'app-spacing-avatar-group-demo-container',
  imports: [DemoContainer, SpacingAvatarGroupDemo],
  template: `
    <app-demo-container
      title="Spacing Options"
      description="Control the overlap amount between avatars."
      demoUrl="/demos/avatar-group/spacing-avatar-group-demo"
      [code]="code"
    >
      <app-spacing-avatar-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacingAvatarGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAvatarGroup, type AvatarGroupItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-spacing-avatar-group-demo',
  imports: [ScAvatarGroup],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <span class="text-sm w-16">Tight:</span>
        <sc-avatar-group [avatars]="users" [max]="5" spacing="tight" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-16">Normal:</span>
        <sc-avatar-group [avatars]="users" [max]="5" spacing="normal" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm w-16">Loose:</span>
        <sc-avatar-group [avatars]="users" [max]="5" spacing="loose" />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacingAvatarGroupDemo {
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
}`;
}
