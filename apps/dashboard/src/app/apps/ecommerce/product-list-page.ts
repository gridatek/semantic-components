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
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLink,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiSearchIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { PRODUCT_CATEGORIES, type Product, thumbOf } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { day, money } from '../../shared/format';
import { label } from '../../shared/labels';
import { ProductStore } from './shop-store';

/** Product list (Pro Ecommerce): every product, chosen ones removed at once. */
@Component({
  selector: 'app-product-list-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCheckbox,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLink,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiChevronDownIcon,
    SiPencilIcon,
    SiPlusIcon,
    SiSearchIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@ecommerce.productList.products"
      title="Products"
      [trail]="[{ label: t.apps }, { label: t.products }]"
    >
      <a scLink variant="button" routerLink="/apps/ecommerce/add-product">
        <svg siPlusIcon></svg>
        <ng-container i18n="@@ecommerce.productList.addProduct"
          >Add Product</ng-container
        >
      </a>
    </app-page-header>

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <div scInputGroup class="max-w-xs">
            <input
              i18n-aria-label="@@ecommerce.productList.searchProducts"
              i18n-placeholder="@@ecommerce.productList.searchProducts"
              scInput
              type="search"
              placeholder="Search products"
              aria-label="Search products"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
          <div scNativeSelectContainer class="w-44">
            <select
              i18n-aria-label="@@ecommerce.productList.category"
              scNativeSelect
              aria-label="Category"
              [value]="category()"
              (change)="category.set($any($event.target).value)"
            >
              <option
                i18n="@@ecommerce.productList.allCategories"
                scNativeSelectOption
                value=""
              >
                All categories
              </option>
              @for (c of categories; track c) {
                <option scNativeSelectOption [value]="c">
                  {{ labelOf(c) }}
                </option>
              }
            </select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>
          @if (selected().size) {
            <button
              scButton
              variant="destructive"
              class="ms-auto"
              (click)="removeSelected()"
            >
              <svg siTrash2Icon></svg>
              <ng-container i18n="@@ecommerce.productList.delete"
                >Delete {{ selected().size }}</ng-container
              >
            </button>
          }
        </div>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell class="w-10">
                  <input
                    i18n-aria-label="@@ecommerce.productList.selectAll"
                    scCheckbox
                    type="checkbox"
                    aria-label="Select all"
                    [checked]="allSelected()"
                    [indeterminate]="someSelected()"
                    (change)="toggleAll()"
                  />
                </th>
                <th i18n="@@ecommerce.productList.product" scTableHeaderCell>
                  Product
                </th>
                <th i18n="@@ecommerce.productList.category" scTableHeaderCell>
                  Category
                </th>
                <th i18n="@@ecommerce.productList.added" scTableHeaderCell>
                  Added
                </th>
                <th i18n="@@ecommerce.productList.stock" scTableHeaderCell>
                  Stock
                </th>
                <th
                  i18n="@@ecommerce.productList.price"
                  scTableHeaderCell
                  class="text-end"
                >
                  Price
                </th>
                <th i18n="@@ecommerce.productList.actions" scTableHeaderCell>
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (product of shown(); track product.id) {
                <tr
                  scTableRow
                  [attr.data-state]="
                    selected().has(product.id) ? 'selected' : null
                  "
                >
                  <td scTableCell>
                    <input
                      scCheckbox
                      type="checkbox"
                      [attr.aria-label]="t.select + product.name"
                      [checked]="selected().has(product.id)"
                      (change)="toggle(product.id)"
                    />
                  </td>
                  <td scTableCell>
                    <div class="flex items-center gap-3">
                      <img
                        [ngSrc]="thumbOf(product)"
                        width="40"
                        height="40"
                        alt=""
                        class="rounded-md"
                      />
                      <a
                        scLink
                        [routerLink]="['/apps/ecommerce/detail', product.id]"
                        >{{ product.name }}</a
                      >
                    </div>
                  </td>
                  <td scTableCell>{{ labelOf(product.category) }}</td>
                  <td scTableCell>{{ dayOf(product.added) }}</td>
                  <td scTableCell>
                    @if (product.stock === 0) {
                      <span
                        i18n="@@ecommerce.productList.soldOut"
                        scBadge
                        variant="destructive"
                        >Sold out</span
                      >
                    } @else if (product.stock < 10) {
                      <span
                        i18n="@@ecommerce.productList.low"
                        scBadge
                        variant="outline"
                        >Low · {{ product.stock }}</span
                      >
                    } @else {
                      <span scBadge variant="secondary">{{
                        product.stock
                      }}</span>
                    }
                  </td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ moneyOf(product.price) }}
                  </td>
                  <td scTableCell>
                    <div class="flex justify-end gap-1">
                      <a
                        scLink
                        variant="ghost"
                        size="icon-sm"
                        [routerLink]="[
                          '/apps/ecommerce/edit-product',
                          product.id,
                        ]"
                      >
                        <svg siPencilIcon></svg>
                        <span
                          i18n="@@ecommerce.productList.edit"
                          class="sr-only"
                          >Edit {{ product.name }}</span
                        >
                      </a>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        (click)="remove(product)"
                      >
                        <svg siTrash2Icon></svg>
                        <span
                          i18n="@@ecommerce.productList.delete2"
                          class="sr-only"
                          >Delete {{ product.name }}</span
                        >
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n="@@ecommerce.productList.noProductsMatch"
                    scTableCell
                    colspan="7"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No products match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ProductListPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@ecommerce.productList.apps:Apps`,
    products: $localize`:@@ecommerce.productList.products:Products`,
    select: $localize`:@@ecommerce.productList.select:Select `,
  };

  private readonly store = inject(ProductStore);
  private readonly toaster = inject(ScToaster);
  private readonly categories = PRODUCT_CATEGORIES;
  private readonly query = signal('');
  private readonly category = signal('');
  private readonly selected = signal(new Set<number>());
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.store
      .products()
      .filter((p) => !this.category() || p.category === this.category())
      .filter((p) => !q || p.name.toLowerCase().includes(q));
  });
  private readonly allSelected = computed(
    () =>
      this.shown().length > 0 &&
      this.shown().every((p) => this.selected().has(p.id)),
  );
  private readonly someSelected = computed(
    () =>
      !this.allSelected() &&
      this.shown().some((p) => this.selected().has(p.id)),
  );
  private readonly moneyOf = money;
  private readonly dayOf = day;
  private readonly thumbOf = thumbOf;

  private toggle(id: number): void {
    this.selected.update((set) => {
      const next = new Set(set);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }

  private toggleAll(): void {
    this.selected.set(
      this.allSelected() ? new Set() : new Set(this.shown().map((p) => p.id)),
    );
  }

  private remove(product: Product): void {
    this.store.remove(product.id);
    this.toaster.show({ title: `${product.name} deleted` });
  }

  private removeSelected(): void {
    const ids = [...this.selected()];
    ids.forEach((id) => this.store.remove(id));
    this.selected.set(new Set());
    this.toaster.show({
      title: $localize`:@@ecommerce.productList.productsDeleted:${ids.length} products deleted`,
    });
  }
}
