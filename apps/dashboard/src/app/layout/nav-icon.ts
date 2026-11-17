import { Component, ViewEncapsulation, input } from '@angular/core';
import {
  SiBadgeDollarSignIcon,
  SiBookOpenIcon,
  SiBotIcon,
  SiCalendarIcon,
  SiChartBarIcon,
  SiChartLineIcon,
  SiChartPieIcon,
  SiCircleAlertIcon,
  SiCircleQuestionMarkIcon,
  SiCircleUserRoundIcon,
  SiComponentIcon,
  SiContactIcon,
  SiFileTextIcon,
  SiGraduationCapIcon,
  SiHeartPulseIcon,
  SiHouseIcon,
  SiKanbanIcon,
  SiKeyRoundIcon,
  SiLayoutGridIcon,
  SiLogInIcon,
  SiMailIcon,
  SiMessageCircleIcon,
  SiNotebookPenIcon,
  SiPackageIcon,
  SiPlugIcon,
  SiReceiptIcon,
  SiRectangleEllipsisIcon,
  SiSettingsIcon,
  SiShieldCheckIcon,
  SiShoppingBagIcon,
  SiShoppingCartIcon,
  SiSmileIcon,
  SiSparklesIcon,
  SiTable2Icon,
  SiTableIcon,
  SiTicketIcon,
  SiUserPlusIcon,
  SiUsersIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import type { NavIcon } from './nav';

/** A sidebar link's icon, by name. Its host is `display: contents`: the icon sits in the button as its own. */
@Component({
  selector: 'app-nav-icon',
  imports: [
    SiBadgeDollarSignIcon,
    SiBookOpenIcon,
    SiBotIcon,
    SiCalendarIcon,
    SiChartBarIcon,
    SiChartLineIcon,
    SiChartPieIcon,
    SiCircleAlertIcon,
    SiCircleQuestionMarkIcon,
    SiCircleUserRoundIcon,
    SiComponentIcon,
    SiContactIcon,
    SiFileTextIcon,
    SiGraduationCapIcon,
    SiHeartPulseIcon,
    SiHouseIcon,
    SiKanbanIcon,
    SiKeyRoundIcon,
    SiLayoutGridIcon,
    SiLogInIcon,
    SiMailIcon,
    SiMessageCircleIcon,
    SiNotebookPenIcon,
    SiPackageIcon,
    SiPlugIcon,
    SiReceiptIcon,
    SiRectangleEllipsisIcon,
    SiSettingsIcon,
    SiShieldCheckIcon,
    SiShoppingBagIcon,
    SiShoppingCartIcon,
    SiSmileIcon,
    SiSparklesIcon,
    SiTableIcon,
    SiTable2Icon,
    SiTicketIcon,
    SiUserPlusIcon,
    SiUsersIcon,
    SiWrenchIcon,
  ],
  template: `
    @switch (name()) {
      @case ('modern') {
        <svg siHouseIcon></svg>
      }
      @case ('analytics') {
        <svg siChartLineIcon></svg>
      }
      @case ('ecommerce') {
        <svg siShoppingBagIcon></svg>
      }
      @case ('saas') {
        <svg siSparklesIcon></svg>
      }
      @case ('school') {
        <svg siGraduationCapIcon></svg>
      }
      @case ('health') {
        <svg siHeartPulseIcon></svg>
      }
      @case ('ai') {
        <svg siBotIcon></svg>
      }
      @case ('calendar') {
        <svg siCalendarIcon></svg>
      }
      @case ('chats') {
        <svg siMessageCircleIcon></svg>
      }
      @case ('email') {
        <svg siMailIcon></svg>
      }
      @case ('contacts') {
        <svg siContactIcon></svg>
      }
      @case ('notes') {
        <svg siNotebookPenIcon></svg>
      }
      @case ('blog') {
        <svg siBookOpenIcon></svg>
      }
      @case ('tickets') {
        <svg siTicketIcon></svg>
      }
      @case ('invoice') {
        <svg siReceiptIcon></svg>
      }
      @case ('profile') {
        <svg siCircleUserRoundIcon></svg>
      }
      @case ('shop') {
        <svg siShoppingCartIcon></svg>
      }
      @case ('kanban') {
        <svg siKanbanIcon></svg>
      }
      @case ('customers') {
        <svg siUsersIcon></svg>
      }
      @case ('orders') {
        <svg siPackageIcon></svg>
      }
      @case ('table') {
        <svg siTableIcon></svg>
      }
      @case ('form') {
        <svg siFileTextIcon></svg>
      }
      @case ('settings') {
        <svg siSettingsIcon></svg>
      }
      @case ('faq') {
        <svg siCircleQuestionMarkIcon></svg>
      }
      @case ('pricing') {
        <svg siBadgeDollarSignIcon></svg>
      }
      @case ('roles') {
        <svg siShieldCheckIcon></svg>
      }
      @case ('integrations') {
        <svg siPlugIcon></svg>
      }
      @case ('ui') {
        <svg siComponentIcon></svg>
      }
      @case ('form-layouts') {
        <svg siRectangleEllipsisIcon></svg>
      }
      @case ('data-tables') {
        <svg siTable2Icon></svg>
      }
      @case ('charts') {
        <svg siChartPieIcon></svg>
      }
      @case ('cards') {
        <svg siLayoutGridIcon></svg>
      }
      @case ('widget-charts') {
        <svg siChartBarIcon></svg>
      }
      @case ('icons') {
        <svg siSmileIcon></svg>
      }
      @case ('error') {
        <svg siCircleAlertIcon></svg>
      }
      @case ('maintenance') {
        <svg siWrenchIcon></svg>
      }
      @case ('login') {
        <svg siLogInIcon></svg>
      }
      @case ('register') {
        <svg siUserPlusIcon></svg>
      }
      @case ('forgot') {
        <svg siKeyRoundIcon></svg>
      }
      @case ('two-steps') {
        <svg siShieldCheckIcon></svg>
      }
    }
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class SidebarIcon {
  readonly name = input.required<NavIcon>();
}
