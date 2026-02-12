export interface VirtualListRange {
  start: number;
  end: number;
}

export interface VirtualListItem<T = unknown> {
  index: number;
  data: T;
}
