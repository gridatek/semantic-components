import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScHeaderLayout,
  ScSidebarLayout,
  ScSplitLayout,
  ScStackLayout,
} from '@semantic-components/layouts';

@Component({
  selector: 'app-article-editor',
  imports: [ScSplitLayout, ScStackLayout, ScHeaderLayout, ScSidebarLayout],
  template: `
    <div class="h-screen" sc-header-layout>
      <!-- Header -->
      <div class="bg-card border-b" slot="header">
        <div class="px-6 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <a class="text-primary hover:underline" href="/articles">← Back to Articles</a>
              <div class="w-px h-6 bg-border"></div>
              <div class="flex items-center gap-3">
                <h1 class="text-lg font-semibold">Edit Article</h1>
                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Draft
                </span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-muted-foreground">Last saved: 2 minutes ago</span>
              <button class="border border-border px-4 py-2 rounded">Preview</button>
              <button class="border border-border px-4 py-2 rounded">Save Draft</button>
              <button class="bg-primary text-primary-foreground px-4 py-2 rounded">Publish</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Editor Layout -->
      <div class="h-full" sc-split-layout direction="horizontal" ratio="70-30" gap="0">
        <!-- Editor Area -->
        <div class="bg-background">
          <div class="h-full" sc-split-layout direction="vertical" ratio="15-85" gap="0">
            <!-- Article Meta -->
            <div class="border-b bg-muted/30 p-6">
              <div sc-stack-layout gap="4">
                <div>
                  <label class="block text-sm font-medium mb-2">Article Title</label>
                  <input
                    class="w-full text-xl font-semibold border-none bg-transparent focus:outline-none focus:ring-0"
                    type="text"
                    value="Building Scalable Component Libraries"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    class="w-full text-muted-foreground border-none bg-transparent focus:outline-none focus:ring-0"
                    type="text"
                    value="Learn how to create and maintain component libraries that scale with your organization's needs"
                  />
                </div>
              </div>
            </div>

            <!-- Content Editor -->
            <div class="flex-1 overflow-auto">
              <div class="max-w-4xl mx-auto p-8">
                <div sc-stack-layout gap="6">
                  <!-- Cover Image -->
                  <div class="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <div sc-stack-layout gap="3">
                      <div
                        class="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center"
                      >
                        <span class="text-2xl">🖼️</span>
                      </div>
                      <div>
                        <p class="font-medium">Add a cover image</p>
                        <p class="text-sm text-muted-foreground">
                          Drag and drop an image or click to browse
                        </p>
                      </div>
                      <button
                        class="bg-primary text-primary-foreground px-4 py-2 rounded w-fit mx-auto"
                      >
                        Choose Image
                      </button>
                    </div>
                  </div>

                  <!-- Article Content -->
                  <div class="prose max-w-none">
                    <h2>Introduction</h2>
                    <p>
                      Component libraries have become an essential part of modern web development.
                      They provide a consistent design language, improve development efficiency, and
                      ensure maintainability across large applications and teams.
                    </p>

                    <p>
                      In this comprehensive guide, we'll explore the key principles and best
                      practices for building component libraries that can scale with your
                      organization's growing needs.
                    </p>

                    <h2>Planning Your Component Library</h2>
                    <p>
                      Before diving into code, it's crucial to establish a solid foundation for your
                      component library. This involves understanding your requirements, defining
                      your design system, and setting up the right tooling.
                    </p>

                    <h3>Understanding Requirements</h3>
                    <ul>
                      <li>Identify the components your team needs most</li>
                      <li>Consider accessibility requirements from the start</li>
                      <li>Plan for internationalization if needed</li>
                      <li>Think about theming and customization needs</li>
                    </ul>

                    <h3>Design System Foundation</h3>
                    <p>
                      A strong design system is the backbone of any successful component library. It
                      should include:
                    </p>
                    <ul>
                      <li>Color palette and typography scale</li>
                      <li>Spacing and layout guidelines</li>
                      <li>Component behavior patterns</li>
                      <li>Accessibility standards</li>
                    </ul>

                    <h2>Implementation Strategies</h2>
                    <p>
                      When implementing your component library, consider these key strategies to
                      ensure long-term success:
                    </p>

                    <blockquote>
                      <p>
                        "The best component libraries are built with both the present needs and
                        future growth in mind. They evolve with the organization while maintaining
                        consistency and reliability."
                      </p>
                    </blockquote>

                    <h3>Start Small, Think Big</h3>
                    <p>
                      Begin with a core set of fundamental components like buttons, inputs, and
                      cards. As you establish patterns and workflows, gradually expand to more
                      complex components.
                    </p>

                    <h3>Documentation is Key</h3>
                    <p>
                      Comprehensive documentation ensures adoption and proper usage of your
                      components. Include:
                    </p>
                    <ul>
                      <li>API documentation with examples</li>
                      <li>Design guidelines and usage patterns</li>
                      <li>Migration guides for updates</li>
                      <li>Contribution guidelines for team members</li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>
                      Building a scalable component library is an investment in your team's future
                      productivity. By following these principles and continuously iterating based
                      on user feedback, you'll create a valuable resource that grows with your
                      organization.
                    </p>
                  </div>

                  <!-- Add Content Blocks -->
                  <div class="border-t pt-6">
                    <div class="flex gap-3">
                      <button
                        class="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm"
                      >
                        <span>📝</span>
                        Text Block
                      </button>
                      <button
                        class="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm"
                      >
                        <span>🖼️</span>
                        Image
                      </button>
                      <button
                        class="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm"
                      >
                        <span>💻</span>
                        Code Block
                      </button>
                      <button
                        class="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm"
                      >
                        <span>📊</span>
                        Chart
                      </button>
                      <button
                        class="flex items-center gap-2 border border-border px-3 py-2 rounded text-sm"
                      >
                        <span>🎥</span>
                        Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Settings -->
        <div class="bg-muted/30 border-l overflow-auto">
          <div class="p-6">
            <div sc-stack-layout gap="6">
              <!-- Publish Settings -->
              <div>
                <h3 class="font-medium mb-4">Publish Settings</h3>
                <div sc-stack-layout gap="4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Status</label>
                    <select class="w-full p-2 border rounded">
                      <option>Draft</option>
                      <option>Review</option>
                      <option>Published</option>
                      <option>Archived</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Publish Date</label>
                    <input class="w-full p-2 border rounded" type="datetime-local" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Author</label>
                    <select class="w-full p-2 border rounded">
                      <option>Sarah Johnson</option>
                      <option>Mike Chen</option>
                      <option>Emma Wilson</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Categories & Tags -->
              <div>
                <h3 class="font-medium mb-4">Categories & Tags</h3>
                <div sc-stack-layout gap="4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Category</label>
                    <select class="w-full p-2 border rounded">
                      <option>Development</option>
                      <option>Design</option>
                      <option>Tutorial</option>
                      <option>News</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Tags</label>
                    <input
                      class="w-full p-2 border rounded"
                      type="text"
                      placeholder="Add tags separated by commas"
                      value="react, components, design-system"
                    />
                    <div class="flex flex-wrap gap-1 mt-2">
                      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">react</span>
                      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        components
                      </span>
                      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        design-system
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SEO Settings -->
              <div>
                <h3 class="font-medium mb-4">SEO Settings</h3>
                <div sc-stack-layout gap="4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Meta Description</label>
                    <textarea
                      class="w-full p-2 border rounded text-sm"
                      rows="3"
                      placeholder="Brief description for search engines"
                    >
Learn how to create and maintain component libraries that scale with your organization's needs. Best practices and implementation strategies included.</textarea
                    >
                    <div class="text-xs text-muted-foreground mt-1">147/160 characters</div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Slug</label>
                    <input
                      class="w-full p-2 border rounded text-sm"
                      type="text"
                      value="building-scalable-component-libraries"
                    />
                  </div>
                </div>
              </div>

              <!-- Featured Image -->
              <div>
                <h3 class="font-medium mb-4">Featured Image</h3>
                <div class="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <div sc-stack-layout gap="2">
                    <div
                      class="w-12 h-12 bg-muted rounded mx-auto flex items-center justify-center"
                    >
                      <span>🖼️</span>
                    </div>
                    <div>
                      <p class="text-sm font-medium">Upload featured image</p>
                      <p class="text-xs text-muted-foreground">Recommended: 1200x630</p>
                    </div>
                    <button
                      class="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              </div>

              <!-- Social Preview -->
              <div>
                <h3 class="font-medium mb-4">Social Preview</h3>
                <div class="border rounded-lg p-3 bg-background">
                  <div sc-stack-layout gap="2">
                    <div class="w-full h-20 bg-muted rounded"></div>
                    <div>
                      <h4 class="font-medium text-sm">Building Scalable Component Libraries</h4>
                      <p class="text-xs text-muted-foreground">
                        Learn how to create and maintain component libraries that scale...
                      </p>
                      <p class="text-xs text-muted-foreground">yoursite.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Article Stats -->
              <div>
                <h3 class="font-medium mb-4">Article Stats</h3>
                <div sc-stack-layout gap="3">
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Word count:</span>
                    <span>1,247</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Reading time:</span>
                    <span>~5 minutes</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Created:</span>
                    <span>Mar 15, 2024</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Last edited:</span>
                    <span>2 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleEditorPage {}
