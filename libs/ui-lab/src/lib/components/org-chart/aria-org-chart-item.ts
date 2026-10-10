import { type Tree, TreeItem, type TreeItemGroup } from '@angular/aria/tree';
import { Directive, input } from '@angular/core';

/**
 * `@angular/aria`'s `TreeItem` with `parent` and `value` made optional, so
 * `ScOrgChartNode` can host it without re-exposing required inputs
 * (angular/angular#50510) and set them from its node data. (`TreeItem` builds
 * its pattern in `ngOnInit`, after these overrides exist.)
 */
@Directive({ selector: '[scAriaOrgChartItem]' })
export class ScAriaOrgChartItem<V> extends TreeItem<V> {
  override readonly parent = input<Tree<V> | TreeItemGroup<V>>(
    undefined as never,
  );
  override readonly value = input<V>(undefined as never);
}
