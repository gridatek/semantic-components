import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScField,
  ScLabel,
  ScLegend,
  ScLink,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScSeparator,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiMinusIcon,
  SiPlusIcon,
  SiShieldCheckIcon,
  SiShoppingCartIcon,
  SiStarIcon,
  SiTruckIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE } from '../../data/people';
import { PRODUCTS, thumbOf } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { count, initials, money, wholeMoney } from '../../shared/format';
import { label } from '../../shared/labels';
import { CartStore, ProductStore } from './shop-store';

const REVIEWS = [
  {
    personId: 2,
    rating: 5,
    text: 'Exactly as pictured, and it arrived two days early.',
    date: 'Apr 22, 2026',
  },
  {
    personId: 6,
    rating: 4,
    text: 'Very good quality. The box was a little dented.',
    date: 'Apr 14, 2026',
  },
  {
    personId: 9,
    rating: 5,
    text: 'Second time I buy it — once for me, once as a gift.',
    date: 'Mar 30, 2026',
  },
];

/** Product details (Pro Ecommerce): the product, its options, reviews, related. */
@Component({
  selector: 'app-product-detail-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScLabel,
    ScLegend,
    ScLink,
    ScField,
    ScNumberDecrement,
    ScNumberGroup,
    ScNumberIncrement,
    ScNumberInput,
    ScSeparator,
    ScTabs,
    ScTabsList,
    ScTabsPanel,
    ScTabsPanelContent,
    ScTabsTab,
    SiMinusIcon,
    SiPlusIcon,
    SiShieldCheckIcon,
    SiShoppingCartIcon,
    SiStarIcon,
    SiTruckIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="product()?.name ?? t.product"
      [trail]="[
        { label: t.apps },
        { label: t.shop, url: '/apps/ecommerce/shop' },
        { label: product()?.name ?? t.product },
      ]"
    />

    @if (product(); as product) {
      <div scCard>
        <div scCardBody class="grid gap-8 md:grid-cols-2">
          <div class="relative aspect-square overflow-hidden rounded-lg">
            <img
              [ngSrc]="product.image"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
              alt=""
              class="object-cover"
            />
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex flex-wrap items-center gap-2">
              <span scBadge variant="secondary">{{
                labelOf(product.category)
              }}</span>
              @if (product.stock) {
                <span
                  i18n="@@ecommerce.productDetail.inStock"
                  scBadge
                  variant="outline"
                  >{{ countOf(product.stock) }} in stock</span
                >
              } @else {
                <span
                  i18n="@@ecommerce.productDetail.soldOut"
                  scBadge
                  variant="destructive"
                  >Sold out</span
                >
              }
            </div>
            <h2 class="text-2xl font-semibold">{{ product.name }}</h2>
            <span class="text-muted-foreground flex items-center gap-1 text-sm">
              <svg siStarIcon class="size-4 fill-current"></svg>
              <ng-container i18n="@@ecommerce.productDetail.reviews"
                >{{ countOf(product.rating) }} ·
                {{ countOf(product.reviews) }} reviews</ng-container
              >
            </span>
            <div class="flex items-baseline gap-3">
              <span class="text-3xl font-semibold tabular-nums">{{
                moneyOf(product.price)
              }}</span>
              @if (product.listPrice) {
                <s class="text-muted-foreground tabular-nums">{{
                  moneyOf(product.listPrice)
                }}</s>
              }
            </div>
            <p class="text-muted-foreground">{{ product.description }}</p>

            @if (product.colors.length) {
              <fieldset class="flex flex-col gap-3">
                <legend
                  i18n="@@ecommerce.productDetail.colour"
                  scLegend
                  variant="label"
                >
                  Colour
                </legend>
                <div class="flex gap-2">
                  @for (color of product.colors; track color; let i = $index) {
                    <input
                      type="radio"
                      name="product-color"
                      class="ring-offset-background checked:ring-ring focus-visible:ring-ring/50 size-8 cursor-pointer appearance-none rounded-full ring-2 ring-transparent ring-offset-2 outline-none checked:ring-2"
                      [style.background-color]="color"
                      [attr.aria-label]="t.colour + (i + 1)"
                      [checked]="colorIndex() === i"
                      (change)="colorIndex.set(i)"
                    />
                  }
                </div>
              </fieldset>
            }

            <div scField class="w-36">
              <label i18n="@@ecommerce.productDetail.quantity" scLabel
                >Quantity</label
              >
              <div
                scNumberGroup
                [(value)]="quantity"
                [min]="1"
                [max]="product.stock || 1"
              >
                <button scNumberDecrement>
                  <svg siMinusIcon></svg>
                  <span
                    i18n="@@ecommerce.productDetail.decreaseQuantity"
                    class="sr-only"
                    >Decrease quantity</span
                  >
                </button>
                <input scNumberInput />
                <button scNumberIncrement>
                  <svg siPlusIcon></svg>
                  <span
                    i18n="@@ecommerce.productDetail.increaseQuantity"
                    class="sr-only"
                    >Increase quantity</span
                  >
                </button>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                scButton
                size="lg"
                [disabled]="!product.stock"
                (click)="addToCart()"
              >
                <svg siShoppingCartIcon></svg>
                <ng-container i18n="@@ecommerce.productDetail.addToCart"
                  >Add to cart</ng-container
                >
              </button>
              <button
                i18n="@@ecommerce.productDetail.buyNow"
                scButton
                size="lg"
                variant="outline"
                [disabled]="!product.stock"
                (click)="buyNow()"
              >
                Buy now
              </button>
            </div>
            <div scSeparator></div>
            <ul class="text-muted-foreground flex flex-col gap-2 text-sm">
              <li class="flex items-center gap-2">
                <svg siTruckIcon></svg>
                <ng-container
                  i18n="@@ecommerce.productDetail.freeDeliveryOver100"
                  >Free delivery over {{ wholeMoneyOf(100) }}</ng-container
                >
              </li>
              <li class="flex items-center gap-2">
                <svg siShieldCheckIcon></svg>
                <ng-container i18n="@@ecommerce.productDetail.n30DayReturns"
                  >{{ countOf(30) }}-day returns</ng-container
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardBody>
          <div scTabs value="description">
            <div scTabsList>
              <button
                i18n="@@ecommerce.productDetail.description"
                scTabsTab
                value="description"
              >
                Description
              </button>
              <button
                i18n="@@ecommerce.productDetail.reviews2"
                scTabsTab
                value="reviews"
              >
                Reviews ({{ countOf(reviews.length) }})
              </button>
            </div>
            <div scTabsPanel value="description">
              <ng-template scTabsPanelContent>
                <div class="flex flex-col gap-3 pt-4 text-sm">
                  <p>{{ product.description }}</p>
                  <p
                    i18n="@@ecommerce.productDetail.shipsInTwoWorkingDays"
                    class="text-muted-foreground"
                  >
                    Ships in two working days from our warehouse. Each order is
                    packed in recycled cardboard.
                  </p>
                </div>
              </ng-template>
            </div>
            <div scTabsPanel value="reviews">
              <ng-template scTabsPanelContent>
                <ul class="flex flex-col gap-4 pt-4">
                  @for (review of reviews; track review.text) {
                    <li class="flex gap-3">
                      <span scAvatar>
                        <img
                          scAvatarImage
                          [src]="review.person.avatar"
                          alt=""
                        />
                        <span scAvatarFallback>{{
                          initialsOf(review.person.name)
                        }}</span>
                      </span>
                      <div class="flex flex-col gap-1 text-sm">
                        <span class="font-medium">{{
                          review.person.name
                        }}</span>
                        <span
                          class="text-muted-foreground flex items-center gap-1 text-xs"
                        >
                          <svg siStarIcon class="size-3.5 fill-current"></svg>
                          <ng-container i18n="@@ecommerce.productDetail.of5"
                            >{{ countOf(review.rating) }} of 5 ·
                            {{ review.date }}</ng-container
                          >
                        </span>
                        <p>{{ review.text }}</p>
                      </div>
                    </li>
                  }
                </ul>
              </ng-template>
            </div>
          </div>
        </div>
      </div>

      <section class="flex flex-col gap-3">
        <h2
          i18n="@@ecommerce.productDetail.youMayAlsoLike"
          class="text-lg font-semibold"
        >
          You may also like
        </h2>
        <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          @for (item of related(); track item.id) {
            <li>
              <a
                [routerLink]="['/apps/ecommerce/detail', item.id]"
                class="hover:bg-muted/50 focus-visible:ring-ring/50 flex items-center gap-3 rounded-lg border p-3 outline-none focus-visible:ring-3"
              >
                <img
                  [ngSrc]="thumbOf(item)"
                  width="48"
                  height="48"
                  alt=""
                  class="rounded-md"
                />
                <span class="flex flex-col">
                  <span class="text-sm font-medium">{{ item.name }}</span>
                  <span class="text-muted-foreground text-sm tabular-nums">{{
                    moneyOf(item.price)
                  }}</span>
                </span>
              </a>
            </li>
          }
        </ul>
      </section>
    } @else {
      <div scEmpty>
        <div scEmptyHeader>
          <h2 i18n="@@ecommerce.productDetail.noSuchProduct" scEmptyTitle>
            No such product
          </h2>
          <div
            i18n="@@ecommerce.productDetail.backToTheShop"
            scEmptyDescription
          >
            <a scLink routerLink="/apps/ecommerce/shop">Back to the shop</a>
          </div>
        </div>
      </div>
    }
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailPage {
  /** In the user's numbering system. */
  private readonly wholeMoneyOf = wholeMoney;

  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    product: $localize`:@@ecommerce.productDetail.product:Product`,
    apps: $localize`:@@ecommerce.productDetail.apps:Apps`,
    shop: $localize`:@@ecommerce.productDetail.shop:Shop`,
    colour: $localize`:@@ecommerce.productDetail.colour:Colour `,
  };

  /** The route's `:id`. */
  readonly id = input.required<string>();

  private readonly store = inject(ProductStore);
  private readonly cart = inject(CartStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);
  private readonly product = computed(
    () => this.store.byId(+this.id()) ?? null,
  );
  private readonly related = computed(() => {
    const product = this.product();
    return PRODUCTS.filter(
      (p) => p.id !== product?.id && p.category === product?.category,
    )
      .concat(PRODUCTS.filter((p) => p.category !== product?.category))
      .slice(0, 4);
  });
  /** One again for each product. */
  private readonly quantity = linkedSignal<number | null>(
    () => (this.product(), 1),
  );
  private readonly colorIndex = linkedSignal(() => (this.product(), 0));
  private readonly reviews = REVIEWS.map((r) => ({
    ...r,
    person: PEOPLE.find((p) => p.id === r.personId) ?? PEOPLE[0],
  }));
  private readonly moneyOf = money;
  private readonly initialsOf = initials;
  private readonly thumbOf = thumbOf;

  private addToCart(): void {
    const product = this.product();
    if (!product) return;
    this.cart.add(product, this.quantity() ?? 1);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@ecommerce.productDetail.addedToTheCart:${product.name} added to the cart`,
    });
  }

  private buyNow(): void {
    this.addToCart();
    void this.router.navigateByUrl('/apps/ecommerce/checkout');
  }
}
