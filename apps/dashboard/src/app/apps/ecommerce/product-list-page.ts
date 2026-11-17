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
      title="Products"
      [trail]="[{ label: 'Apps' }, { label: 'Products' }]"
    >
      <a scLink variant="button" routerLink="/apps/ecommerce/add-product">
        <svg siPlusIcon></svg>
        Add Product
      </a>
    </app-page-header>

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <div scInputGroup class="max-w-xs">
            <input
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
              scNativeSelect
              aria-label="Category"
              [value]="category()"
              (change)="category.set($any($event.target).value)"
            >
              <option scNativeSelectOption value="">All categories</option>
              @for (c of categories; track c) {
                <option scNativeSelectOption [value]="c">{{ c }}</option>
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
              Delete {{ selected().size }}
            </button>
          }
        </div>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell class="w-10">
                  <input
                    scCheckbox
                    type="checkbox"
                    aria-label="Select all"
                    [checked]="allSelected()"
                    [indeterminate]="someSelected()"
                    (change)="toggleAll()"
                  />
                </th>
                <th scTableHeaderCell>Product</th>
                <th scTableHeaderCell>Category</th>
                <th scTableHeaderCell>Added</th>
                <th scTableHeaderCell>Stock</th>
                <th scTableHeaderCell class="text-end">Price</th>
                <th scTableHeaderCell><span class="sr-only">Actions</span></th>
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
                      [attr.aria-label]="'Select ' + product.name"
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
                  <td scTableCell>{{ product.category }}</td>
                  <td scTableCell>{{ dayOf(product.added) }}</td>
                  <td scTableCell>
                    @if (product.stock === 0) {
                      <span scBadge variant="destructive">Sold out</span>
                    } @else if (product.stock < 10) {
                      <span scBadge variant="outline"
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
                        <span class="sr-only">Edit {{ product.name }}</span>
                      </a>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        (click)="remove(product)"
                      >
                        <svg siTrash2Icon></svg>
                        <span class="sr-only">Delete {{ product.name }}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
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
    this.toaster.show({ title: `${ids.length} products deleted` });
  }
}
