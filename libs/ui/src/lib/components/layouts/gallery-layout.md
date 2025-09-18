# ScGalleryLayout

A specialized grid layout component designed for photo galleries, video thumbnails, and media collections with built-in aspect ratio control and responsive breakpoints.

## Basic Usage

```html
<!-- Simple photo gallery -->
<div sc-gallery-layout variant="uniform" cols="3" gap="4" aspectRatio="square">
  <img src="photo1.jpg" />
  <img src="photo2.jpg" />
  <img src="photo3.jpg" />
</div>
```

## Props

| Prop          | Type                                                                                  | Default     | Description                             |
| ------------- | ------------------------------------------------------------------------------------- | ----------- | --------------------------------------- |
| `variant`     | `'uniform' \| 'masonry' \| 'mosaic'`                                                  | `uniform`   | Gallery layout style                    |
| `cols`        | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `'3'`       | Number of columns in the gallery        |
| `gap`         | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '8' \| '10' \| '12' \| '16'`        | `'4'`       | Gap between gallery items               |
| `aspectRatio` | `'auto' \| 'square' \| 'video' \| 'portrait' \| 'landscape'`                          | `'auto'`    | Aspect ratio for gallery items          |
| `objectFit`   | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale'`                                 | `'cover'`   | How images fit within their containers  |
| `smCols`      | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at small breakpoint (sm:)       |
| `mdCols`      | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at medium breakpoint (md:)      |
| `lgCols`      | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at large breakpoint (lg:)       |
| `xlCols`      | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' \| '10' \| '11' \| '12'` | `undefined` | Columns at extra-large breakpoint (xl:) |

## Variants

### uniform

Standard grid layout where all items maintain consistent spacing and sizing.

### masonry

Grid with dense packing for varied content heights (similar to ScMasonryLayout but grid-based).

### mosaic

Grid that allows items to span multiple cells using Tailwind's `col-span-*` and `row-span-*` classes.

## Aspect Ratios

### square

1:1 aspect ratio - perfect for Instagram-style photo grids.

### video

16:9 aspect ratio - ideal for video thumbnails and landscape media.

### portrait

3:4 aspect ratio - optimized for portrait photos and vertical content.

### landscape

4:3 aspect ratio - classic landscape photo format.

### auto

Natural aspect ratio - items maintain their original proportions.

## Examples

### Photo Gallery

```html
<!-- Classic photo gallery with square thumbnails -->
<div sc-gallery-layout variant="uniform" cols="4" gap="3" aspectRatio="square" objectFit="cover">
  <img class="rounded-lg" src="photo1.jpg" alt="Mountain landscape" />
  <img class="rounded-lg" src="photo2.jpg" alt="Forest path" />
  <img class="rounded-lg" src="photo3.jpg" alt="City skyline" />
  <img class="rounded-lg" src="photo4.jpg" alt="Beach sunset" />
  <img class="rounded-lg" src="photo5.jpg" alt="Desert dunes" />
  <img class="rounded-lg" src="photo6.jpg" alt="Ocean waves" />
  <img class="rounded-lg" src="photo7.jpg" alt="Snow peaks" />
  <img class="rounded-lg" src="photo8.jpg" alt="Cherry blossoms" />
</div>
```

### Video Gallery

```html
<!-- Video thumbnail gallery with 16:9 aspect ratio -->
<div sc-gallery-layout variant="uniform" cols="3" gap="4" aspectRatio="video" objectFit="cover">
  <div class="relative bg-gray-900 rounded-lg overflow-hidden group">
    <img src="video1-thumb.jpg" alt="Travel vlog thumbnail" />
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="bg-black bg-opacity-50 rounded-full p-3 group-hover:scale-110 transition-transform"
      >
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
    <div
      class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded"
    >
      12:34
    </div>
  </div>
  <div class="relative bg-gray-900 rounded-lg overflow-hidden group">
    <img src="video2-thumb.jpg" alt="Tutorial thumbnail" />
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="bg-black bg-opacity-50 rounded-full p-3 group-hover:scale-110 transition-transform"
      >
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
    <div
      class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded"
    >
      8:45
    </div>
  </div>
  <!-- More video thumbnails... -->
</div>
```

### Responsive Gallery

```html
<!-- Mobile first: 1 column → 2 → 3 → 4 columns -->
<div
  sc-gallery-layout
  variant="uniform"
  cols="1"
  smCols="2"
  mdCols="3"
  lgCols="4"
  gap="4"
  aspectRatio="landscape"
  objectFit="cover"
>
  <img class="rounded-lg" src="landscape1.jpg" alt="Mountain view" />
  <img class="rounded-lg" src="landscape2.jpg" alt="Forest scene" />
  <img class="rounded-lg" src="landscape3.jpg" alt="Ocean view" />
  <img class="rounded-lg" src="landscape4.jpg" alt="City panorama" />
  <img class="rounded-lg" src="landscape5.jpg" alt="Desert landscape" />
  <img class="rounded-lg" src="landscape6.jpg" alt="Winter scene" />
</div>
```

### Mosaic Layout

```html
<!-- Mixed content with spanning items -->
<div sc-gallery-layout variant="mosaic" cols="4" gap="4" objectFit="cover">
  <!-- Featured large item -->
  <div
    class="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white"
  >
    <h2 class="text-2xl font-bold mb-2">Featured Article</h2>
    <p class="text-sm opacity-90">This content spans multiple grid cells for emphasis.</p>
  </div>

  <!-- Regular items -->
  <img class="rounded-lg" src="photo1.jpg" alt="Photo 1" />
  <img class="rounded-lg" src="photo2.jpg" alt="Photo 2" />

  <!-- Wide item -->
  <div class="col-span-2 bg-green-500 rounded-lg p-4 text-white text-center">
    <h3 class="font-semibold">Wide Content Block</h3>
  </div>

  <img class="rounded-lg" src="photo3.jpg" alt="Photo 3" />
  <img class="rounded-lg" src="photo4.jpg" alt="Photo 4" />
</div>
```

