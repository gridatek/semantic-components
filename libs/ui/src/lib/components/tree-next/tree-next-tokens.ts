import { InjectionToken } from '@angular/core';
import type { ScTreeNext } from './tree-next';

/** The tree, for its items (a token: the item and the tree import each other). */
export const SC_TREE_NEXT = new InjectionToken<ScTreeNext<unknown>>(
  'SC_TREE_NEXT',
);
