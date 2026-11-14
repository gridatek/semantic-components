import { Service, computed, signal } from '@angular/core';
import { ARTICLES, type Article, type Status } from './articles-data';

/** What the editor saves: an article less its id and readers. */
export type ArticleDraft = Omit<Article, 'id' | 'readership'>;

/**
 * The articles, for every page: created, saved, published and deleted here.
 * In memory — a reload starts from the samples; put your API behind it.
 */
@Service()
export class ArticleStore {
  private readonly items = signal<Article[]>(ARTICLES);
  readonly articles = this.items.asReadonly();

  /** The published ones with readers: the dashboard's top editorials. */
  readonly read = computed(() =>
    this.items().filter(
      (article) => article.status === 'published' && article.readership,
    ),
  );

  get(id: string): Article | null {
    return this.items().find((article) => article.id === id) ?? null;
  }

  /** The articles of an issue (its id), or all of them. */
  of(issue: string | null): Article[] {
    const articles = this.items();
    return issue ? articles.filter((a) => a.issue === issue) : articles;
  }

  /** Saves an article; a new one (no id) gets one from its title. */
  save(draft: ArticleDraft, id: string | null): Article {
    const current = id ? this.get(id) : null;
    if (current) {
      const article = { ...current, ...draft };
      this.items.update((items) =>
        items.map((item) => (item.id === current.id ? article : item)),
      );
      return article;
    }
    const article: Article = { ...draft, id: this.idFor(draft.title) };
    this.items.update((items) => [article, ...items]);
    return article;
  }

  setStatus(id: string, status: Status): void {
    this.items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  /** Deletes an article; returns a function that puts it back. */
  remove(id: string): () => void {
    const items = this.items();
    const index = items.findIndex((article) => article.id === id);
    if (index < 0) return () => undefined;
    const article = items[index];
    this.items.set(items.filter((item) => item.id !== id));
    return () =>
      this.items.update((now) => [
        ...now.slice(0, index),
        article,
        ...now.slice(index),
      ]);
  }

  /** "The Future of…" → the-future-of…, unique. */
  private idFor(title: string): string {
    const base =
      title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'untitled';
    let id = base;
    for (let n = 2; this.get(id) || id === 'new'; n++) id = `${base}-${n}`;
    return id;
  }
}
