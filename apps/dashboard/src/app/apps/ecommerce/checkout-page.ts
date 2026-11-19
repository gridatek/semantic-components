import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  applyWhen,
  form,
  pattern,
  required,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScField,
  ScFieldErrors,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLegend,
  ScLink,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScRadio,
  ScRadioGroup,
  ScSeparator,
  ScStepper,
  ScStepperIndicator,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPanel,
  ScStepperPrevious,
  ScStepperSeparator,
  ScStepperTitle,
  ScStepperTrigger,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCircleCheckIcon,
  SiMinusIcon,
  SiPlusIcon,
  SiShoppingCartIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { thumbOf } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { money } from '../../shared/format';
import { CartStore } from './shop-store';

/** Checkout (Pro Ecommerce): the cart, delivery, payment — steps in order. */
@Component({
  selector: 'app-checkout-page',
  imports: [
    FormField,
    FormRoot,
    NgOptimizedImage,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScField,
    ScFieldErrors,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLegend,
    ScLink,
    ScNumberDecrement,
    ScNumberGroup,
    ScNumberIncrement,
    ScNumberInput,
    ScRadio,
    ScRadioGroup,
    ScSeparator,
    ScStepper,
    ScStepperIndicator,
    ScStepperItem,
    ScStepperList,
    ScStepperNext,
    ScStepperPanel,
    ScStepperPrevious,
    ScStepperSeparator,
    ScStepperTitle,
    ScStepperTrigger,
    SiCheckIcon,
    SiCircleCheckIcon,
    SiMinusIcon,
    SiPlusIcon,
    SiShoppingCartIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@ecommerce.checkout.checkout"
      title="Checkout"
      [trail]="[{ label: t.apps }, { label: t.checkout }]"
    />

    @if (placed()) {
      <div scCard>
        <div scCardBody>
          <div scEmpty>
            <div scEmptyHeader>
              <div scEmptyMedia variant="icon">
                <svg siCircleCheckIcon></svg>
              </div>
              <h2
                i18n="@@ecommerce.checkout.thankYouOrderIsPlaced"
                scEmptyTitle
              >
                Thank you — order {{ placed() }} is placed
              </h2>
              <div
                i18n="@@ecommerce.checkout.aConfirmationIsOnIts"
                scEmptyDescription
              >
                A confirmation is on its way to {{ model().delivery.email }}.
              </div>
            </div>
            <div i18n="@@ecommerce.checkout.keepShopping" scEmptyBody>
              <a scLink variant="button" routerLink="/apps/ecommerce/shop"
                >Keep shopping</a
              >
            </div>
          </div>
        </div>
      </div>
    } @else if (!cart.lines().length) {
      <div scCard>
        <div scCardBody>
          <div scEmpty>
            <div scEmptyHeader>
              <div scEmptyMedia variant="icon">
                <svg siShoppingCartIcon></svg>
              </div>
              <h2 i18n="@@ecommerce.checkout.yourCartIsEmpty" scEmptyTitle>
                Your cart is empty
              </h2>
              <div
                i18n="@@ecommerce.checkout.addSomethingFromTheShop"
                scEmptyDescription
              >
                Add something from the shop first.
              </div>
            </div>
            <div i18n="@@ecommerce.checkout.goToTheShop" scEmptyBody>
              <a scLink variant="button" routerLink="/apps/ecommerce/shop"
                >Go to the shop</a
              >
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="grid gap-4 xl:grid-cols-[1fr_22rem]">
        <form [formRoot]="checkoutForm" (submit)="place($event)">
          <div scCard>
            <div scCardBody>
              <div
                scStepper
                linear
                [(selectedIndex)]="step"
                #stepper="scStepper"
                class="flex flex-col gap-6"
              >
                <div scStepperList>
                  <div scStepperItem #cartStep="scStepperItem">
                    <button scStepperTrigger>
                      <span scStepperIndicator>
                        @if (cartStep.status() === 'complete') {
                          <svg siCheckIcon></svg>
                        } @else {
                          1
                        }
                      </span>
                      <span i18n="@@ecommerce.checkout.cart" scStepperTitle
                        >Cart</span
                      >
                    </button>
                  </div>
                  <div scStepperSeparator [step]="0"></div>
                  <div
                    scStepperItem
                    [stepControl]="checkoutForm.delivery"
                    #deliveryStep="scStepperItem"
                  >
                    <button scStepperTrigger>
                      <span scStepperIndicator>
                        @if (deliveryStep.status() === 'complete') {
                          <svg siCheckIcon></svg>
                        } @else {
                          2
                        }
                      </span>
                      <span i18n="@@ecommerce.checkout.delivery" scStepperTitle
                        >Delivery</span
                      >
                    </button>
                  </div>
                  <div scStepperSeparator [step]="1"></div>
                  <div
                    scStepperItem
                    [stepControl]="checkoutForm.payment"
                    #paymentStep="scStepperItem"
                  >
                    <button scStepperTrigger>
                      <span scStepperIndicator>
                        @if (paymentStep.status() === 'complete') {
                          <svg siCheckIcon></svg>
                        } @else {
                          3
                        }
                      </span>
                      <span i18n="@@ecommerce.checkout.payment" scStepperTitle
                        >Payment</span
                      >
                    </button>
                  </div>
                </div>

                <div scStepperPanel [step]="0">
                  <ul class="flex flex-col divide-y">
                    @for (line of cart.lines(); track line.product.id) {
                      <li class="flex flex-wrap items-center gap-4 py-4">
                        <img
                          [ngSrc]="thumbOf(line.product)"
                          width="64"
                          height="64"
                          alt=""
                          class="rounded-md"
                        />
                        <div
                          i18n="@@ecommerce.checkout.each"
                          class="flex min-w-40 flex-1 flex-col"
                        >
                          <span class="font-medium">{{
                            line.product.name
                          }}</span>
                          <span class="text-muted-foreground text-sm"
                            >{{ moneyOf(line.product.price) }} each</span
                          >
                        </div>
                        <div scField class="w-32">
                          <label
                            i18n="@@ecommerce.checkout.quantityOf"
                            scLabel
                            class="sr-only"
                            >Quantity of {{ line.product.name }}</label
                          >
                          <div
                            scNumberGroup
                            [value]="line.quantity"
                            (valueChange)="
                              cart.setQuantity(line.product.id, $event ?? 1)
                            "
                            [min]="1"
                            [max]="Math.max(line.product.stock, 1)"
                          >
                            <button scNumberDecrement>
                              <svg siMinusIcon></svg>
                              <span
                                i18n="@@ecommerce.checkout.decrease"
                                class="sr-only"
                                >Decrease</span
                              >
                            </button>
                            <input scNumberInput />
                            <button scNumberIncrement>
                              <svg siPlusIcon></svg>
                              <span
                                i18n="@@ecommerce.checkout.increase"
                                class="sr-only"
                                >Increase</span
                              >
                            </button>
                          </div>
                        </div>
                        <span class="w-24 text-end font-medium tabular-nums">
                          {{ moneyOf(line.quantity * line.product.price) }}
                        </span>
                        <button
                          scButton
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          (click)="cart.setQuantity(line.product.id, 0)"
                        >
                          <svg siTrash2Icon></svg>
                          <span
                            i18n="@@ecommerce.checkout.remove"
                            class="sr-only"
                            >Remove {{ line.product.name }}</span
                          >
                        </button>
                      </li>
                    }
                  </ul>
                </div>

                <div scStepperPanel [step]="1">
                  <div scFieldGroup class="grid gap-4 md:grid-cols-2">
                    <div scField>
                      <label i18n="@@ecommerce.checkout.fullName" scLabel
                        >Full name</label
                      >
                      <input
                        scInput
                        autocomplete="name"
                        [formField]="checkoutForm.delivery.name"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@ecommerce.checkout.email" scLabel
                        >Email</label
                      >
                      <input
                        scInput
                        type="email"
                        autocomplete="email"
                        [formField]="checkoutForm.delivery.email"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField class="md:col-span-2">
                      <label i18n="@@ecommerce.checkout.address" scLabel
                        >Address</label
                      >
                      <input
                        scInput
                        autocomplete="street-address"
                        [formField]="checkoutForm.delivery.address"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@ecommerce.checkout.city" scLabel
                        >City</label
                      >
                      <input
                        scInput
                        autocomplete="address-level2"
                        [formField]="checkoutForm.delivery.city"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@ecommerce.checkout.postalCode" scLabel
                        >Postal code</label
                      >
                      <input
                        scInput
                        autocomplete="postal-code"
                        [formField]="checkoutForm.delivery.zip"
                      />
                      <div scFieldErrors></div>
                    </div>
                  </div>
                </div>

                <div scStepperPanel [step]="2">
                  <div scFieldGroup>
                    <fieldset class="flex flex-col gap-3">
                      <legend
                        i18n="@@ecommerce.checkout.payWith"
                        scLegend
                        variant="label"
                      >
                        Pay with
                      </legend>
                      <div
                        scRadioGroup
                        [formField]="checkoutForm.payment.method"
                        class="grid gap-3 sm:grid-cols-2"
                      >
                        <label
                          scLabel
                          class="has-checked:border-primary rounded-lg border p-4"
                        >
                          <input scRadio type="radio" value="card" />
                          <ng-container i18n="@@ecommerce.checkout.card"
                            >Card</ng-container
                          >
                          <img
                            ngSrc="images/brands/mastercard.svg"
                            width="36"
                            height="24"
                            alt=""
                            class="ms-auto"
                          />
                        </label>
                        <label
                          scLabel
                          class="has-checked:border-primary rounded-lg border p-4"
                        >
                          <input scRadio type="radio" value="paypal" />
                          <ng-container i18n="@@ecommerce.checkout.paypal"
                            >PayPal</ng-container
                          >
                          <img
                            ngSrc="images/brands/paypal.svg"
                            width="36"
                            height="24"
                            alt=""
                            class="ms-auto"
                          />
                        </label>
                      </div>
                    </fieldset>
                    @if (model().payment.method === 'card') {
                      <div class="grid gap-4 md:grid-cols-3">
                        <div scField class="md:col-span-3">
                          <label i18n="@@ecommerce.checkout.cardNumber" scLabel
                            >Card number</label
                          >
                          <input
                            scInput
                            inputmode="numeric"
                            autocomplete="cc-number"
                            [formField]="checkoutForm.payment.card"
                          />
                          <div scFieldErrors></div>
                        </div>
                        <div scField>
                          <label i18n="@@ecommerce.checkout.expiryMmYy" scLabel
                            >Expiry (MM/YY)</label
                          >
                          <input
                            scInput
                            autocomplete="cc-exp"
                            [formField]="checkoutForm.payment.expiry"
                          />
                          <div scFieldErrors></div>
                        </div>
                        <div scField>
                          <label scLabel>CVC</label>
                          <input
                            scInput
                            inputmode="numeric"
                            autocomplete="cc-csc"
                            [formField]="checkoutForm.payment.cvc"
                          />
                          <div scFieldErrors></div>
                        </div>
                      </div>
                    } @else {
                      <p
                        i18n="@@ecommerce.checkout.youWillFinishPayingOn"
                        class="text-muted-foreground text-sm"
                      >
                        You will finish paying on PayPal after placing the
                        order.
                      </p>
                    }
                  </div>
                </div>

                <div class="flex justify-between gap-2">
                  <button
                    i18n="@@ecommerce.checkout.back"
                    scStepperPrevious
                    type="button"
                  >
                    Back
                  </button>
                  @if (stepper.isLastStep()) {
                    <button
                      i18n="@@ecommerce.checkout.placeOrder"
                      scButton
                      type="submit"
                    >
                      Place order
                    </button>
                  } @else {
                    <button
                      i18n="@@ecommerce.checkout.continue"
                      scStepperNext
                      type="button"
                    >
                      Continue
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </form>

        <div scCard class="self-start">
          <div scCardHeader>
            <h2 i18n="@@ecommerce.checkout.orderSummary" scCardTitle>
              Order summary
            </h2>
          </div>
          <div scCardBody class="flex flex-col gap-3 text-sm">
            @for (line of cart.lines(); track line.product.id) {
              <div class="flex justify-between gap-2">
                <span>{{ line.product.name }} × {{ line.quantity }}</span>
                <span class="tabular-nums">{{
                  moneyOf(line.quantity * line.product.price)
                }}</span>
              </div>
            }
            <div scSeparator></div>
            <div
              i18n="@@ecommerce.checkout.subtotal"
              class="flex justify-between"
            >
              <span class="text-muted-foreground">Subtotal</span>
              <span class="tabular-nums">{{ moneyOf(cart.subtotal()) }}</span>
            </div>
            <div
              i18n="@@ecommerce.checkout.shipping"
              class="flex justify-between"
            >
              <span class="text-muted-foreground">Shipping</span>
              <span class="tabular-nums">{{
                cart.shipping() ? moneyOf(cart.shipping()) : t.free
              }}</span>
            </div>
          </div>
          <div
            i18n="@@ecommerce.checkout.total"
            scCardFooter
            class="justify-between font-semibold"
          >
            <span>Total</span>
            <span class="tabular-nums">{{ moneyOf(cart.total()) }}</span>
          </div>
        </div>
      </div>
    }
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@ecommerce.checkout.apps:Apps`,
    checkout: $localize`:@@ecommerce.checkout.checkout:Checkout`,
    free: $localize`:@@ecommerce.checkout.free:Free`,
  };

  private readonly cart = inject(CartStore);
  private readonly toaster = inject(ScToaster);
  private readonly step = signal(0);
  private readonly placed = signal<string | null>(null);
  private readonly model = signal({
    delivery: {
      name: 'Mathew Anderson',
      email: 'mathew.anderson@gmail.com',
      address: '',
      city: '',
      zip: '',
    },
    payment: { method: 'card', card: '', expiry: '', cvc: '' },
  });
  private readonly checkoutForm = form(this.model, (path) => {
    required(path.delivery.name);
    required(path.delivery.email);
    required(path.delivery.address);
    required(path.delivery.city);
    required(path.delivery.zip);
    applyWhen(
      path.payment,
      ({ value }) => value().method === 'card',
      (payment) => {
        required(payment.card);
        pattern(payment.card, /^[\d ]{12,19}$/);
        required(payment.expiry);
        pattern(payment.expiry, /^(0[1-9]|1[0-2])\/\d{2}$/);
        required(payment.cvc);
        pattern(payment.cvc, /^\d{3,4}$/);
      },
    );
  });
  private readonly moneyOf = money;
  private readonly thumbOf = thumbOf;
  private readonly Math = Math;

  private place(event: Event): void {
    event.preventDefault();
    if (this.checkoutForm().invalid()) return;
    const id = `#${3229 + Math.floor(this.cart.count())}`;
    this.cart.clear();
    this.placed.set(id);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@ecommerce.checkout.orderPlaced:Order ${id} placed`,
    });
  }
}