### High Density Thumbnails

```html
<!-- Compact thumbnail grid -->
<div
  sc-gallery-layout
  variant="uniform"
  cols="4"
  smCols="6"
  mdCols="8"
  lgCols="10"
  gap="1"
  aspectRatio="square"
  objectFit="cover"
>
  <img
    class="rounded cursor-pointer hover:scale-105 transition-transform"
    src="thumb1.jpg"
    alt="Thumbnail 1"
  />
  <img
    class="rounded cursor-pointer hover:scale-105 transition-transform"
    src="thumb2.jpg"
    alt="Thumbnail 2"
  />
  <img
    class="rounded cursor-pointer hover:scale-105 transition-transform"
    src="thumb3.jpg"
    alt="Thumbnail 3"
  />
  <!-- More thumbnails... -->
</div>
```

### Portrait Gallery

```html
<!-- Portrait photography showcase -->
<div
  sc-gallery-layout
  variant="uniform"
  cols="2"
  mdCols="3"
  lgCols="4"
  gap="5"
  aspectRatio="portrait"
  objectFit="cover"
>
  <div class="rounded-lg overflow-hidden shadow-lg">
    <img src="portrait1.jpg" alt="Portrait 1" />
    <div class="p-3 bg-white">
      <h3 class="font-medium text-sm">Portrait Session</h3>
      <p class="text-xs text-gray-600">Central Park, NYC</p>
    </div>
  </div>
  <div class="rounded-lg overflow-hidden shadow-lg">
    <img src="portrait2.jpg" alt="Portrait 2" />
    <div class="p-3 bg-white">
      <h3 class="font-medium text-sm">Studio Shot</h3>
      <p class="text-xs text-gray-600">Professional Headshot</p>
    </div>
  </div>
  <!-- More portrait cards... -->
</div>
```

## Object Fit Options

### cover (default)

Images fill the entire container, cropping if necessary to maintain aspect ratio.

### contain

Images scale to fit entirely within the container, may show empty space.

### fill

Images stretch to fill the container exactly, may distort the image.

### none

Images display at their natural size, may overflow the container.

### scale

Images scale down to fit if larger than container, otherwise display naturally.

## Best Practices

### Image Optimization

- Use appropriately sized images for your gallery
- Consider using WebP format for better compression
- Implement lazy loading for large galleries
- Provide alt text for accessibility

### Responsive Design

- Start mobile-first with fewer columns
- Gradually increase columns for larger screens
- Consider content density and readability
- Test on actual devices

### Performance

```html
<!-- Lazy loading for large galleries -->
<div sc-gallery-layout variant="uniform" cols="3" gap="4" aspectRatio="square">
  <img class="rounded-lg" src="photo1.jpg" alt="Photo 1" loading="lazy" />
  <img class="rounded-lg" src="photo2.jpg" alt="Photo 2" loading="lazy" />
  <!-- More images... -->
</div>
```

### Accessibility

```html
<!-- Proper semantic structure -->
<section aria-label="Photo Gallery">
  <h2 class="sr-only">Travel Photos</h2>
  <div sc-gallery-layout variant="uniform" cols="3" gap="4" aspectRatio="square">
    <img class="rounded-lg" src="photo1.jpg" alt="Mountain landscape with snow-capped peaks" />
    <img class="rounded-lg" src="photo2.jpg" alt="Forest path in autumn with golden leaves" />
    <!-- More descriptive images... -->
  </div>
</section>
```

## Use Cases

**Perfect for:**

- Photo galleries and portfolios
- Video thumbnail grids
- Product showcases
- Media libraries
- Image browsers
- Social media feeds
- Art collections

**Consider alternatives for:**

- Text-heavy content (use ScGridLayout)
- Variable height content (use ScMasonryLayout)
- Simple layouts (use ScFlexLayout)

## Integration with Other Components

```html
<!-- With ScCard for rich content -->
<div sc-gallery-layout variant="uniform" cols="2" mdCols="3" gap="6" aspectRatio="auto">
  <div class="overflow-hidden" sc-card>
    <img class="w-full h-48 object-cover" src="photo1.jpg" alt="Gallery item 1" />
    <div sc-card-content>
      <h3 class="font-semibold">Photo Title</h3>
      <p class="text-sm text-gray-600">Photo description</p>
    </div>
  </div>
  <!-- More card items... -->
</div>

<!-- With hover interactions -->
<div sc-gallery-layout variant="uniform" cols="4" gap="3" aspectRatio="square">
  <div class="relative overflow-hidden rounded-lg group">
    <img
      class="object-cover transition-transform group-hover:scale-110"
      src="photo1.jpg"
      alt="Photo 1"
    />
    <div
      class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all"
    ></div>
    <div
      class="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <p class="text-sm font-medium">Photo Title</p>
    </div>
  </div>
  <!-- More interactive items... -->
</div>
```

## Tips

1. **Choose the right aspect ratio** - square for social media style, video for thumbnails, portrait for people
2. **Optimize images** - use appropriate resolutions and modern formats
3. **Consider loading patterns** - implement lazy loading for performance
4. **Test responsiveness** - ensure galleries work well on all screen sizes
5. **Accessibility first** - provide meaningful alt text and proper semantic structure
6. **Consistent styling** - use consistent borders, shadows, and hover effects
7. **Performance monitoring** - watch for layout shifts and loading times
