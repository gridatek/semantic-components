import { type Tree, TreeItem, type TreeItemGroup } from '@angular/aria/tree';
import { Directive, input } from '@angular/core';

/**
 * `@angular/aria`'s `TreeItem` with `parent` made optional, so `ScTreeItem` can
 * host it without re-exposing `parent` (Angular forces required host-directive
 * inputs to be exposed — angular/angular#50510) and resolve it itself.
 */
@Directive({ selector: '[scAriaTreeItem]' })
export class ScAriaTreeItem<V> extends TreeItem<V> {
  override readonly parent = input<Tree<V> | TreeItemGroup<V>>(
    undefined as never,
  );
}
