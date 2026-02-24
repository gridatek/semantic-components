import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicEditorDemoContainer } from './demos/basic-editor-demo-container';
import { PrefilledEditorDemoContainer } from './demos/prefilled-editor-demo-container';
import { MinimalToolbarEditorDemoContainer } from './demos/minimal-toolbar-editor-demo-container';
import { NoCountEditorDemoContainer } from './demos/no-count-editor-demo-container';
import { ReadonlyEditorDemoContainer } from './demos/readonly-editor-demo-container';
import { CustomHeightEditorDemoContainer } from './demos/custom-height-editor-demo-container';
import { FullFeaturedEditorDemoContainer } from './demos/full-featured-editor-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-editor-page',
  imports: [
    BasicEditorDemoContainer,
    PrefilledEditorDemoContainer,
    MinimalToolbarEditorDemoContainer,
    NoCountEditorDemoContainer,
    ReadonlyEditorDemoContainer,
    CustomHeightEditorDemoContainer,
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
        <h2 scHeading toc>Examples</h2>
        <app-basic-editor-demo-container />
        <app-prefilled-editor-demo-container />
        <app-minimal-toolbar-editor-demo-container />
        <app-no-count-editor-demo-container />
        <app-readonly-editor-demo-container />
        <app-custom-height-editor-demo-container />
        <app-full-featured-editor-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditorPage {}
