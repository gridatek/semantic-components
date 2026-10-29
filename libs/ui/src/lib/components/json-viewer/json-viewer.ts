import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DOCUMENT,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScTree } from '../tree/tree';
import { ScTreeItem } from '../tree/tree-item';
import { ScTreeItemGroup } from '../tree/tree-item-group';
import { ScTreeItemTrigger } from '../tree/tree-item-trigger';
import { ScJsonViewerInjector } from './json-viewer-injector';
import {
  type ScJsonViewerNode,
  childrenOf,
  copyText,
  dateText,
  isExpandable,
  nodeOf,
} from './json-viewer-nodes';
import { ScJsonViewerSummary } from './json-viewer-summary';

/**
 * A JSON value as a tree (`role="tree"`, our Tree): keys and type-coloured
 * values, objects and arrays that open and close, long arrays split into
 * ranges of 100. Rows are drawn from `data`; children only once their parent
 * has opened. One Tab stop, arrows, type-ahead on keys; Ctrl/⌘+C copies the
 * focused value. Name it with `aria-label`.
 */
@Component({
  selector: 'ul[scJsonViewer]',
  imports: [
    NgTemplateOutlet,
    ScTreeItem,
    ScTreeItemGroup,
    ScTreeItemTrigger,
    ScJsonViewerInjector,
  ],
  hostDirectives: [ScTree],
  exportAs: 'scJsonViewer',
  template: `
    <ng-container
      [ngTemplateOutlet]="row"
      [ngTemplateOutletContext]="{ $implicit: root() }"
    />

    <ng-template #row let-node>
      <li
        scTreeItem
        data-slot="json-viewer-row"
        [attr.data-kind]="node.kind"
        [value]="node.path"
        [label]="node.key ?? ''"
        [selectable]="false"
        [expanded]="isOpen(node)"
        (expandedChange)="setOpen(node, $event)"
        (focus)="focused.set(node)"
      >
        <div scTreeItemTrigger class="my-0 gap-1 py-0.5 font-mono">
          <span
            data-slot="json-viewer-marker"
            aria-hidden="true"
            [class]="markerClass(node)"
          ></span>
          @if (node.kind === 'range') {
            <span class="text-muted-foreground">{{ node.key }}</span>
          } @else {
            @if (node.key !== null) {
              <span data-slot="json-viewer-key" class="text-foreground">
                {{ node.key }}<span class="text-muted-foreground">:</span>
              </span>
            }
            @if (node.kind === 'object' || node.kind === 'array') {
              <span
                data-slot="json-viewer-summary"
                class="text-muted-foreground"
              >
                {{ node.kind === 'object' ? '{' : '[' }}
                @if (summary(); as summary) {
                  <ng-container
                    [ngTemplateOutlet]="summary.template"
                    [ngTemplateOutletContext]="{ $implicit: node }"
                  />
                } @else {
                  {{ node.size }}
                }
                {{ node.kind === 'object' ? '}' : ']' }}
              </span>
            } @else {
              <span
                data-slot="json-viewer-value"
                [class]="valueClass(node)"
                [attr.title]="titleOf(node)"
                >{{ textOf(node) }}</span
              >
            }
          }
        </div>
        @if (expandable(node)) {
          <ul
            scTreeItemGroup
            scJsonViewerInjector
            #group="scJsonViewerInjector"
          >
            @if (isOpen(node) || drawn().has(node.path)) {
              @for (child of children(node); track child.path) {
                <ng-container
                  [ngTemplateOutlet]="row"
                  [ngTemplateOutletContext]="{ $implicit: child }"
                  [ngTemplateOutletInjector]="group.injector"
                />
              }
            }
          </ul>
        }
      </li>
    </ng-template>
  `,
  host: {
    'data-slot': 'json-viewer',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScJsonViewer {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The value shown: any JSON (and `undefined`, BigInt, dates). */
  readonly data = input<unknown>();
  /** How many levels are open at first: 1 opens the top value. */
  readonly expandDepth = input(1, { transform: numberAttribute });
  /** Object keys in alphabetical order, rather than as written. */
  readonly sortKeys = input(false, { transform: booleanAttribute });
  /** Strings longer than this are shortened with "…" (the whole text in the tooltip and when copied). */
  readonly maxStringLength = input(Infinity, { transform: numberAttribute });
  /** The top value's key; none by default. */
  readonly rootName = input<string>('');

  protected readonly summary = contentChild(ScJsonViewerSummary);

  /** The focused row's path, `user.roles[2]` (`''` for the top value). */
  readonly focusedPath = computed(() => this.focused()?.path ?? null);

  protected readonly focused = signal<ScJsonViewerNode | null>(null);

  /** Open by depth, all open, all closed — then each row the user toggled. */
  private readonly mode = signal<'depth' | 'all' | 'none'>('depth');
  private readonly toggled = signal<ReadonlyMap<string, boolean>>(new Map());
  /** Rows whose children have been drawn: kept when they close. */
  protected readonly drawn = signal<ReadonlySet<string>>(new Set());

  protected readonly root = computed(() =>
    nodeOf(this.data(), this.rootName() || null, '', 1),
  );

  /** Each node's children, worked out once per data and sort order. */
  private readonly childrenCache = computed(() => {
    this.root();
    this.sortKeys();
    return new WeakMap<ScJsonViewerNode, ScJsonViewerNode[]>();
  });

  protected readonly class = computed(() => cn('text-sm', this.classInput()));

  /** Opens every object and array. */
  expandAll(): void {
    this.mode.set('all');
    this.toggled.set(new Map());
  }

  /** Closes every object and array. */
  collapseAll(): void {
    this.mode.set('none');
    this.toggled.set(new Map());
  }

  protected isOpen(node: ScJsonViewerNode): boolean {
    const toggled = this.toggled().get(node.path);
    if (toggled !== undefined) return toggled;
    const mode = this.mode();
    return (
      mode === 'all' || (mode === 'depth' && node.depth <= this.expandDepth())
    );
  }

  protected setOpen(node: ScJsonViewerNode, open: boolean): void {
    this.toggled.update((map) => new Map(map).set(node.path, open));
    if (!this.drawn().has(node.path))
      this.drawn.update((set) => new Set(set).add(node.path));
  }

  protected expandable(node: ScJsonViewerNode): boolean {
    return isExpandable(node);
  }

  protected children(node: ScJsonViewerNode): ScJsonViewerNode[] {
    const cache = this.childrenCache();
    let children = cache.get(node);
    if (!children) {
      children = childrenOf(node, this.sortKeys());
      cache.set(node, children);
    }
    return children;
  }

  protected textOf(node: ScJsonViewerNode): string {
    switch (node.kind) {
      case 'string': {
        const text = node.value as string;
        const max = this.maxStringLength();
        return JSON.stringify(
          text.length > max ? `${text.slice(0, max).trimEnd()}…` : text,
        );
      }
      case 'bigint':
        return `${node.value}n`;
      case 'date':
        return dateText(node.value);
      default:
        return String(node.value);
    }
  }

  /** The whole string, when it is shortened. */
  protected titleOf(node: ScJsonViewerNode): string | null {
    return node.kind === 'string' &&
      (node.value as string).length > this.maxStringLength()
      ? (node.value as string)
      : null;
  }

  protected markerClass(node: ScJsonViewerNode): string {
    return cn(
      // A triangle pointing at the text (inline-start border), turned down when open.
      'mx-1 size-0 shrink-0 border-y-4 border-s-[6px] border-y-transparent border-s-current text-muted-foreground transition-transform duration-200 motion-reduce:transition-none',
      this.isOpen(node) && 'rotate-90 rtl:-rotate-90',
      !isExpandable(node) && 'invisible',
    );
  }

  protected valueClass(node: ScJsonViewerNode): string {
    return cn(
      'min-w-0 truncate',
      node.kind === 'string' && 'text-emerald-700 dark:text-emerald-400',
      (node.kind === 'number' || node.kind === 'bigint') &&
        'text-sky-700 dark:text-sky-400',
      node.kind === 'boolean' && 'text-violet-700 dark:text-violet-400',
      node.kind === 'date' && 'text-amber-700 dark:text-amber-400',
      (node.kind === 'null' || node.kind === 'undefined') &&
        'text-muted-foreground italic',
    );
  }

  /** Ctrl/⌘+C on a row copies its value (a string as itself, the rest as JSON). */
  protected onKeydown(event: KeyboardEvent): void {
    const node = this.focused();
    if (
      !node ||
      !(event.ctrlKey || event.metaKey) ||
      event.key.toLowerCase() !== 'c' ||
      this.document.getSelection()?.toString()
    )
      return;
    event.preventDefault();
    void this.document.defaultView?.navigator.clipboard?.writeText(
      copyText(node),
    );
  }
}
