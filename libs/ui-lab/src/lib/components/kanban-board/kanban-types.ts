export interface ScKanbanCardData {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  labels?: ScKanbanLabel[];
  assignee?: ScKanbanAssignee;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, unknown>;
}

export interface ScKanbanLabel {
  id: string;
  text: string;
  color: string;
}

export interface ScKanbanAssignee {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
}

export interface ScKanbanColumnData {
  id: string;
  title: string;
  order: number;
  color?: string;
  limit?: number;
  collapsed?: boolean;
}

export interface ScKanbanDragEvent {
  card: ScKanbanCardData;
  sourceColumnId: string;
  targetColumnId: string;
  sourceIndex: number;
  targetIndex: number;
}

export interface ScKanbanCardAddEvent {
  columnId: string;
  title: string;
}

export interface ScKanbanCardDeleteEvent {
  card: ScKanbanCardData;
  columnId: string;
}

/** A card moved with the keyboard, for its announcement. */
export interface ScKanbanMove {
  readonly card: ScKanbanCardData;
  readonly column: ScKanbanColumnData;
  /** Its new place in the column, from 1. */
  readonly position: number;
  /** How many cards the column has now. */
  readonly count: number;
}
