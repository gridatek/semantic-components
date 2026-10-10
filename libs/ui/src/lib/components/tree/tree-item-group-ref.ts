import { TreeItemGroup } from '@angular/aria/tree';
import { Directive, inject } from '@angular/core';
import { setInput } from '../../utils';
import { SC_TREE_ITEM_GROUP } from './tree-tokens';

/**
 * Hands the aria group to `ScTreeItemGroup` as soon as it is created. A view
 * query is too late: nested items are projected content, created (and
 * initialised) before the group's own view.
 */
@Directive({ selector: 'ng-template[scTreeItemGroupRef]' })
export class ScTreeItemGroupRef {
  constructor() {
    const host = inject(SC_TREE_ITEM_GROUP);
    const group = inject(TreeItemGroup);
    // Nested items register (TreeItem.ngOnInit) before this view's bindings
    // run, and registering reads `ownedBy` — so set it now as well.
    setInput(group.ownedBy, host.owner);
    host.setAriaGroup(group);
  }
}
