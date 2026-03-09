import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FullFeaturedEditorDemoContainer } from './demos/full-featured-editor-demo-container';
import { NoCountEditorDemoContainer } from './demos/no-count-editor-demo-container';
import { PrefilledEditorDemoContainer } from './demos/prefilled-editor-demo-container';
import { ReadonlyEditorDemoContainer } from './demos/readonly-editor-demo-container';

@Component({
  selector: 'app-editor-page',
  imports: [
    PrefilledEditorDemoContainer,
    NoCountEditorDemoContainer,
    ReadonlyEditorDemoContainer,
    FullFeaturedEditorDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Editor</h1>
        <p class="text-muted-foreground">
          Composable WYSIWYG editor powered by Tiptap, with customizable
          toolbar, keyboard shortcuts, and HTML output.
        </p>
        <app-component-badges path="editor" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-prefilled-editor-demo-container />
        <app-no-count-editor-demo-container />
        <app-readonly-editor-demo-container />
        <app-full-featured-editor-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditorPage {}
