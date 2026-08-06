import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
} from '@semantic-components/ui';

@Component({
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
  ],
  template: `
    <div scContextMenu>
      <div scContextMenuTrigger>Right click here</div>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="Edit">Edit</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
})
class Host {}

/** No portal at all — the shape that threw NG0951 with a required query. */
@Component({
  imports: [ScContextMenu, ScContextMenuTrigger],
  template: `
    <div scContextMenu>
      <div scContextMenuTrigger>Right click here</div>
    </div>
  `,
})
class HostWithoutPortal {}

function mount(type: typeof Host | typeof HostWithoutPortal) {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

function target(fixture: { nativeElement: unknown }): HTMLElement {
  const el = (fixture.nativeElement as HTMLElement).querySelector(
    '[scContextMenu]',
  );
  if (!el) throw new Error('no context menu rendered');
  return el as HTMLElement;
}

describe('ScContextMenu', () => {
  it('renders without a runtime error', () => {
    expect(() => mount(Host)).not.toThrow();
  });

  it('renders even when no menu portal is projected', () => {
    // A required contentChild threw NG0951 here.
    expect(() => mount(HostWithoutPortal)).not.toThrow();
  });

  it('suppresses the native menu on right-click', () => {
    const fixture = mount(Host);
    const event = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 40,
      clientY: 60,
    });

    target(fixture).dispatchEvent(event);
    fixture.detectChanges();

    expect(event.defaultPrevented).toBe(true);
  });

  it('anchors its hidden trigger at the pointer', () => {
    const fixture = mount(Host);
    target(fixture).dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 40,
        clientY: 60,
      }),
    );
    fixture.detectChanges();

    const anchor = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLElement>('[scMenuTrigger]');
    expect(anchor?.style.left).toBe('40px');
    expect(anchor?.style.top).toBe('60px');
  });
});
