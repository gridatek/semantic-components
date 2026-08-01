import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

@Component({
  imports: [ScResizablePanel, ScResizablePanelGroup],
  template: `
    <div scResizablePanelGroup direction="horizontal">
      <div scResizablePanel [minSize]="20" [maxSize]="80" [defaultSize]="50">
        a
      </div>
    </div>
  `,
})
class PanelHost {
  readonly panel = viewChild.required(ScResizablePanel);
}

function mountPanel(): PanelHost {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(PanelHost);
  fixture.detectChanges();
  return fixture.componentInstance;
}

describe('ScResizablePanel', () => {
  it('takes its initial size from defaultSize', () => {
    expect(mountPanel().panel().size()).toBe(50);
  });

  it('clamps a direct size.set() above maxSize', () => {
    const panel = mountPanel().panel();

    // Before the set interceptor this bypassed the clamp entirely, because
    // only setSize() applied it.
    panel.size.set(999);

    expect(panel.size()).toBe(80);
  });

  it('clamps a direct size.set() below minSize', () => {
    const panel = mountPanel().panel();

    panel.size.set(-5);

    expect(panel.size()).toBe(20);
  });

  it('still clamps through setSize()', () => {
    const panel = mountPanel().panel();

    panel.setSize(999);

    expect(panel.size()).toBe(80);
  });

  it('leaves an in-range value untouched', () => {
    const panel = mountPanel().panel();

    panel.size.set(35);

    expect(panel.size()).toBe(35);
  });
});
