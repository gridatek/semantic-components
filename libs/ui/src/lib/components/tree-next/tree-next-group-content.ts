import { DeferredContent } from '@angular/aria/private';
import { DestroyRef, Directive, inject, untracked } from '@angular/core';
import type { ScTreeNext } from './tree-next';
import { ScTreeNextItem, ScTreeNextParent } from './tree-next-item';
import { SC_TREE_NEXT } from './tree-next-tokens';

/**
 * A branch's children, in a template inside `scTreeNextGroup`: rendered the
 * first time the branch opens (Angular Aria's deferred content), then kept.
 * Its items find their parent here.
 */
@Directive({
  selector: 'ng-template[scTreeNextGroupContent]',
  hostDirectives: [DeferredContent],
  providers: [
    { provide: ScTreeNextParent, useExisting: ScTreeNextGroupContent },
  ],
})
export class ScTreeNextGroupContent<V = string> extends ScTreeNextParent<V> {
  /** The item it belongs to. */
  readonly owner = inject<ScTreeNextItem<V>>(ScTreeNextItem);

  constructor() {
    super();
    const tree = inject(SC_TREE_NEXT) as ScTreeNext<V>;
    this.owner.branch.set(true);
    inject(DestroyRef).onDestroy(() => this.owner.branch.set(false));
    // Expand all on: a branch appearing opens too.
    if (untracked(tree.expandingAll))
      tree.setExpanded(untracked(this.owner.value), true);
  }
}
