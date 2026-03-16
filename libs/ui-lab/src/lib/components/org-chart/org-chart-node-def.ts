import { Directive, TemplateRef, inject } from '@angular/core';
import type { ScOrgChartNodeDefContext } from './org-chart-types';

@Directive({
  selector: 'ng-template[scOrgChartNodeDef]',
})
export class ScOrgChartNodeDef {
  readonly templateRef =
    inject<TemplateRef<ScOrgChartNodeDefContext>>(TemplateRef);
}
