import { type TreeItem, TreeItemGroup } from '@angular/aria/tree';
import { Directive, input } from '@angular/core';

/**
 * Angular Aria's `TreeItemGroup` (its deferred content inherited) with
 * `ownedBy` made optional, so `ScTreeGroupContent` can host it and set its
 * owner itself, from its place.
 *
 * A workaround, waiting for Angular: to be removed once a directive can feed
 * its host directives' required inputs (angular/angular#50510), or Aria makes
 * them optional — the parts then host Aria's directive itself.
 */
@Directive({ selector: 'ng-template[scTreeAriaGroup]' })
export class ScTreeAriaGroup<V> extends TreeItemGroup<V> {
  override readonly ownedBy = input<TreeItem<V>>(undefined as never);
}
