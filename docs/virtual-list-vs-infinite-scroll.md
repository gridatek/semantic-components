# Virtual List vs Infinite Scroll

| Aspect               | Virtual List                                                      | Infinite Scroll                                         |
| -------------------- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| **Purpose**          | Render large datasets efficiently by only rendering visible items | Progressively load more content as user scrolls         |
| **Data model**       | All data provided upfront                                         | Data loaded incrementally (pagination)                  |
| **Rendering**        | Only visible items + overscan buffer via `translateY()`           | All loaded items rendered; sentinel triggers `loadMore` |
| **Item height**      | Fixed `itemHeight` required                                       | No height constraint                                    |
| **Template**         | `ng-template` with `$implicit` context                            | `ng-content` (flexible layout)                          |
| **Scroll detection** | Manual scroll event → computed visible range                      | `IntersectionObserver` + scroll fallback                |
| **Key output**       | `rangeChange` (visible index range)                               | `loadMore` (load next page)                             |
| **Direction**        | Down only                                                         | Up or down                                              |
| **Typical use**      | 10,000+ items already in memory                                   | Paginated API calls                                     |

**Overlap**: Infinite scroll includes its own `ScVirtualScroll<T>` helper — a simpler version of `ScVirtualList` for combining both patterns (virtual rendering + infinite loading).

They solve different problems and are complementary. Virtual list optimizes **rendering performance** for large datasets. Infinite scroll optimizes **data loading** by fetching only what's needed.
