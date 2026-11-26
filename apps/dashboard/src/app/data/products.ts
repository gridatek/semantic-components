/** The shop's products (their images: THIRD-PARTY-NOTICES.md). */

export type ProductCategory = 'Books' | 'Electronics' | 'Fashion' | 'Toys';

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly category: ProductCategory;
  readonly price: number;
  /** Before the discount, when there is one. */
  readonly listPrice?: number;
  readonly rating: number;
  readonly reviews: number;
  readonly stock: number;
  readonly image: string;
  readonly colors: readonly string[];
  readonly description: string;
  readonly added: string;
}

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  'Books',
  'Electronics',
  'Fashion',
  'Toys',
];

export const PRODUCTS: readonly Product[] = [
  {
    id: 1,
    name: 'How Innovation Works',
    category: 'Books',
    price: 18,
    listPrice: 24,
    rating: 4.6,
    reviews: 214,
    stock: 42,
    image: 'images/products/s1.jpg',
    colors: [],
    description:
      'A hardcover on how new things come about: by trial and error, in small steps, among many people.',
    added: '2026-03-02',
  },
  {
    id: 2,
    name: 'Book of Psalms',
    category: 'Books',
    price: 22,
    rating: 4.8,
    reviews: 98,
    stock: 15,
    image: 'images/products/s2.jpg',
    colors: [],
    description:
      'A clothbound edition with wide margins and photographs between the chapters.',
    added: '2026-02-18',
  },
  {
    id: 3,
    name: 'The Psychology of Money',
    category: 'Books',
    price: 16,
    listPrice: 20,
    rating: 4.9,
    reviews: 1320,
    stock: 64,
    image: 'images/products/s3.jpg',
    colors: [],
    description:
      'Short chapters on how people think about money, and why it rarely matches the numbers.',
    added: '2026-01-27',
  },
  {
    id: 4,
    name: 'Studio Headphones',
    category: 'Electronics',
    price: 249,
    listPrice: 299,
    rating: 4.7,
    reviews: 842,
    stock: 8,
    image: 'images/products/s4.jpg',
    colors: ['#f2c6c2', '#d4d4d8', '#18181b'],
    description:
      'Over-ear, noise cancelling, 30 hours on a charge; the cushions fold flat into the case.',
    added: '2026-04-11',
  },
  {
    id: 5,
    name: 'Wireless Controller',
    category: 'Electronics',
    price: 59,
    rating: 4.5,
    reviews: 376,
    stock: 0,
    image: 'images/products/s6.jpg',
    colors: ['#18181b', '#f4f4f5'],
    description:
      'Textured grips, a hybrid D-pad and Bluetooth for a phone, a tablet or a console.',
    added: '2026-03-21',
  },
  {
    id: 6,
    name: 'Draped Red Dress',
    category: 'Fashion',
    price: 129,
    listPrice: 160,
    rating: 4.4,
    reviews: 57,
    stock: 23,
    image: 'images/products/s7.jpg',
    colors: ['#dc2626', '#18181b'],
    description:
      'A long-sleeved jersey dress with a high neck and one draped side.',
    added: '2026-04-02',
  },
  {
    id: 7,
    name: 'Gold Ankle-Strap Shoes',
    category: 'Fashion',
    price: 98,
    rating: 4.3,
    reviews: 41,
    stock: 12,
    image: 'images/products/s8.jpg',
    colors: ['#d4af37', '#e5e5e5'],
    description:
      'Crinkled metallic leather, a square toe and a crossed strap at the ankle.',
    added: '2026-02-09',
  },
  {
    id: 8,
    name: 'Pastel Purse',
    category: 'Fashion',
    price: 45,
    rating: 4.2,
    reviews: 66,
    stock: 31,
    image: 'images/products/s9.jpg',
    colors: ['#f9c5d1', '#bae6fd'],
    description:
      'A small half-moon purse in soft leather, a card slot inside the flap.',
    added: '2026-01-15',
  },
  {
    id: 9,
    name: 'Dinosaur Figure',
    category: 'Toys',
    price: 24,
    listPrice: 30,
    rating: 4.6,
    reviews: 189,
    stock: 54,
    image: 'images/products/s10.jpg',
    colors: [],
    description:
      'A hand-painted rubber dinosaur, its jaw on a hinge: safe from three years.',
    added: '2026-03-30',
  },
  {
    id: 10,
    name: 'Striped Teddy Bear',
    category: 'Toys',
    price: 32,
    rating: 4.9,
    reviews: 412,
    stock: 6,
    image: 'images/products/s11.jpg',
    colors: ['#c2410c'],
    description:
      'A soft fleece bear in a striped knit jumper and scarf; machine washable.',
    added: '2026-04-15',
  },
  {
    id: 11,
    name: 'Elephant Minifigure',
    category: 'Toys',
    price: 12,
    rating: 4.1,
    reviews: 23,
    stock: 120,
    image: 'images/products/s12.jpg',
    colors: [],
    description:
      'A building-brick figure in an elephant costume and a pink tutu.',
    added: '2026-02-26',
  },
];

/** A product's small picture (96 px), for lists and tables. */
export function thumbOf(product: Product): string {
  return product.image.replace('products/', 'products/thumb/');
}
