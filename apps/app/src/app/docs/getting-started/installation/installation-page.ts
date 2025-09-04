import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScCodeHighlighter } from '@semantic-components/code-highlighter';

import { TocHeadingDirective } from '../../../components/toc/toc-heading.directive';

@Component({
  selector: 'app-installation-page',
  imports: [ScCodeHighlighter, TocHeadingDirective],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h2 class="text-2xl font-semibold tracking-tight" tocHeading>Prerequisites</h2>
          <p class="text-muted-foreground">
            Before installing &#64;semantic-components/ui, ensure your project meets the following
            requirements:
          </p>
        </div>
      </div>

      <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Angular 19.0.0 or higher</li>
        <li>Node.js (recommended latest LTS version)</li>
        <li>npm or yarn package manager</li>
      </ul>
    </div>

    <div class="space-y-6 mt-10">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h2 class="text-2xl font-semibold tracking-tight" tocHeading>
            Install the Core Packages
          </h2>
          <p class="text-muted-foreground">Install the following dependencies.</p>
        </div>
      </div>

      <sc-code-highlighter
        code="npm install @semantic-components/ui @semantic-components/utils @semantic-icons/lucide-icons"
        language="shellscript"
      />
    </div>

    <div class="space-y-6 mt-10">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h2 class="text-2xl font-semibold tracking-tight" tocHeading>
            Install Required Peer Dependencies
          </h2>
          <p class="text-muted-foreground">
            The library requires several peer dependencies. Install them with the following command:
          </p>
        </div>
      </div>

      <sc-code-highlighter
        code="npm install class-variance-authority clsx tailwind-merge tw-animate-css"
        language="shellscript"
      />
    </div>

    <div class="space-y-6 mt-10">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h2 class="text-2xl font-semibold tracking-tight" tocHeading>
            Install TipTap Dependencies
          </h2>
          <p class="text-muted-foreground">
            This UI library uses TipTap for rich text editing capabilities. Below is a table of the
            required TipTap extensions:
          </p>
        </div>
      </div>

      <div class="overflow-x-auto shadow-md rounded-lg">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-700 text-white uppercase text-sm">
              <th class="py-3 px-6 text-left">Category</th>
              <th class="py-3 px-6 text-left">Extensions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-6 font-medium">Core</td>
              <td class="py-4 px-6">
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/core
                </span>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-document
                </span>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-paragraph
                </span>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-text
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 bg-gray-50">
              <td class="py-4 px-6 font-medium">Formatting</td>
              <td class="py-4 px-6">
                <span
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-bold
                </span>
                <span
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-italic
                </span>
                <span
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-underline
                </span>
                <span
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-strike
                </span>
                <span
                  class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-code
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-6 font-medium">Typography</td>
              <td class="py-4 px-6">
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-heading
                </span>
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-font-family
                </span>
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-text-style
                </span>
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-color
                </span>
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-text-align
                </span>
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-highlight
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 bg-gray-50">
              <td class="py-4 px-6 font-medium">Lists</td>
              <td class="py-4 px-6">
                <span
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-bullet-list
                </span>
                <span
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-ordered-list
                </span>
                <span
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-list-item
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-6 font-medium">Media</td>
              <td class="py-4 px-6">
                <span
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-image
                </span>
                <span
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-youtube
                </span>
                <span
                  class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-horizontal-rule
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 bg-gray-50">
              <td class="py-4 px-6 font-medium">Structure</td>
              <td class="py-4 px-6">
                <span
                  class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-blockquote
                </span>
                <span
                  class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-link
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-6 font-medium">Tables</td>
              <td class="py-4 px-6">
                <span
                  class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-table
                </span>
                <span
                  class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-table-header
                </span>
                <span
                  class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-table-row
                </span>
                <span
                  class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-table-cell
                </span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50 bg-gray-50">
              <td class="py-4 px-6 font-medium">History</td>
              <td class="py-4 px-6">
                <span
                  class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  &#64;tiptap/extension-history
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="space-y-6 mt-10">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h2 class="text-2xl font-semibold tracking-tight" tocHeading>Adding Styles</h2>
          <p class="text-muted-foreground">
            Add the library's styles to your project by including the following in your styles.css
            file:
          </p>
        </div>
      </div>

      <sc-code-highlighter
        code="@import '@semantic-components/ui/styles';"
        language="shellscript"
      />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InstallationPage {}
