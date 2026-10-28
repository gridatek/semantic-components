import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScSeparator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-pricing-page',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScSeparator,
    SiCheckIcon,
  ],
  template: `
    <div class="bg-background min-h-screen px-4 py-16">
      <div class="mx-auto max-w-5xl">
        <div class="mb-12 text-center">
          <h1
            class="text-foreground text-4xl font-bold tracking-tight"
            i18n="@@pricing.title"
          >
            Simple, transparent pricing
          </h1>
          <p
            class="text-muted-foreground mt-3 text-lg"
            i18n="@@pricing.description"
          >
            Choose the plan that's right for you
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Free Plan -->
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle i18n="@@pricing.free">Free</h2>
              <p scCardDescription i18n="@@pricing.free.description">
                For individuals getting started
              </p>
            </div>
            <div scCardBody class="flex-1">
              <p class="mb-6 text-3xl font-bold">
                $0
                <span
                  class="text-muted-foreground text-sm font-normal"
                  i18n="@@pricing.perMonth"
                >
                  /month
                </span>
              </p>
              <div scSeparator class="mb-6"></div>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.free.projects"
                    >1 project</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.free.storage"
                    >1GB storage</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.free.support"
                    >Community support</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.free.analytics"
                    >Basic analytics</span
                  >
                </li>
              </ul>
            </div>
            <div scCardFooter>
              <button
                scButton
                variant="outline"
                class="w-full"
                i18n="@@pricing.getStarted"
              >
                Get Started
              </button>
            </div>
          </div>

          <!-- Pro Plan -->
          <div scCard class="border-primary">
            <div scCardHeader>
              <div class="flex items-center justify-between">
                <h2 scCardTitle i18n="@@pricing.pro">Pro</h2>
                <span scBadge i18n="@@pricing.mostPopular">Most Popular</span>
              </div>
              <p scCardDescription i18n="@@pricing.pro.description">
                For growing teams
              </p>
            </div>
            <div scCardBody class="flex-1">
              <p class="mb-6 text-3xl font-bold">
                $29
                <span
                  class="text-muted-foreground text-sm font-normal"
                  i18n="@@pricing.perMonth"
                >
                  /month
                </span>
              </p>
              <div scSeparator class="mb-6"></div>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.pro.projects"
                    >Unlimited projects</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.pro.storage"
                    >100GB storage</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.pro.support"
                    >Priority support</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.pro.analytics"
                    >Advanced analytics</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.pro.integrations"
                    >Custom integrations</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.pro.api"
                    >API access</span
                  >
                </li>
              </ul>
            </div>
            <div scCardFooter>
              <button scButton class="w-full" i18n="@@pricing.getStarted">
                Get Started
              </button>
            </div>
          </div>

          <!-- Enterprise Plan -->
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle i18n="@@pricing.enterprise">Enterprise</h2>
              <p scCardDescription i18n="@@pricing.enterprise.description">
                For large organizations
              </p>
            </div>
            <div scCardBody class="flex-1">
              <p
                class="mb-6 text-3xl font-bold"
                i18n="@@pricing.enterprise.price"
              >
                Custom
              </p>
              <div scSeparator class="mb-6"></div>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.enterprise.everything"
                    >Everything in Pro</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.enterprise.storage"
                    >Unlimited storage</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.enterprise.support"
                    >24/7 dedicated support</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.enterprise.sla"
                    >Custom SLA</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.enterprise.sso"
                    >SSO & SAML</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm" i18n="@@pricing.enterprise.audit"
                    >Audit logs</span
                  >
                </li>
              </ul>
            </div>
            <div scCardFooter>
              <button
                scButton
                variant="outline"
                class="w-full"
                i18n="@@pricing.contactSales"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class PricingPage {}
