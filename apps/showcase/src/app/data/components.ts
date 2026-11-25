export type ComponentStatus = 'Experimental' | 'Developer Preview' | 'Stable';

export type ComponentLibrary = 'ui' | 'third-party';

export type ComponentCategory =
  | 'Forms'
  | 'Buttons & Actions'
  | 'Navigation'
  | 'Layout'
  | 'Data Display'
  | 'Charts'
  | 'Feedback'
  | 'Overlay'
  | 'Media'
  | 'Editor'
  | 'Advanced'
  | 'Utilities'
  | 'Recipes';

export interface ComponentItem {
  name: string;
  path: string;
  description: string;
  status: ComponentStatus;
  library: ComponentLibrary;
  category: ComponentCategory;
  hidden?: boolean;
}

/**
 * Where a component's page is: under its sidebar group's address — charts
 * at /docs/charts/…, utilities at /docs/utilities/…, recipes at
 * /docs/recipes/…, the rest at /docs/components/….
 */
export function docsSection(category: ComponentCategory): string {
  switch (category) {
    case 'Charts':
      return 'charts';
    case 'Utilities':
      return 'utilities';
    case 'Recipes':
      return 'recipes';
    default:
      return 'components';
  }
}

/** A component's page: `/docs/<its section>/<its path>`. */
export function docsPath(
  item: Pick<ComponentItem, 'path' | 'category'>,
): string {
  return `/docs/${docsSection(item.category)}/${item.path}`;
}
