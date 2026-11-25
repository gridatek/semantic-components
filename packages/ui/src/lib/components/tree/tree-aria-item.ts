import { type Tree, TreeItem, type TreeItemGroup } from '@angular/aria/tree';
import { Directive, input } from '@angular/core';

/**
 * Angular Aria's `TreeItem` with `parent` made optional, so `ScTreeItem` can
 * host it without exposing `parent` (a host directive's required inputs must
 * be exposed — angular/angular#50510) and set it itself, from its place.
 *
 * A workaround, waiting for Angular: to be removed once a directive can feed
 * its host directives' required inputs (angular/angular#50510), or Aria makes
 * them optional — the parts then host Aria's directive itself.
 */
@Directive({ selector: '[scTreeAriaItem]' })
export class ScTreeAriaItem<V> extends TreeItem<V> {
  override readonly parent = input<Tree<V> | TreeItemGroup<V>>(
    undefined as never,
  );
}
