import { InjectionToken } from '@angular/core';

/**
 * A parent that wants to know when one of its `scNavigationMenuLink`s is
 * followed — to close itself: the Navigation Menu (its panel), the Header (its
 * mobile menu). A link tells the nearest one.
 */
export interface ScNavigationMenuLinkHost {
  /** One of its links was followed. */
  linkFollowed(): void;
}

export const SC_NAVIGATION_MENU_LINK_HOST =
  new InjectionToken<ScNavigationMenuLinkHost>('SC_NAVIGATION_MENU_LINK_HOST');
