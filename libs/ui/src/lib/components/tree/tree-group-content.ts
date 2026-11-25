import { DeferredContent } from '@angular/aria/private';
import { DestroyRef, Directive, inject, untracked } from '@angular/core';
import type { ScTree } from './tree';
import { ScTreeItem, ScTreeParent } from './tree-item';
import { SC_TREE } from './tree-tokens';

/**
 * A branch's children, in a template inside `scTreeGroup`: rendered the
 * first time the branch opens (Angular Aria's deferred content), then kept.
 * Its items find their parent here.
 */
@Directive({
  selector: 'ng-template[scTreeGroupContent]',
  hostDirectives: [DeferredContent],
  providers: [{ provide: ScTreeParent, useExisting: ScTreeGroupContent }],
})
export class ScTreeGroupContent<V = string> extends ScTreeParent<V> {
  /** The item it belongs to. */
  readonly owner = inject<ScTreeItem<V>>(ScTreeItem);

  constructor() {
    super();
    const tree = inject(SC_TREE) as ScTree<V>;
    this.owner.branch.set(true);
    inject(DestroyRef).onDestroy(() => this.owner.branch.set(false));
    // Expand all on: a branch appearing opens too.
    if (untracked(tree.expandingAll))
      tree.setExpanded(untracked(this.owner.value), true);
  }
}
