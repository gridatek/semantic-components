import type { TreeItem, TreeItemGroup } from '@angular/aria/tree';
import { InjectionToken } from '@angular/core';

export interface ScTreeItemGroupContext {
  /** The aria tree item that owns this group. */
  readonly owner: TreeItem<unknown>;

  /**
   * Makes the group the parent of a nested item. Items are created before the
   * group's own view (they are projected content), so the group sets their
   * `parent` once its aria group exists — still before TreeItem's ngOnInit.
   */
  adopt(item: TreeItem<unknown>): void;

  /** Called by `ScTreeItemGroupRef` when the aria group is created. */
  setAriaGroup(group: TreeItemGroup<unknown>): void;
}

export const SC_TREE_ITEM_GROUP = new InjectionToken<ScTreeItemGroupContext>(
  'SC_TREE_ITEM_GROUP',
);
