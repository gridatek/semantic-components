import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ScQrCode,
  ScQrCodeDownload,
  type ScQrCodeDownloadFormat,
} from '@semantic-components/ui-lab/qr-code';

@Component({
  imports: [ScQrCode, ScQrCodeDownload],
  template: `
    <svg
      scQrCode
      #qr="scQrCode"
      [value]="value()"
      [quietZone]="quietZone()"
      [aria-label]="label()"
    ></svg>
    <button scQrCodeDownload [for]="qr" [format]="format()" filename="code">
      Download
    </button>
  `,
})
class QrHost {
  readonly value = signal('https://angular.dev');
  readonly quietZone = signal(4);
  readonly label = signal('QR code');
  readonly format = signal<ScQrCodeDownloadFormat>('svg');
}

function mount() {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(QrHost);
  fixture.detectChanges();
  const root = fixture.nativeElement as HTMLElement;
  return {
    fixture,
    host: fixture.componentInstance,
    svg: () => root.querySelector('svg[scQrCode]') as SVGSVGElement,
    button: () => root.querySelector('button') as HTMLButtonElement,
  };
}

describe('ScQrCode', () => {
  it('draws the dark modules as a single path', () => {
    const { svg } = mount();
    expect(svg().querySelectorAll('path').length).toBe(1);
    expect(svg().querySelectorAll('rect').length).toBe(0);
    expect(svg().querySelector('path')?.getAttribute('d')).toMatch(/^M\d/);
  });

  it('includes the quiet zone in the view box (4 modules by default)', () => {
    const { fixture, host, svg } = mount();
    const size = (): number =>
      Number(svg().getAttribute('viewBox')?.split(' ')[2]);
    const withZone = size();
    host.quietZone.set(0);
    fixture.detectChanges();
    expect(withZone - size()).toBe(8);
  });

  it('has an accessible name, by default and when given', () => {
    const { fixture, host, svg } = mount();
    expect(svg().getAttribute('role')).toBe('img');
    expect(svg().getAttribute('aria-label')).toBe('QR code');
    host.label.set('QR code for angular.dev');
    fixture.detectChanges();
    expect(svg().getAttribute('aria-label')).toBe('QR code for angular.dev');
  });

  it('renders nothing and reports an error when the value is too long', () => {
    const { fixture, host, svg, button } = mount();
    host.value.set('x'.repeat(5000));
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(svg().querySelector('path')).toBeNull();
    expect(svg().hasAttribute('data-invalid')).toBe(true);
    expect(button().disabled).toBe(true);
  });

  it('renders nothing, without an error, for an empty value', () => {
    const { fixture, host, svg } = mount();
    host.value.set('');
    fixture.detectChanges();
    expect(svg().querySelector('path')).toBeNull();
    expect(svg().hasAttribute('data-invalid')).toBe(false);
  });
});

describe('ScQrCodeDownload', () => {
  it('downloads an SVG with the code and a background', async () => {
    const { button } = mount();
    let saved: Blob | undefined;
    let filename = '';
    const createObjectURL = URL.createObjectURL;
    const revokeObjectURL = URL.revokeObjectURL;
    URL.createObjectURL = (blob: Blob) => {
      saved = blob;
      return 'blob:qr';
    };
    URL.revokeObjectURL = () => undefined;
    const click = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
      filename = this.download;
    };
    try {
      button().click();
    } finally {
      URL.createObjectURL = createObjectURL;
      URL.revokeObjectURL = revokeObjectURL;
      HTMLAnchorElement.prototype.click = click;
    }

    expect(filename).toBe('code.svg');
    const text = await saved?.text();
    expect(text).toContain('<rect width="100%" height="100%"');
    expect(text).toMatch(/<path d="M\d/);
    expect(text).toMatch(/width="\d+" height="\d+"/);
  });
});
