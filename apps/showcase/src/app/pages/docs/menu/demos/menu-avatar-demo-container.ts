import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MenuAvatarDemo } from './menu-avatar-demo';

@Component({
  selector: 'app-menu-avatar-demo-container',
  imports: [DemoContainer, MenuAvatarDemo],
  template: `
    <app-demo-container
      title="With Avatar"
      demoUrl="/demos/menu/menu-avatar-demo"
      [code]="code"
    >
      <app-menu-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAvatarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScMenu,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCreditCardIcon,
  SiLogOutIcon,
  SiPlusCircleIcon,
  SiSettingsIcon,
  SiUserIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-avatar-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuProvider,
    ScMenuTrigger,
    SiCreditCardIcon,
    SiLogOutIcon,
    SiPlusCircleIcon,
    SiSettingsIcon,
    SiUserIcon,
    SiUsersIcon,
  ],
  template: \`
    <div scMenuProvider>
      <button
        scButton
        scMenuTrigger
        variant="ghost"
        class="size-10 rounded-full p-0"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="User avatar"
          class="size-10 rounded-full"
        />
      </button>
      <div scMenuPortal>
        <div scMenu class="w-56">
          <div class="flex items-center gap-2 px-2 py-1.5" role="presentation">
            <img
              src="https://github.com/shadcn.png"
              alt=""
              class="size-8 rounded-full"
            />
            <div class="flex flex-col">
              <span class="text-sm font-semibold">shadcn</span>
              <span class="text-xs text-muted-foreground">
                m&#64;example.com
              </span>
            </div>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Profile">
            <svg siUserIcon class="text-muted-foreground size-4" aria-hidden="true"></svg>
            <span class="flex-1">Profile</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⇧⌘P
            </span>
          </div>
          <div scMenuItem value="Billing">
            <svg siCreditCardIcon class="text-muted-foreground size-4" aria-hidden="true"></svg>
            <span class="flex-1">Billing</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘B
            </span>
          </div>
          <div scMenuItem value="Settings">
            <svg siSettingsIcon class="text-muted-foreground size-4" aria-hidden="true"></svg>
            <span class="flex-1">Settings</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘S
            </span>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Team">
            <svg siUsersIcon class="text-muted-foreground size-4" aria-hidden="true"></svg>
            <span class="flex-1">Team</span>
          </div>
          <div scMenuItem value="New Team">
            <svg siPlusCircleIcon class="text-muted-foreground size-4" aria-hidden="true"></svg>
            <span class="flex-1">New Team</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘+T
            </span>
          </div>
          <div scMenuSeparator></div>
          <div
            scMenuItem
            value="Log out"
            class="text-destructive hover:bg-destructive/10 data-[active=true]:bg-destructive/10"
          >
            <svg siLogOutIcon class="size-4" aria-hidden="true"></svg>
            <span class="flex-1">Log out</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⇧⌘Q
            </span>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAvatarDemo {}`;
}
