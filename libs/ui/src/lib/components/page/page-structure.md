# Page Structure

```mermaid
flowchart TD
  A[page]
  A --> B[page-hero-section]
  A --> G[page-breadcrumb-section]
  A --> C[page-header]
  C --> C1[page-title]
  C --> C2[page-subtitle]
  C --> C3[page-description]
  A --> D[page-content]
  D --> E[page-section]
  E --> E1[page-section-header]
  E1 --> E1a[page-section-title]
  E1 --> E1b[page-section-subtitle]
  E1 --> E1c[page-section-description]
  E --> E2[page-section-content]
  E --> E1[page-section-footer]
  A --> F[page-footer]
```

| Component / Directive      | Purpose / Function                                                    |
| -------------------------- | --------------------------------------------------------------------- |
| `page`                     | Main wrapper for the entire page                                      |
| `page-hero-section`        | Top visual/hero area, often used for banners or highlights (optional) |
| `page-breadcrumb-section`  | Section for breadcrumbs (optional)                                    |
| `page-header`              | Container for title, subtitle, and description (optional)             |
| `page-title`               | Main title of the page (h1)                                           |
| `page-subtitle`            | Subtitle under the main title (h2)                                    |
| `page-description`         | Short introduction or summary text                                    |
| `page-content`             | Main content wrapper for all sections                                 |
| `page-section`             | Individual content block inside page-content                          |
| `page-section-header`      | Section-specific header (subtitle + description)                      |
| `page-section-title`       | Title for a section (h3)                                              |
| `page-section-subtitle`    | Subtitle for a section (h4)                                           |
| `page-section-description` | Supporting description for a section                                  |
| `page-section-content`     | Actual content inside the section                                     |
| `page-footer`              | Footer specific to this page (not global)                             |
