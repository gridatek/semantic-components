export type ComponentStatus = 'Experimental' | 'Developer Preview' | 'Stable';

export type ComponentLibrary =
  | 'ui'
  | 'ui-lab'
  | 'carousel'
  | 'code'
  | 'editor'
  | 'charts'
  | 'third-party';

export type ComponentCategory =
  | 'Forms'
  | 'Buttons & Actions'
  | 'Navigation'
  | 'Layout'
  | 'Data Display'
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
