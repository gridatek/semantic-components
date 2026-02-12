import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScContextMenu } from './context-menu';

@Component({
  selector: 'sc-context-menu-content',
  template: `
    <ng-template #contentTemplate>
      <div [class]="class()" role="menu" (keydown)="onKeydown($event)">
        <ng-content />
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuContent {
  private readonly contextMenu = inject(ScContextMenu);
  readonly classInput = input<string>('', { alias: 'class' });

  @ViewChild('contentTemplate', { static: true })
  templateRef!: TemplateRef<unknown>;

  protected readonly class = computed(() =>
    cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'animate-in fade-in-0 zoom-in-95',
      this.classInput(),
    ),
  );

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.contextMenu.closeMenu();
    }
  }
}
