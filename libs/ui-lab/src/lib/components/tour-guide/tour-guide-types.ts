export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  highlightPadding?: number;
  disableInteraction?: boolean;
  beforeShow?: () => void | Promise<void>;
  afterHide?: () => void | Promise<void>;
}

export interface TourOptions {
  steps: TourStep[];
  overlayOpacity?: number;
  animationDuration?: number;
  showProgress?: boolean;
  showStepNumbers?: boolean;
  allowClose?: boolean;
  allowKeyboardNavigation?: boolean;
  scrollBehavior?: ScrollBehavior;
  scrollPadding?: number;
}

export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}
