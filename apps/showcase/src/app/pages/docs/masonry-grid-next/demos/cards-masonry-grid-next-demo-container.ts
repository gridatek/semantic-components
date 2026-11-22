import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardsMasonryGridNextDemo } from './cards-masonry-grid-next-demo';

@Component({
  selector: 'app-cards-masonry-grid-next-demo-container',
  imports: [DemoContainer, CardsMasonryGridNextDemo],
  template: `
    <app-demo-container
      title="Cards and spans"
      [code]="code"
      demoUrl="/demos/masonry-grid-next/cards-masonry-grid-next-demo"
    >
      <app-cards-masonry-grid-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CardsMasonryGridNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScMasonryGridNext,
  ScMasonryGridNextItem,
} from '@semantic-components/ui';

/** Text of any length — measured, never guessed; resize the window and it lays out again. The first card spans two columns. */
@Component({
  selector: 'app-cards-masonry-grid-next-demo',
  imports: [ScFrame, ScMasonryGridNext, ScMasonryGridNextItem],
  template: \`
    <ul scMasonryGridNext [columnWidth]="180" class="w-full gap-4">
      @for (note of notes; track note.title; let first = $first) {
        <li
          scMasonryGridNextItem
          [span]="first ? 2 : 1"
          scFrame
          class="bg-card p-4"
        >
          <p class="font-medium">{{ note.title }}</p>
          <p class="text-muted-foreground mt-1 text-sm">{{ note.text }}</p>
        </li>
      }
    </ul>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CardsMasonryGridNextDemo {
  private readonly notes = [
    { title: 'Groceries', text: 'Milk, eggs, bread, and the good coffee.' },
    {
      title: 'Ideas',
      text: 'A timeline that draws its own line. A dock that grows near the pointer. A marquee written once.',
    },
    { title: 'Call', text: 'Ada, about Friday.' },
    {
      title: 'Reading',
      text: 'Finish the chapter on layout; then the one on type, which everyone says is the best part of the book, and probably is.',
    },
    { title: 'Garden', text: 'Water the roses.' },
    {
      title: 'Trip',
      text: 'Book the train for the coast. Pack light: two shirts, the grey jumper, a book.',
    },
    { title: 'Code', text: 'Rename Next away after the merge.' },
    { title: 'Music', text: 'The Satie, again.' },
  ];
}`;
}
