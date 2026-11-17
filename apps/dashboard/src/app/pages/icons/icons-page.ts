import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScFrame,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import {
  SiActivityIcon,
  SiAlarmClockIcon,
  SiArchiveIcon,
  SiArrowRightIcon,
  SiAtSignIcon,
  SiAwardIcon,
  SiBellIcon,
  SiBookmarkIcon,
  SiBoxIcon,
  SiBriefcaseIcon,
  SiCalendarIcon,
  SiCameraIcon,
  SiChartPieIcon,
  SiCheckIcon,
  SiClipboardIcon,
  SiClockIcon,
  SiCloudIcon,
  SiCodeIcon,
  SiCompassIcon,
  SiCopyIcon,
  SiCreditCardIcon,
  SiDatabaseIcon,
  SiDownloadIcon,
  SiEyeIcon,
  SiFileIcon,
  SiFlagIcon,
  SiFolderIcon,
  SiGiftIcon,
  SiGlobeIcon,
  SiHeartIcon,
  SiHouseIcon,
  SiImageIcon,
  SiInboxIcon,
  SiKeyIcon,
  SiLayersIcon,
  SiLinkIcon,
  SiLockIcon,
  SiMailIcon,
  SiMapPinIcon,
  SiMessageSquareIcon,
  SiMicIcon,
  SiMoonIcon,
  SiMusicIcon,
  SiPackageIcon,
  SiPencilIcon,
  SiPhoneIcon,
  SiPrinterIcon,
  SiRocketIcon,
  SiSearchIcon,
  SiSendIcon,
  SiSettingsIcon,
  SiShare2Icon,
  SiShieldIcon,
  SiShoppingCartIcon,
  SiStarIcon,
  SiSunIcon,
  SiTagIcon,
  SiTrash2Icon,
  SiTrendingUpIcon,
  SiTruckIcon,
  SiUploadIcon,
  SiUserIcon,
  SiUsersIcon,
  SiVideoIcon,
  SiWalletIcon,
  SiWifiIcon,
  SiZapIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

const NAMES = [
  'activity',
  'alarm-clock',
  'archive',
  'arrow-right',
  'at-sign',
  'award',
  'bell',
  'bookmark',
  'box',
  'briefcase',
  'calendar',
  'camera',
  'chart-pie',
  'check',
  'clipboard',
  'clock',
  'cloud',
  'code',
  'compass',
  'copy',
  'credit-card',
  'database',
  'download',
  'eye',
  'file',
  'flag',
  'folder',
  'gift',
  'globe',
  'heart',
  'house',
  'image',
  'inbox',
  'key',
  'layers',
  'link',
  'lock',
  'mail',
  'map-pin',
  'message-square',
  'mic',
  'moon',
  'music',
  'package',
  'pencil',
  'phone',
  'printer',
  'rocket',
  'send',
  'settings',
  'share-2',
  'shield',
  'shopping-cart',
  'star',
  'sun',
  'tag',
  'trash-2',
  'trending-up',
  'truck',
  'upload',
  'user',
  'users',
  'video',
  'wallet',
  'wifi',
  'zap',
];

/**
 * Icons: a set from @semantic-icons/lucide-icons (shadcndashboard shows
 * Iconify's), searchable by name. Each is a directive on an svg — written out
 * here, as an app imports the ones it uses.
 */
@Component({
  selector: 'app-icons-page',
  imports: [
    ScFrame,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiActivityIcon,
    SiAlarmClockIcon,
    SiArchiveIcon,
    SiArrowRightIcon,
    SiAtSignIcon,
    SiAwardIcon,
    SiBellIcon,
    SiBookmarkIcon,
    SiBoxIcon,
    SiBriefcaseIcon,
    SiCalendarIcon,
    SiCameraIcon,
    SiChartPieIcon,
    SiCheckIcon,
    SiClipboardIcon,
    SiClockIcon,
    SiCloudIcon,
    SiCodeIcon,
    SiCompassIcon,
    SiCopyIcon,
    SiCreditCardIcon,
    SiDatabaseIcon,
    SiDownloadIcon,
    SiEyeIcon,
    SiFileIcon,
    SiFlagIcon,
    SiFolderIcon,
    SiGiftIcon,
    SiGlobeIcon,
    SiHeartIcon,
    SiHouseIcon,
    SiImageIcon,
    SiInboxIcon,
    SiKeyIcon,
    SiLayersIcon,
    SiLinkIcon,
    SiLockIcon,
    SiMailIcon,
    SiMapPinIcon,
    SiMessageSquareIcon,
    SiMicIcon,
    SiMoonIcon,
    SiMusicIcon,
    SiPackageIcon,
    SiPencilIcon,
    SiPhoneIcon,
    SiPrinterIcon,
    SiRocketIcon,
    SiSendIcon,
    SiSettingsIcon,
    SiShare2Icon,
    SiShieldIcon,
    SiShoppingCartIcon,
    SiStarIcon,
    SiSunIcon,
    SiTagIcon,
    SiTrash2Icon,
    SiTrendingUpIcon,
    SiTruckIcon,
    SiUploadIcon,
    SiUserIcon,
    SiUsersIcon,
    SiVideoIcon,
    SiWalletIcon,
    SiWifiIcon,
    SiZapIcon,
    SiSearchIcon,
    PageHeader,
  ],
  template: `
    <app-page-header i18n-title title="Icons" [trail]="[{ label: t.icons }]" />

    <div scInputGroup class="max-w-sm">
      <input
        i18n-aria-label
        i18n-placeholder
        scInput
        type="search"
        placeholder="Search icons"
        aria-label="Search icons"
        [value]="query()"
        (input)="query.set($any($event.target).value)"
      />
      <div scInputGroupAddon><svg siSearchIcon></svg></div>
    </div>
    <p i18n class="text-muted-foreground text-sm" aria-live="polite">
      {{ shown() }} of {{ total }} icons
    </p>
    <ul
      class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      <li [hidden]="!matches('activity')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siActivityIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            activity
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('alarm-clock')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siAlarmClockIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            alarm-clock
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('archive')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siArchiveIcon></svg>
          <figcaption class="text-muted-foreground text-xs">archive</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('arrow-right')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siArrowRightIcon class="rtl:-scale-x-100"></svg>
          <figcaption class="text-muted-foreground text-xs">
            arrow-right
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('at-sign')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siAtSignIcon></svg>
          <figcaption class="text-muted-foreground text-xs">at-sign</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('award')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siAwardIcon></svg>
          <figcaption class="text-muted-foreground text-xs">award</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('bell')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siBellIcon></svg>
          <figcaption class="text-muted-foreground text-xs">bell</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('bookmark')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siBookmarkIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            bookmark
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('box')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siBoxIcon></svg>
          <figcaption class="text-muted-foreground text-xs">box</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('briefcase')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siBriefcaseIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            briefcase
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('calendar')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCalendarIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            calendar
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('camera')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCameraIcon></svg>
          <figcaption class="text-muted-foreground text-xs">camera</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('chart-pie')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siChartPieIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            chart-pie
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('check')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCheckIcon></svg>
          <figcaption class="text-muted-foreground text-xs">check</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('clipboard')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siClipboardIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            clipboard
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('clock')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siClockIcon></svg>
          <figcaption class="text-muted-foreground text-xs">clock</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('cloud')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCloudIcon></svg>
          <figcaption class="text-muted-foreground text-xs">cloud</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('code')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCodeIcon></svg>
          <figcaption class="text-muted-foreground text-xs">code</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('compass')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCompassIcon></svg>
          <figcaption class="text-muted-foreground text-xs">compass</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('copy')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCopyIcon></svg>
          <figcaption class="text-muted-foreground text-xs">copy</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('credit-card')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siCreditCardIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            credit-card
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('database')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siDatabaseIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            database
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('download')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siDownloadIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            download
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('eye')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siEyeIcon></svg>
          <figcaption class="text-muted-foreground text-xs">eye</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('file')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siFileIcon></svg>
          <figcaption class="text-muted-foreground text-xs">file</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('flag')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siFlagIcon></svg>
          <figcaption class="text-muted-foreground text-xs">flag</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('folder')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siFolderIcon></svg>
          <figcaption class="text-muted-foreground text-xs">folder</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('gift')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siGiftIcon></svg>
          <figcaption class="text-muted-foreground text-xs">gift</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('globe')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siGlobeIcon></svg>
          <figcaption class="text-muted-foreground text-xs">globe</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('heart')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siHeartIcon></svg>
          <figcaption class="text-muted-foreground text-xs">heart</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('house')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siHouseIcon></svg>
          <figcaption class="text-muted-foreground text-xs">house</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('image')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siImageIcon></svg>
          <figcaption class="text-muted-foreground text-xs">image</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('inbox')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siInboxIcon></svg>
          <figcaption class="text-muted-foreground text-xs">inbox</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('key')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siKeyIcon></svg>
          <figcaption class="text-muted-foreground text-xs">key</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('layers')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siLayersIcon></svg>
          <figcaption class="text-muted-foreground text-xs">layers</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('link')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siLinkIcon></svg>
          <figcaption class="text-muted-foreground text-xs">link</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('lock')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siLockIcon></svg>
          <figcaption class="text-muted-foreground text-xs">lock</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('mail')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siMailIcon></svg>
          <figcaption class="text-muted-foreground text-xs">mail</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('map-pin')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siMapPinIcon></svg>
          <figcaption class="text-muted-foreground text-xs">map-pin</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('message-square')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siMessageSquareIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            message-square
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('mic')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siMicIcon></svg>
          <figcaption class="text-muted-foreground text-xs">mic</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('moon')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siMoonIcon></svg>
          <figcaption class="text-muted-foreground text-xs">moon</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('music')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siMusicIcon></svg>
          <figcaption class="text-muted-foreground text-xs">music</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('package')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siPackageIcon></svg>
          <figcaption class="text-muted-foreground text-xs">package</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('pencil')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siPencilIcon></svg>
          <figcaption class="text-muted-foreground text-xs">pencil</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('phone')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siPhoneIcon></svg>
          <figcaption class="text-muted-foreground text-xs">phone</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('printer')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siPrinterIcon></svg>
          <figcaption class="text-muted-foreground text-xs">printer</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('rocket')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siRocketIcon></svg>
          <figcaption class="text-muted-foreground text-xs">rocket</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('send')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siSendIcon></svg>
          <figcaption class="text-muted-foreground text-xs">send</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('settings')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siSettingsIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            settings
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('share-2')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siShare2Icon></svg>
          <figcaption class="text-muted-foreground text-xs">share-2</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('shield')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siShieldIcon></svg>
          <figcaption class="text-muted-foreground text-xs">shield</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('shopping-cart')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siShoppingCartIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            shopping-cart
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('star')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siStarIcon></svg>
          <figcaption class="text-muted-foreground text-xs">star</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('sun')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siSunIcon></svg>
          <figcaption class="text-muted-foreground text-xs">sun</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('tag')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siTagIcon></svg>
          <figcaption class="text-muted-foreground text-xs">tag</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('trash-2')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siTrash2Icon></svg>
          <figcaption class="text-muted-foreground text-xs">trash-2</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('trending-up')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siTrendingUpIcon></svg>
          <figcaption class="text-muted-foreground text-xs">
            trending-up
          </figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('truck')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siTruckIcon></svg>
          <figcaption class="text-muted-foreground text-xs">truck</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('upload')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siUploadIcon></svg>
          <figcaption class="text-muted-foreground text-xs">upload</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('user')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siUserIcon></svg>
          <figcaption class="text-muted-foreground text-xs">user</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('users')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siUsersIcon></svg>
          <figcaption class="text-muted-foreground text-xs">users</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('video')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siVideoIcon></svg>
          <figcaption class="text-muted-foreground text-xs">video</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('wallet')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siWalletIcon></svg>
          <figcaption class="text-muted-foreground text-xs">wallet</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('wifi')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siWifiIcon></svg>
          <figcaption class="text-muted-foreground text-xs">wifi</figcaption>
        </figure>
      </li>
      <li [hidden]="!matches('zap')">
        <figure scFrame size="sm" class="flex flex-col items-center gap-2 p-4">
          <svg siZapIcon></svg>
          <figcaption class="text-muted-foreground text-xs">zap</figcaption>
        </figure>
      </li>
    </ul>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    icons: $localize`Icons`,
  };

  protected readonly query = signal('');
  protected readonly total = NAMES.length;
  protected readonly shown = computed(
    () => NAMES.filter((name) => this.matches(name)).length,
  );

  protected matches(name: string): boolean {
    return name.includes(this.query().trim().toLowerCase());
  }
}
