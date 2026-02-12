import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMasonryGrid, ScMasonryItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-cards-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryItem],
  template: `
    <sc-masonry-grid [columns]="3" [gap]="16">
      @for (card of cards(); track card.id) {
        <sc-masonry-item>
          <div class="rounded-lg border bg-card overflow-hidden">
            @if (card.image) {
              <img
                [src]="card.image"
                [alt]="card.title"
                class="w-full h-32 object-cover"
              />
            }
            <div class="p-4">
              <h4 class="font-semibold">{{ card.title }}</h4>
              <p class="text-sm text-muted-foreground mt-2">
                {{ card.description }}
              </p>
              @if (card.tags.length > 0) {
                <div class="flex flex-wrap gap-1 mt-3">
                  @for (tag of card.tags; track tag) {
                    <span class="px-2 py-0.5 text-xs bg-muted rounded-full">
                      {{ tag }}
                    </span>
                  }
                </div>
              }
            </div>
          </div>
        </sc-masonry-item>
      }
    </sc-masonry-grid>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsMasonryGridDemo {
  readonly cards = signal([
    {
      id: 1,
      title: 'Getting Started with Angular',
      description:
        'Learn the basics of Angular framework and build your first application.',
      image: 'https://picsum.photos/seed/c1/400/200',
      tags: ['Angular', 'Tutorial'],
    },
    {
      id: 2,
      title: 'Design Systems',
      description:
        'How to create and maintain a design system for your organization.',
      image: null,
      tags: ['Design', 'UI/UX'],
    },
    {
      id: 3,
      title: 'TypeScript Tips',
      description:
        'Advanced TypeScript patterns and best practices for better code quality and maintainability.',
      image: 'https://picsum.photos/seed/c3/400/150',
      tags: ['TypeScript', 'JavaScript'],
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox',
      description:
        'Understanding when to use CSS Grid and when to use Flexbox.',
      image: null,
      tags: ['CSS', 'Layout'],
    },
    {
      id: 5,
      title: 'Performance Optimization',
      description:
        'Tips and tricks for optimizing web application performance.',
      image: 'https://picsum.photos/seed/c5/400/180',
      tags: ['Performance', 'Web'],
    },
    {
      id: 6,
      title: 'Accessibility Best Practices',
      description:
        'Building inclusive web applications that work for everyone.',
      image: null,
      tags: ['A11y', 'Web'],
    },
  ]);
}
