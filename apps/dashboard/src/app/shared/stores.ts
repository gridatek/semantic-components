import { Service, computed, signal } from '@angular/core';
import { BLOG_POSTS, type BlogPost, slugOf } from '../data/blog';
import { NOTES, type Note, type NoteColor } from '../data/notes';
import { TICKETS, type Ticket } from '../data/tickets';
import { now } from './formats';

/** The blog's posts, in memory: what the screens add, edit and delete. */
@Service()
export class BlogStore {
  private readonly items = signal<readonly BlogPost[]>(BLOG_POSTS);
  readonly posts = this.items.asReadonly();
  private readonly published = computed(() =>
    this.items().filter((post) => post.status === 'published'),
  );

  bySlug(slug: string): BlogPost | undefined {
    return this.items().find((post) => post.slug === slug);
  }

  byId(id: string): BlogPost | undefined {
    return this.items().find((post) => post.id === id);
  }

  /** Adds a post, or replaces the one with its id; returns it. */
  save(post: Omit<BlogPost, 'id' | 'slug'> & { id?: string }): BlogPost {
    const id =
      post.id ??
      String(Math.max(0, ...this.items().map((item) => +item.id)) + 1);
    const saved: BlogPost = { ...post, id, slug: slugOf(post.title) };
    this.items.update((items) =>
      items.some((item) => item.id === id)
        ? items.map((item) => (item.id === id ? saved : item))
        : [saved, ...items],
    );
    return saved;
  }

  remove(id: string): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }
}

/** Notes, in memory. */
@Service()
export class NotesStore {
  private readonly items = signal<readonly Note[]>(NOTES);
  readonly notes = this.items.asReadonly();

  add(text: string, color: NoteColor): Note {
    const note: Note = {
      id: Math.max(0, ...this.items().map((item) => item.id)) + 1,
      text,
      color,
      date: now(),
    };
    this.items.update((items) => [note, ...items]);
    return note;
  }

  update(id: number, changes: Partial<Pick<Note, 'text' | 'color'>>): void {
    this.items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    );
  }

  remove(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }
}

/** Support tickets, in memory. */
@Service()
export class TicketsStore {
  private readonly items = signal<readonly Ticket[]>(TICKETS);
  readonly tickets = this.items.asReadonly();

  add(ticket: Omit<Ticket, 'id'>): Ticket {
    const added: Ticket = {
      ...ticket,
      id: Math.max(0, ...this.items().map((item) => item.id)) + 1,
    };
    this.items.update((items) => [added, ...items]);
    return added;
  }

  remove(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }
}
