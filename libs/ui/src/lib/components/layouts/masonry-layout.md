# ScMasonryLayout

A masonry layout component using CSS columns for Pinterest-style layouts with responsive breakpoints and gap control.

## Basic Usage

```html
<!-- Simple 3-column masonry -->
<div sc-masonry-layout cols="3" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Props

| Prop     | Type                                                                                  | Default     | Description                             |
| -------- | ------------------------------------------------------------------------------------- | ----------- | --------------------------------------- |
| `cols`   | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `'1'`       | Number of columns in the masonry layout |
| `gap`    | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '8' \| '10' \| '12' \| '16'`        | `'4'`       | Gap between masonry items               |
| `smCols` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at small breakpoint (sm:)       |
| `mdCols` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at medium breakpoint (md:)      |
| `lgCols` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at large breakpoint (lg:)       |
| `xlCols` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at extra-large breakpoint (xl:) |

## Examples

### Basic Photo Gallery

```html
<!-- Pinterest-style photo gallery -->
<div sc-masonry-layout cols="3" gap="4">
  <div class="break-inside-avoid mb-4">
    <img class="w-full rounded-lg" src="photo1.jpg" />
    <h3 class="mt-2 font-medium">Photo Title 1</h3>
    <p class="text-sm text-gray-600">Photo description</p>
  </div>
  <div class="break-inside-avoid mb-4">
    <img class="w-full rounded-lg" src="photo2.jpg" />
    <h3 class="mt-2 font-medium">Photo Title 2</h3>
    <p class="text-sm text-gray-600">Longer description that takes more space</p>
  </div>
  <div class="break-inside-avoid mb-4">
    <img class="w-full rounded-lg" src="photo3.jpg" />
    <h3 class="mt-2 font-medium">Photo Title 3</h3>
  </div>
</div>
```

### Responsive Masonry

```html
<!-- Mobile first: 1 column → 2 → 3 → 4 columns -->
<div sc-masonry-layout cols="1" mdCols="2" lgCols="3" xlCols="4" gap="4">
  <article class="bg-card rounded-lg p-4 mb-4 break-inside-avoid">
    <h2 class="font-bold mb-2">Article Title</h2>
    <p class="text-sm">Article content that varies in length...</p>
  </article>
  <article class="bg-card rounded-lg p-4 mb-4 break-inside-avoid">
    <h2 class="font-bold mb-2">Another Article</h2>
    <p class="text-sm mb-2">More content here...</p>
    <p class="text-sm">Additional paragraph making this taller.</p>
  </article>
  <!-- More articles... -->
</div>
```

### Card Collection

```html
<!-- Feature cards with varied content -->
<div sc-masonry-layout cols="2" lgCols="3" gap="6">
  <div
    class="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-6 break-inside-avoid"
  >
    <h3 class="text-xl font-bold mb-2">Feature A</h3>
    <p class="mb-4">Brief feature description.</p>
    <button class="bg-white text-blue-600 px-4 py-2 rounded-lg">Learn More</button>
  </div>
  <div
    class="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-6 mb-6 break-inside-avoid"
  >
    <h3 class="text-xl font-bold mb-2">Feature B</h3>
    <p class="mb-2">Longer feature description that explains more details.</p>
    <p class="mb-4">Additional benefits and use cases.</p>
    <button class="bg-white text-green-600 px-4 py-2 rounded-lg">Get Started</button>
  </div>
  <div
    class="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-6 mb-6 break-inside-avoid"
  >
    <h3 class="text-xl font-bold mb-2">Feature C</h3>
    <p class="mb-4">Medium length description.</p>
    <ul class="mb-4 space-y-1">
      <li>• Benefit 1</li>
      <li>• Benefit 2</li>
      <li>• Benefit 3</li>
    </ul>
    <button class="bg-white text-orange-600 px-4 py-2 rounded-lg">Try Now</button>
  </div>
</div>
```

### High Density Layout

```html
<!-- Many small items in compact layout -->
<div sc-masonry-layout cols="3" smCols="4" mdCols="6" lgCols="8" gap="2">
  <div class="bg-card rounded-lg p-3 mb-2 break-inside-avoid">
    <div class="w-full h-16 bg-gray-200 rounded mb-2"></div>
    <h4 class="text-sm font-medium">Item 1</h4>
  </div>
  <div class="bg-card rounded-lg p-3 mb-2 break-inside-avoid">
    <div class="w-full h-20 bg-gray-200 rounded mb-2"></div>
    <h4 class="text-sm font-medium">Item 2</h4>
    <p class="text-xs text-gray-600">Extra detail</p>
  </div>
  <!-- More compact items... -->
</div>
```

## Important CSS Classes

### break-inside-avoid

**Always use `break-inside-avoid`** on masonry items to prevent them from being split across columns:

```html
<div sc-masonry-layout cols="3" gap="4">
  <div class="break-inside-avoid">✅ This item won't break</div>
  <div>❌ This item might break across columns</div>
</div>
```

### Margin Bottom

Use `mb-*` classes instead of `gap` for vertical spacing to ensure proper column flow:

```html
<div sc-masonry-layout cols="3">
  <div class="break-inside-avoid mb-4">Item with margin</div>
  <div class="break-inside-avoid mb-4">Another item</div>
</div>
```

## Best Practices

### Layout Structure

- **Always include `break-inside-avoid`** on direct children
- **Use margin-bottom** (`mb-*`) for vertical spacing between items
- **Set explicit heights** for image containers to prevent layout shifts

### Responsive Design

- Start with mobile-first approach using `cols="1"`
- Gradually increase columns for larger screens
- Consider content density - fewer columns for detailed content, more for thumbnails

### Content Types

**Perfect for:**

- Photo galleries and image collections
- Blog post previews with varying content lengths
- Feature cards with different amounts of text
- Pinterest-style content feeds
- Product catalogs with varied descriptions

**Not ideal for:**

- Uniform grid layouts (use ScGridLayout instead)
- Data tables or structured content
- Content that needs precise positioning

### Performance Tips

- Optimize images and use appropriate sizes
- Consider lazy loading for large collections
- Use CSS `height: auto` on images to maintain aspect ratios
- Pre-size containers when possible to reduce layout shifts

## Browser Support

CSS columns are well-supported in all modern browsers. The masonry layout will gracefully degrade to single-column layout in older browsers.

## Integration with Other Components

```html
<!-- With ScCard components -->
<div sc-masonry-layout cols="2" lgCols="3" gap="4">
  <div class="break-inside-avoid mb-4" sc-card>
    <div sc-card-content>
      <h3>Card Title</h3>
      <p>Card content with varying lengths.</p>
    </div>
  </div>
  <!-- More cards... -->
</div>

<!-- With ScFlexLayout for item content -->
<div sc-masonry-layout cols="3" gap="4">
  <div class="bg-card rounded-lg p-4 mb-4 break-inside-avoid">
    <div sc-flex-layout direction="col" gap="2">
      <img class="w-full rounded" src="image.jpg" />
      <h3 class="font-medium">Title</h3>
      <p class="text-sm">Description</p>
    </div>
  </div>
</div>
```

## Tips

1. **Test with real content** - Masonry layouts look different with varied content lengths
2. **Use consistent styling** - Apply similar padding, margins, and border-radius for cohesion
3. **Consider loading states** - Show skeleton layouts while content loads
4. **Mobile optimization** - Usually best to use single column on small screens
5. **Accessibility** - Ensure logical reading order is maintained across columns
