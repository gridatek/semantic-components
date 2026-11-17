import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';
import { BlogStore } from '../../shared/stores';
import { BlogCard } from './blog-card';

/** Blog Listing: the featured posts, then the others. */
@Component({
  selector: 'app-blog-listing-page',
  imports: [RouterLink, ScLink, SiPlusIcon, PageHeader, BlogCard],
  template: `
    <app-page-header title="Blog" [trail]="[{ label: 'Blog' }]">
      <a scLink variant="button" routerLink="/apps/blog/create">
        <svg siPlusIcon></svg>
        Create Post
      </a>
    </app-page-header>

    <h2 class="sr-only">Featured</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      @for (post of featured(); track post.id; let first = $first) {
        <app-blog-card [post]="post" featured [priority]="first" />
      }
    </div>

    <h2 class="sr-only">All posts</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      @for (post of others(); track post.id) {
        <app-blog-card [post]="post" />
      }
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BlogListingPage {
  private readonly store = inject(BlogStore);
  /** Featured first: the store's featured posts, else the two latest. */
  protected readonly featured = computed(() => {
    const posts = this.store.posts();
    const featured = posts.filter((post) => post.featured);
    return (featured.length ? featured : posts).slice(0, 2);
  });
  protected readonly others = computed(() => {
    const featured = new Set(this.featured().map((post) => post.id));
    return this.store.posts().filter((post) => !featured.has(post.id));
  });
}
