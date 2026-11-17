import { Service, computed, signal } from '@angular/core';
import { PRODUCTS, type Product } from '../../data/products';

/** The shop's products, in memory: the shop, the list, add and edit share them. */
@Service()
export class ProductStore {
  private readonly items = signal<readonly Product[]>(PRODUCTS);
  readonly products = this.items.asReadonly();

  byId(id: number): Product | undefined {
    return this.items().find((p) => p.id === id);
  }

  save(product: Omit<Product, 'id'> & { id?: number }): Product {
    const id = product.id ?? Math.max(0, ...this.items().map((p) => p.id)) + 1;
    const saved: Product = { ...product, id };
    this.items.update((items) =>
      items.some((p) => p.id === id)
        ? items.map((p) => (p.id === id ? saved : p))
        : [saved, ...items],
    );
    return saved;
  }

  remove(id: number): void {
    this.items.update((items) => items.filter((p) => p.id !== id));
  }
}

export interface CartLine {
  readonly product: Product;
  readonly quantity: number;
}

/** The cart: what the shop and the details add, what the checkout pays for. */
@Service()
export class CartStore {
  private readonly items = signal<readonly CartLine[]>([
    { product: PRODUCTS[3], quantity: 1 },
    { product: PRODUCTS[0], quantity: 2 },
  ]);
  readonly lines = this.items.asReadonly();
  readonly count = computed(() =>
    this.items().reduce((sum, l) => sum + l.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.items().reduce((sum, l) => sum + l.quantity * l.product.price, 0),
  );
  /** Free over $100. */
  readonly shipping = computed(() =>
    this.subtotal() === 0 || this.subtotal() >= 100 ? 0 : 9,
  );
  readonly total = computed(() => this.subtotal() + this.shipping());

  add(product: Product, quantity = 1): void {
    this.items.update((lines) =>
      lines.some((l) => l.product.id === product.id)
        ? lines.map((l) =>
            l.product.id === product.id
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          )
        : [...lines, { product, quantity }],
    );
  }

  setQuantity(productId: number, quantity: number): void {
    this.items.update((lines) =>
      quantity <= 0
        ? lines.filter((l) => l.product.id !== productId)
        : lines.map((l) =>
            l.product.id === productId ? { ...l, quantity } : l,
          ),
    );
  }

  clear(): void {
    this.items.set([]);
  }
}
