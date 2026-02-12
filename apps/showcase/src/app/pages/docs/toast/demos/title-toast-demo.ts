import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScToastStack, ScToaster } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-title-toast-demo',
  imports: [ScToastStack],
  template: `
    <button
      class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      (click)="showToast()"
    >
      Show Toast
    </button>

    <sc-toast-stack />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2025 at 5:57 PM',
    });
  }
}
