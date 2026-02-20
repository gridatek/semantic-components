# Article Review: article-launch.md

## Structure & Flow

1. **Vague opening** — "After waiting so long" is imprecise. Consider:

   > After years of searching for an Angular UI library that actually met my needs, I decided to stop waiting and build my own.

2. **Top links lack markdown formatting** — Currently bare text. Should be:

   ```markdown
   **GitHub:** [gridatek/semantic-components](https://github.com/gridatek/semantic-components)
   **Package:** [`@semantic-components/ui`](https://www.npmjs.com/package/@semantic-components/ui)
   ```

3. **Tradeoffs section is buried late** — It's one of the article's strengths (honest, opinionated). Consider moving it earlier or integrating tradeoffs inline with each principle. You already do this for some (the `scDialogProvider` wrapper, verbosity), so the standalone section at the end feels like an afterthought.

## Content Issues

4. **Tooltip example undersells itself (line 35-36)** — The code comparison looks nearly identical to Angular Material — just a renamed attribute. The explanation is compelling, but the code diff doesn't visually demonstrate the benefit. Consider showing a more complex tooltip with separate trigger + content to make the composability advantage obvious.

5. **`@angular/aria` mentioned but never introduced (line 175)** — It appears twice without a link or explanation. Readers unfamiliar with it will be confused. If it's a public Angular package, link to it. If it's your own, clarify that.

6. **"Signal-based forms only" (line 196)** — Briefly clarify what this means in practice, since Angular's signal-based forms are still evolving. Readers may not know what to expect.

7. **"40+ components" claim (line 205)** — The table lists roughly 35 items. Either adjust the number to match or ensure the count is accurate.

## Writing & Tone

8. **Inconsistent voice** — The intro uses "I decided," "my attempt," but the rest switches to impersonal "the library." The personal tone in the intro is more engaging — consider keeping it throughout.

9. **Long parenthetical on line 89** — "It acts as the coordination point between the trigger, the portal, and the close button — sharing state through Angular's DI tree." is hard to parse inside a parenthetical. Break it into its own sentence:

   > `scDialogProvider` requires an extra wrapper element in the DOM. It acts as the coordination point between the trigger, the portal, and the close button, sharing state through Angular's DI tree. It's a conscious choice in favor of keeping everything in the template, at the cost of one extra `<div>` that you may need to style or account for in your layout.

10. **"explicit over implicit" (line 134)** — Great line that deserves more emphasis. Consider bolding it or making it a standalone callout.

## Missing Content

11. **No demo or screenshot** — A visual preview (even a single screenshot or a link to a live demo) would dramatically increase engagement. Readers want to see what it looks like before reading code.

12. **No comparison table** — You reference Angular Material and shadcn/ui but never show a side-by-side feature comparison. Even a brief one would help readers evaluate the library quickly.

13. **No mention of bundle size or performance** — For a modern library, this is a common concern. Even a brief mention like "tree-shakable, no runtime CSS-in-JS overhead" would help.

14. **No link to full docs or examples after "Getting Started"** — After installing, where does a user go next?

## Minor Fixes

15. **Select example uses unexplained `#select="scSelect"` (line 98)** — Template ref export syntax is not obvious to all readers. Add a brief note explaining it.

16. **"Icons" section header uses `##` (line 219)** — Same level as "What's in the Box" but reads like a subsection of it. Should probably be `###`.

17. **Bottom links duplicate top links** — Consider keeping them only at the bottom with a stronger call-to-action.

## Summary

The technical content is excellent — the semantic naming, declarative, and composable principles are well-articulated with good code examples. The honest tradeoffs discussion is a real strength.

Main gaps:

- Visual proof (demo/screenshot)
- Stronger hook for readers who aren't deep Angular experts
- Tighten structure to avoid repetition
- Consistent voice throughout
