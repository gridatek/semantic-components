export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  labels?: KanbanLabel[];
  assignee?: KanbanAssignee;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, unknown>;
}

export interface KanbanLabel {
  id: string;
  text: string;
  color: string;
}

export interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  order: number;
  color?: string;
  limit?: number;
  collapsed?: boolean;
}

export interface KanbanDragEvent {
  card: KanbanCard;
  sourceColumnId: string;
  targetColumnId: string;
  sourceIndex: number;
  targetIndex: number;
}

export interface KanbanCardAddEvent {
  columnId: string;
  title: string;
}

export interface KanbanCardDeleteEvent {
  card: KanbanCard;
  columnId: string;
}
