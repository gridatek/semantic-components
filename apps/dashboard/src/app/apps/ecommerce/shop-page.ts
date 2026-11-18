import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCheckbox,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScField,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScLegend,
  ScLink,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScSeparator,
  ScSlider,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiSearchIcon,
  SiShoppingCartIcon,
  SiStarIcon,
} from '@semantic-icons/lucide-icons';
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
} from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { money } from '../../shared/format';
import { label } from '../../shared/labels';
import { CartStore, ProductStore } from './shop-store';

type Sort = 'newest' | 'price-asc' | 'price-desc' | 'rating';

/** Shop (Pro Ecommerce): filters, sorting, the products, the cart. */
@Component({
  selector: 'app-shop-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCheckbox,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScField,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScLegend,
    ScLink,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScSeparator,
    ScSlider,
    SiChevronDownIcon,
    SiSearchIcon,
    SiShoppingCartIcon,
    SiStarIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@ecommerce.shop.shop"
      title="Shop"
      [trail]="[{ label: t.apps }, { label: t.shop }]"
    >
      <a scLink variant="outline" routerLink="/apps/ecommerce/checkout">
        <svg siShoppingCartIcon></svg>
        <ng-container i18n="@@ecommerce.shop.cart">Cart</ng-container>
        <span scBadge>{{ cart.count() }}</span>
        <span i18n="@@ecommerce.shop.items" class="sr-only">items</span>
      </a>
    </app-page-header>

    <div class="grid gap-4 lg:grid-cols-[16rem_1fr]">
      <div scCard class="self-start">
        <div scCardBody class="flex flex-col gap-5">
          <fieldset class="flex flex-col gap-3">
            <legend i18n="@@ecommerce.shop.category" scLegend variant="label">
              Category
            </legend>
            @for (category of categories; track category) {
              <div scField orientation="horizontal">
                <input
                  scCheckbox
                  type="checkbox"
                  [id]="'cat-' + category"
                  [checked]="chosen().has(category)"
                  (change)="toggleCategory(category)"
                />
                <label scLabel [for]="'cat-' + category">{{
                  labelOf(category)
                }}</label>
              </div>
            }
          </fieldset>
          <div scSeparator></div>
          <div class="flex flex-col gap-3">
            <label i18n="@@ecommerce.shop.upTo" scLabel for="max-price"
              >Up to {{ moneyOf(maxPrice()) }}</label
            >
            <input
              scSlider
              id="max-price"
              [min]="10"
              [max]="300"
              [step]="5"
              [(value)]="maxPrice"
            />
          </div>
          <div scSeparator></div>
          <div scField orientation="horizontal">
            <input
              scCheckbox
              type="checkbox"
              id="in-stock"
              [checked]="inStock()"
              (change)="inStock.set(!inStock())"
            />
            <label i18n="@@ecommerce.shop.inStockOnly" scLabel for="in-stock"
              >In stock only</label
            >
          </div>
          <button
            i18n="@@ecommerce.shop.resetFilters"
            scButton
            variant="outline"
            (click)="reset()"
          >
            Reset filters
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <div scInputGroup class="max-w-xs">
            <input
              i18n-aria-label="@@ecommerce.shop.searchProducts"
              i18n-placeholder="@@ecommerce.shop.searchProducts"
              scInput
              type="search"
              placeholder="Search products"
              aria-label="Search products"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
          <span
            i18n="@@ecommerce.shop.products"
            class="text-muted-foreground text-sm"
            aria-live="polite"
          >
            {{ shown().length }} products
          </span>
          <div scNativeSelectContainer class="ms-auto w-48">
            <select
              i18n-aria-label="@@ecommerce.shop.sortBy"
              scNativeSelect
              aria-label="Sort by"
              [value]="sort()"
              (change)="sort.set($any($event.target).value)"
            >
              <option
                i18n="@@ecommerce.shop.newest"
                scNativeSelectOption
                value="newest"
              >
                Newest
              </option>
              <option
                i18n="@@ecommerce.shop.priceLowToHigh"
                scNativeSelectOption
                value="price-asc"
              >
                Price: low to high
              </option>
              <option
                i18n="@@ecommerce.shop.priceHighToLow"
                scNativeSelectOption
                value="price-desc"
              >
                Price: high to low
              </option>
              <option
                i18n="@@ecommerce.shop.bestRated"
                scNativeSelectOption
                value="rating"
              >
                Best rated
              </option>
            </select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>
        </div>

        <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          @for (product of shown(); track product.id) {
            <li class="flex">
              <div scCard class="flex-1 gap-0 overflow-hidden pt-0">
                <a
                  [routerLink]="['/apps/ecommerce/detail', product.id]"
                  class="focus-visible:ring-ring/50 relative block aspect-square outline-none focus-visible:ring-3"
                >
                  <img
                    [ngSrc]="product.image"
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 90vw"
                    alt=""
                    class="object-cover"
                  />
                  <span class="sr-only">{{ product.name }}</span>
                  @if (product.listPrice) {
                    <span
                      i18n="@@ecommerce.shop.sale"
                      scBadge
                      variant="destructive"
                      class="absolute start-3 top-3"
                      >Sale</span
                    >
                  }
                  @if (!product.stock) {
                    <span
                      i18n="@@ecommerce.shop.soldOut"
                      scBadge
                      variant="secondary"
                      class="absolute end-3 top-3"
                      >Sold out</span
                    >
                  }
                </a>
                <div scCardBody class="flex flex-1 flex-col gap-2 pt-4">
                  <span class="text-muted-foreground text-xs">{{
                    labelOf(product.category)
                  }}</span>
                  <a
                    scLink
                    class="font-medium"
                    [routerLink]="['/apps/ecommerce/detail', product.id]"
                    >{{ product.name }}</a
                  >
                  <span
                    class="text-muted-foreground flex items-center gap-1 text-sm"
                  >
                    <svg siStarIcon class="size-4 fill-current"></svg>
                    <ng-container i18n="@@ecommerce.shop.reviews"
                      >{{ product.rating }} ·
                      {{ product.reviews }} reviews</ng-container
                    >
                  </span>
                  <div class="mt-auto flex items-center gap-2 pt-2">
                    <span class="font-semibold tabular-nums">{{
                      moneyOf(product.price)
                    }}</span>
                    @if (product.listPrice) {
                      <s class="text-muted-foreground text-sm tabular-nums">{{
                        moneyOf(product.listPrice)
                      }}</s>
                    }
                    <button
                      scButton
                      size="icon-sm"
                      class="ms-auto"
                      [disabled]="!product.stock"
                      (click)="addToCart(product)"
                    >
                      <svg siShoppingCartIcon></svg>
                      <span i18n="@@ecommerce.shop.addToTheCart" class="sr-only"
                        >Add {{ product.name }} to the cart</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </li>
          } @empty {
            <li class="col-span-full">
              <div scEmpty>
                <div scEmptyHeader>
                  <h2 i18n="@@ecommerce.shop.noProductsMatch" scEmptyTitle>
                    No products match
                  </h2>
                  <div
                    i18n="@@ecommerce.shop.tryFewerFilters"
                    scEmptyDescription
                  >
                    Try fewer filters.
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ShopPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@ecommerce.shop.apps:Apps`,
    shop: $localize`:@@ecommerce.shop.shop:Shop`,
  };

  private readonly cart = inject(CartStore);
  private readonly store = inject(ProductStore);
  private readonly toaster = inject(ScToaster);
  private readonly categories = PRODUCT_CATEGORIES;
  private readonly query = signal('');
  private readonly chosen = signal(new Set<ProductCategory>());
  private readonly maxPrice = signal(300);
  private readonly inStock = signal(false);
  private readonly sort = signal<Sort>('newest');
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    const chosen = this.chosen();
    const list = this.store
      .products()
      .filter((p) => !chosen.size || chosen.has(p.category))
      .filter((p) => p.price <= this.maxPrice())
      .filter((p) => !this.inStock() || p.stock > 0)
      .filter((p) => !q || p.name.toLowerCase().includes(q));
    const by: Record<Sort, (a: Product, b: Product) => number> = {
      newest: (a, b) => b.added.localeCompare(a.added),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...list].sort(by[this.sort()]);
  });
  private readonly moneyOf = money;

  private toggleCategory(category: ProductCategory): void {
    this.chosen.update((set) => {
      const next = new Set(set);
      if (!next.delete(category)) next.add(category);
      return next;
    });
  }

  private reset(): void {
    this.chosen.set(new Set());
    this.maxPrice.set(300);
    this.inStock.set(false);
    this.query.set('');
  }

  private addToCart(product: Product): void {
    this.cart.add(product);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@ecommerce.shop.addedToTheCart:${product.name} added to the cart`,
    });
  }
}
