import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { FormField, form, min, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadInput,
  ScFileUploadTrigger,
  ScFrame,
  ScInput,
  ScLabel,
  ScLink,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScTextarea,
  ScToaster,
} from '@semantic-components/ui';
import { SiChevronDownIcon, SiUploadIcon } from '@semantic-icons/lucide-icons';
import { PRODUCT_CATEGORIES, type ProductCategory } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { today } from '../../shared/format';
import { ProductStore } from './shop-store';

interface Draft {
  name: string;
  category: ProductCategory;
  price: number;
  listPrice: number;
  stock: number;
  description: string;
}

/** Add and edit product (Pro Ecommerce): one form, the picture with it. */
@Component({
  selector: 'app-product-edit-page',
  imports: [
    FormField,
    NgOptimizedImage,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadInput,
    ScFileUploadTrigger,
    ScFrame,
    ScInput,
    ScLabel,
    ScLink,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScTextarea,
    SiChevronDownIcon,
    SiUploadIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="product() ? 'Edit Product' : 'Add Product'"
      [trail]="[
        { label: 'Apps' },
        { label: 'Products', url: '/apps/ecommerce/list' },
        { label: product() ? 'Edit' : 'Add' },
      ]"
    />

    <form class="grid gap-4 xl:grid-cols-[1fr_22rem]" (submit)="save($event)">
      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Details</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label scLabel>Name</label>
                <input scInput [formField]="productForm.name" />
              </div>
              <div scField>
                <label scLabel>Description</label>
                <textarea
                  scTextarea
                  rows="5"
                  [formField]="productForm.description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Price and stock</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup class="grid gap-4 md:grid-cols-3">
              <div scField>
                <label scLabel>Price ($)</label>
                <input scInput type="number" [formField]="productForm.price" />
              </div>
              <div scField>
                <label scLabel>Price before discount ($)</label>
                <input
                  scInput
                  type="number"
                  [formField]="productForm.listPrice"
                />
                <p scFieldDescription>0 when not on sale.</p>
              </div>
              <div scField>
                <label scLabel>Stock</label>
                <input scInput type="number" [formField]="productForm.stock" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Category</h2>
          </div>
          <div scCardBody>
            <div scField>
              <label scLabel>Category</label>
              <div scNativeSelectContainer class="w-full">
                <select scNativeSelect [formField]="productForm.category">
                  @for (c of categories; track c) {
                    <option scNativeSelectOption [value]="c">{{ c }}</option>
                  }
                </select>
                <svg siChevronDownIcon scNativeSelectIcon></svg>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Picture</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            @if (image(); as image) {
              <div
                scFrame
                class="bg-muted relative aspect-square overflow-hidden"
              >
                @if (image.startsWith('blob:')) {
                  <img
                    [src]="image"
                    alt="The chosen picture"
                    class="size-full object-cover"
                  />
                } @else {
                  <img
                    [ngSrc]="image"
                    fill
                    sizes="22rem"
                    alt="The current picture"
                    class="object-cover"
                  />
                }
              </div>
            }
            <div scFileUpload accept="image/*" (valueChange)="choose($event)">
              <input scFileUploadInput aria-label="Product picture" />
              <div scFileUploadDropzone>
                <svg siUploadIcon></svg>
                <p>Drop a picture here</p>
                <button scFileUploadTrigger size="sm">Browse files</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <a scLink variant="outline" routerLink="/apps/ecommerce/list"
            >Cancel</a
          >
          <button scButton type="submit">Save Product</button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ProductEditPage {
  /** The route's `:id` when editing; none when adding. */
  readonly id = input<string>();

  private readonly store = inject(ProductStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);
  private readonly categories = PRODUCT_CATEGORIES;
  private readonly product = computed(() => {
    const id = this.id();
    return id ? (this.store.byId(+id) ?? null) : null;
  });
  private readonly draft = linkedSignal<Draft>(() => {
    const p = this.product();
    return {
      name: p?.name ?? '',
      category: p?.category ?? 'Books',
      price: p?.price ?? 0,
      listPrice: p?.listPrice ?? 0,
      stock: p?.stock ?? 0,
      description: p?.description ?? '',
    };
  });
  private readonly productForm = form(this.draft, (path) => {
    required(path.name);
    min(path.price, 0);
    min(path.listPrice, 0);
    min(path.stock, 0);
  });
  private readonly image = linkedSignal<string | null>(
    () => this.product()?.image ?? null,
  );

  private choose(files: File[]): void {
    const file = files[0];
    // A preview of the chosen file (in the browser, from its event).
    if (file) this.image.set(URL.createObjectURL(file));
  }

  private save(event: Event): void {
    event.preventDefault();
    if (this.productForm().invalid()) return;
    const { listPrice, ...draft } = this.draft();
    const current = this.product();
    const saved = this.store.save({
      ...draft,
      id: current?.id,
      listPrice: listPrice > draft.price ? listPrice : undefined,
      rating: current?.rating ?? 0,
      reviews: current?.reviews ?? 0,
      colors: current?.colors ?? [],
      added: current?.added ?? today(),
      image: this.image() ?? 'images/products/s1.jpg',
    });
    this.toaster.show({ variant: 'success', title: `${saved.name} saved` });
    void this.router.navigateByUrl('/apps/ecommerce/list');
  }
}
