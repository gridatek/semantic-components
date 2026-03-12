export type ComponentStatus = 'Experimental' | 'Developer Preview' | 'Stable';

export type ComponentLibrary = 'ui' | 'ui-lab' | 'carousel' | 'code' | 'editor';

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
  | 'Utilities';

export interface ComponentItem {
  name: string;
  path: string;
  description: string;
  status: ComponentStatus;
  library: ComponentLibrary;
  category: ComponentCategory;
  hidden?: boolean;
}
