import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScMasonryGrid,
  ScMasonryGridItem,
} from '@semantic-components/ui';

/** Text of any length — measured, never guessed; resize the window and it lays out again. The first card spans two columns. */
@Component({
  selector: 'app-cards-masonry-grid-demo',
  imports: [
    ScCard,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScMasonryGrid,
    ScMasonryGridItem,
  ],
  template: `
    <ul scMasonryGrid [columnWidth]="180" class="w-full gap-4">
      @for (note of notes; track note.title; let first = $first) {
        <li scMasonryGridItem [span]="first ? 2 : 1">
          <div scCard size="sm">
            <div scCardHeader>
              <h3 scCardTitle>{{ note.title }}</h3>
              <p scCardDescription>{{ note.text }}</p>
            </div>
          </div>
        </li>
      }
    </ul>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CardsMasonryGridDemo {
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
}
