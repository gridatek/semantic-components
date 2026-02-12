import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { generateQRCode } from './qr-generator';

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

@Component({
  selector: 'sc-qr-code',
  template: `
    <div [class]="containerClass()" role="img" [attr.aria-label]="ariaLabel()">
      <svg
        [attr.viewBox]="viewBox()"
        [attr.width]="size()"
        [attr.height]="size()"
        class="block"
      >
        <!-- Background -->
        <rect
          x="0"
          y="0"
          [attr.width]="moduleCount() + quietZone() * 2"
          [attr.height]="moduleCount() + quietZone() * 2"
          [attr.fill]="backgroundColor()"
        />

        <!-- QR modules -->
        @for (row of qrMatrix(); track $index; let rowIdx = $index) {
          @for (cell of row; track $index; let colIdx = $index) {
            @if (cell) {
              <rect
                [attr.x]="colIdx + quietZone()"
                [attr.y]="rowIdx + quietZone()"
                width="1"
                height="1"
                [attr.fill]="foregroundColor()"
              />
            }
          }
        }

        <!-- Logo/Image overlay -->
        @if (logo()) {
          <rect
            [attr.x]="logoPosition().x - logoPosition().padding"
            [attr.y]="logoPosition().y - logoPosition().padding"
            [attr.width]="logoPosition().size + logoPosition().padding * 2"
            [attr.height]="logoPosition().size + logoPosition().padding * 2"
            [attr.fill]="backgroundColor()"
            [attr.rx]="logoPosition().padding"
          />
          <image
            [attr.href]="logo()"
            [attr.x]="logoPosition().x"
            [attr.y]="logoPosition().y"
            [attr.width]="logoPosition().size"
            [attr.height]="logoPosition().size"
            preserveAspectRatio="xMidYMid slice"
          />
        }
      </svg>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScQrCode {
  // Inputs
  readonly value = input.required<string>();
  readonly size = input<number>(200);
  readonly errorCorrectionLevel = input<QRErrorCorrectionLevel>('M');
  readonly foregroundColor = input<string>('#000000');
  readonly backgroundColor = input<string>('#ffffff');
  readonly quietZone = input<number>(2);
  readonly logo = input<string>('');
  readonly logoSize = input<number>(0.2); // Percentage of QR code size
  readonly ariaLabel = input<string>('QR Code');
  readonly class = input<string>('');

  protected readonly qrMatrix = computed(() => {
    const value = this.value();
    if (!value) return [];
    return generateQRCode(value, this.errorCorrectionLevel());
  });

  protected readonly moduleCount = computed(() => {
    const matrix = this.qrMatrix();
    return matrix.length || 21;
  });

  protected readonly viewBox = computed(() => {
    const count = this.moduleCount();
    const zone = this.quietZone();
    const totalSize = count + zone * 2;
    return `0 0 ${totalSize} ${totalSize}`;
  });

  protected readonly logoPosition = computed(() => {
    const count = this.moduleCount();
    const zone = this.quietZone();
    const logoSizePercent = this.logoSize();
    const logoModules = Math.floor(count * logoSizePercent);
    const padding = 0.5;

    return {
      x: zone + (count - logoModules) / 2,
      y: zone + (count - logoModules) / 2,
      size: logoModules,
      padding,
    };
  });

  protected readonly containerClass = computed(() =>
    cn('inline-block', this.class()),
  );
}
