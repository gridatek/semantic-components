import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OnceIntersectionObserverDemo } from './once-intersection-observer-demo';

@Component({
  selector: 'app-once-intersection-observer-demo-container',
  imports: [DemoContainer, OnceIntersectionObserverDemo],
  template: `
    <app-demo-container
      title="Reveal once"
      description="With once, the observer stops after the element first becomes visible, so it stays revealed. Useful for scroll-in animations and lazy loading."
      demoUrl="/demos/intersection-observer/once-intersection-observer-demo"
      [code]="code"
    >
      <app-once-intersection-observer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OnceIntersectionObserverDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScIntersectionObserver } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-once-intersection-observer-demo',
  imports: [ScIntersectionObserver],
  template: \`
    <div
      #scroller
      role="region"
      aria-label="Revealed items"
      tabindex="0"
      class="focus-visible:ring-ring/50 h-72 w-full max-w-md space-y-4 overflow-y-auto rounded-md border p-4 outline-none focus-visible:ring-[3px]"
    >
      @for (item of items; track item) {
        <div
          scIntersectionObserver
          once
          [root]="scroller"
          [threshold]="0.5"
          class="bg-card translate-y-4 rounded-md border p-4 text-sm opacity-0 transition duration-700 data-[intersecting=true]:translate-y-0 data-[intersecting=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
        >
          {{ item }}
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OnceIntersectionObserverDemo {
  readonly items = Array.from({ length: 12 }, (_, i) => \`Item \${i + 1}\`);
}`;
}
