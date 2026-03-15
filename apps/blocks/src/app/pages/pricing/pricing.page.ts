import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
          <h1 class="text-foreground text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p class="text-muted-foreground mt-3 text-lg">
            Choose the plan that's right for you
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Free Plan -->
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle>Free</h2>
              <p scCardDescription>For individuals getting started</p>
            </div>
            <div scCardBody class="flex-1">
              <p class="mb-6 text-3xl font-bold">
                $0
                <span class="text-muted-foreground text-sm font-normal">
                  /month
                </span>
              </p>
              <div scSeparator class="mb-6"></div>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">1 project</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">1GB storage</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Community support</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Basic analytics</span>
                </li>
              </ul>
            </div>
            <div scCardFooter>
              <button scButton variant="outline" class="w-full">
                Get Started
              </button>
            </div>
          </div>

          <!-- Pro Plan -->
          <div scCard class="border-primary">
            <div scCardHeader>
              <div class="flex items-center justify-between">
                <h2 scCardTitle>Pro</h2>
                <span scBadge>Most Popular</span>
              </div>
              <p scCardDescription>For growing teams</p>
            </div>
            <div scCardBody class="flex-1">
              <p class="mb-6 text-3xl font-bold">
                $29
                <span class="text-muted-foreground text-sm font-normal">
                  /month
                </span>
              </p>
              <div scSeparator class="mb-6"></div>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Unlimited projects</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">100GB storage</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Priority support</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Advanced analytics</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Custom integrations</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">API access</span>
                </li>
              </ul>
            </div>
            <div scCardFooter>
              <button scButton class="w-full">Get Started</button>
            </div>
          </div>

          <!-- Enterprise Plan -->
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle>Enterprise</h2>
              <p scCardDescription>For large organizations</p>
            </div>
            <div scCardBody class="flex-1">
              <p class="mb-6 text-3xl font-bold">Custom</p>
              <div scSeparator class="mb-6"></div>
              <ul class="space-y-3">
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Everything in Pro</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Unlimited storage</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">24/7 dedicated support</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Custom SLA</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">SSO & SAML</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="text-primary size-4"></svg>
                  <span class="text-sm">Audit logs</span>
                </li>
              </ul>
            </div>
            <div scCardFooter>
              <button scButton variant="outline" class="w-full">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class PricingPage {}
