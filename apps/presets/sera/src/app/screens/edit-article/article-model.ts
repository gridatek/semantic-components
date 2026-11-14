import { type ArticleDraft } from '../article-directory/article-store';
import {
  type Article,
  MILESTONES,
  type MilestoneId,
  type Status,
} from '../article-directory/articles-data';

/** What Edit Article's form holds: the article, its milestones as boxes. */
export interface ArticleModel {
  title: string;
  body: string;
  issue: string;
  author: string;
  note: string;
  milestones: Record<MilestoneId, boolean>;
}

/** The form's start: the article's, or a blank one. */
export function modelOf(article: Article | null): ArticleModel {
  const reached = new Set(article?.milestones ?? []);
  return {
    title: article?.title ?? '',
    body: article?.body ?? '',
    issue: article?.issue ?? 'spring-2025',
    author: article?.author ?? '',
    note: article?.note ?? '',
    milestones: Object.fromEntries(
      MILESTONES.map((milestone) => [milestone.id, reached.has(milestone.id)]),
    ) as Record<MilestoneId, boolean>,
  };
}

/** The form, as the store saves it. */
export function draftOf(
  model: ArticleModel,
  article: Article | null,
  status: Status,
): ArticleDraft {
  return {
    title: model.title.trim() || 'Untitled Article',
    body: model.body,
    issue: model.issue,
    author: model.author.trim(),
    note: model.note,
    status,
    targetWords: article?.targetWords ?? 2000,
    milestones: MILESTONES.filter((m) => model.milestones[m.id]).map(
      (m) => m.id,
    ),
  };
}
