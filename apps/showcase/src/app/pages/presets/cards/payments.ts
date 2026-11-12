import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
  ScButton,
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronRightIcon,
  SiEllipsisIcon,
  SiGaugeIcon,
  SiRefreshCwIcon,
  SiRepeatIcon,
} from '@semantic-icons/lucide-icons';

/** A breadcrumb with a menu in it, then links as items. */
@Component({
  selector: 'app-preview-payments',
  imports: [
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardHeader,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiCalendarIcon,
    SiChevronRightIcon,
    SiEllipsisIcon,
    SiRefreshCwIcon,
    SiRepeatIcon,
    SiGaugeIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader class="flex flex-col gap-3">
        <nav scBreadcrumb aria-label="Payments path">
          <ol scBreadcrumbList>
            <li scBreadcrumbItem>
              <a scBreadcrumbLink href="#">Home</a>
            </li>
            <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
            <li scBreadcrumbItem>
              <div scMenuProvider align="start">
                <button scButton scMenuTrigger variant="ghost" size="icon-sm">
                  <svg siEllipsisIcon></svg>
                  <span class="sr-only">Account options</span>
                </button>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuGroup>
                        <div scMenuItem value="profile">Profile</div>
                        <div scMenuItem value="statements">Statements</div>
                        <div scMenuItem value="documents">Documents</div>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
            </li>
            <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
            <li scBreadcrumbItem>
              <span scBreadcrumbPage>Payments</span>
            </li>
          </ol>
        </nav>
      </div>
      <div scCardContent>
        <div scItemGroup role="list">
          <div role="listitem" class="w-full">
            <a scItem variant="muted" href="#">
              <div scItemMedia variant="icon"><svg siGaugeIcon></svg></div>
              <div scItemBody>
                <div scItemTitle>Change transfer limit</div>
                <p scItemDescription>
                  Adjust how much you can send from your balance.
                </p>
              </div>
              <svg
                siChevronRightIcon
                class="text-muted-foreground size-4 shrink-0"
              ></svg>
            </a>
          </div>
          <div role="listitem" class="w-full">
            <a scItem variant="muted" href="#">
              <div scItemMedia variant="icon"><svg siCalendarIcon></svg></div>
              <div scItemBody>
                <div scItemTitle>Scheduled transfers</div>
                <p scItemDescription>
                  Set up a transfer to send at a later date.
                </p>
              </div>
              <svg
                siChevronRightIcon
                class="text-muted-foreground size-4 shrink-0"
              ></svg>
            </a>
          </div>
          <div role="listitem" class="w-full">
            <a scItem variant="muted" href="#">
              <div scItemMedia variant="icon"><svg siRepeatIcon></svg></div>
              <div scItemBody>
                <div scItemTitle>Direct Debits</div>
                <p scItemDescription>Set up and manage regular payments.</p>
              </div>
              <svg
                siChevronRightIcon
                class="text-muted-foreground size-4 shrink-0"
              ></svg>
            </a>
          </div>
          <div role="listitem" class="w-full">
            <a scItem variant="muted" href="#">
              <div scItemMedia variant="icon"><svg siRefreshCwIcon></svg></div>
              <div scItemBody>
                <div scItemTitle>Recurring card payments</div>
                <p scItemDescription>Manage your repeated card transactions.</p>
              </div>
              <svg
                siChevronRightIcon
                class="text-muted-foreground size-4 shrink-0"
              ></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewPayments {}
