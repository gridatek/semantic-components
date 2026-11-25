import { DestroyRef, Directive, inject, untracked } from '@angular/core';
import { setInput } from '../../utils';
import type { ScTree } from './tree';
import { ScTreeAriaGroup } from './tree-aria-group';
import { ScTreeItem, ScTreeParent } from './tree-item';
import { SC_TREE } from './tree-tokens';

/**
 * A branch's children, in a template inside `scTreeGroup`: Angular Aria's
 * item group (`ngTreeItemGroup`) — rendered the first time the branch opens,
 * then kept. Its items find their parent here.
 */
@Directive({
  selector: 'ng-template[scTreeGroupContent]',
  hostDirectives: [ScTreeAriaGroup],
  providers: [{ provide: ScTreeParent, useExisting: ScTreeGroupContent }],
})
export class ScTreeGroupContent<V = string> extends ScTreeParent<V> {
  /** Angular Aria's group, under this one. */
  readonly ariaGroup = inject<ScTreeAriaGroup<V>>(ScTreeAriaGroup);
  /** The item it belongs to. */
  readonly owner = inject<ScTreeItem<V>>(ScTreeItem);

  constructor() {
    super();
    const tree = inject(SC_TREE) as ScTree<V>;
    // Its owner, set before Aria's group registers with it.
    setInput(this.ariaGroup.ownedBy, this.owner.ariaItem);
    this.owner.branch.set(true);
    inject(DestroyRef).onDestroy(() => this.owner.branch.set(false));
    // Expand all on: a branch appearing opens too.
    if (untracked(tree.expandingAll))
      tree.setExpanded(untracked(this.owner.value), true);
  }
}
