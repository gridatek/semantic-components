import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarquee,
  ScMarqueeClone,
  ScMarqueeItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-testimonials-marquee-demo',
  imports: [ScMarquee, ScMarqueeClone, ScMarqueeItem],
  template: `
    <sc-marquee [duration]="40" [gap]="24">
      @for (testimonial of testimonials; track testimonial.name) {
        <div
          sc-marquee-item
          class="w-80 rounded-lg border bg-background p-4 shadow-sm"
        >
          <p class="text-sm text-muted-foreground mb-3">
            "{{ testimonial.quote }}"
          </p>
          <div class="flex items-center gap-2">
            <div
              class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium"
            >
              {{ testimonial.name.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-medium">{{ testimonial.name }}</p>
              <p class="text-xs text-muted-foreground">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
        </div>
      }
      <ng-container sc-marquee-clone>
        @for (testimonial of testimonials; track testimonial.name) {
          <div
            sc-marquee-item
            class="w-80 rounded-lg border bg-background p-4 shadow-sm"
          >
            <p class="text-sm text-muted-foreground mb-3">
              "{{ testimonial.quote }}"
            </p>
            <div class="flex items-center gap-2">
              <div
                class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium"
              >
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-medium">{{ testimonial.name }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ testimonial.role }}
                </p>
              </div>
            </div>
          </div>
        }
      </ng-container>
    </sc-marquee>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsMarqueeDemo {
  readonly testimonials = [
    {
      name: 'Alice Johnson',
      role: 'CEO at TechCorp',
      quote: 'This component library has transformed our development workflow.',
    },
    {
      name: 'Bob Smith',
      role: 'Lead Developer',
      quote:
        'The best Angular components I have ever used. Highly recommended!',
    },
    {
      name: 'Carol Williams',
      role: 'Product Manager',
      quote: 'Clean, accessible, and beautifully designed components.',
    },
    {
      name: 'David Brown',
      role: 'UX Designer',
      quote: 'Perfect balance of functionality and aesthetics.',
    },
  ];
}
