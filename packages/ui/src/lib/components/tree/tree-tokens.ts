import { InjectionToken } from '@angular/core';
import type { ScTree } from './tree';

/** The tree, for its items (a token: the item and the tree import each other). */
export const SC_TREE = new InjectionToken<ScTree<unknown>>('SC_TREE');
