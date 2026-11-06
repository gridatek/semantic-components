# Skeleton

A placeholder while content loads — shadcn's Skeleton in the look of the app's preset (`skeleton` key: shadcn's in each of the eight styles; only the corners change).

## Usage

```html
<div class="flex items-center gap-4">
  <div scSkeleton class="size-12 rounded-full"></div>
  <div class="space-y-2">
    <div scSkeleton class="h-4 w-[250px]"></div>
    <div scSkeleton class="h-4 w-[200px]"></div>
  </div>
</div>
```

Its size and shape are yours (`h-4 w-48`, `rounded-full`…), merged over the preset's (cn: a later class wins).

## Part

| Part         | Selector          | What it does                                                                                  |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------- |
| `ScSkeleton` | `div[scSkeleton]` | A pulsing muted block in the preset's look (`animate-pulse`, `bg-muted`, the style's corners) |

## Keyboard and screen readers

- A skeleton is empty and silent. Say the region is loading with `aria-busy="true"` on it, and remove it when the content arrives.
- It stops pulsing when the user asks for less motion (`prefers-reduced-motion`).

## Not shadcn's

- **`motion-reduce:animate-none`**: shadcn's keeps pulsing.
