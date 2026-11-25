import {
  type ApplicationRef,
  type EmbeddedViewRef,
  Injector,
  type StaticProvider,
  type TemplateRef,
} from '@angular/core';

/** What a template is stamped with, in one of pdf.js's elements. */
export interface ScPdfStamp<C> {
  context: C;
  /** For the parts in it (the annotation it's for…). */
  providers?: StaticProvider[];
  /** The box the template's nodes go in, in pdf.js's element. */
  box: HTMLElement;
}

/**
 * Stamps a template of yours into pdf.js's elements on the pages — those
 * matching `selector`, as pdf.js makes them — and takes it out when they go.
 * pdf.js builds what it draws on the pages itself (an annotation's toolbar,
 * its comment buttons, a page): this is how your markup and icons get in.
 * When pdf.js empties one of them (a page drawn again), the box goes back in.
 */
export function stampTemplates<C>(options: {
  container: HTMLElement;
  selector: string;
  template: TemplateRef<C>;
  injector: Injector;
  appRef: ApplicationRef;
  /** The stamp for an element, or null to leave it as it is. */
  stampFor: (element: HTMLElement) => ScPdfStamp<C> | null;
}): () => void {
  const { container, selector, template, injector, appRef, stampFor } = options;
  const view = container.ownerDocument.defaultView;
  if (!view?.MutationObserver) return () => undefined;
  const stamped = new Map<
    HTMLElement,
    { box: HTMLElement; ref: EmbeddedViewRef<C> }
  >();

  const stamp = (element: HTMLElement): void => {
    if (stamped.has(element)) return;
    const found = stampFor(element);
    if (!found) return;
    const ref = template.createEmbeddedView(
      found.context,
      Injector.create({ providers: found.providers ?? [], parent: injector }),
    );
    found.box.append(...ref.rootNodes);
    element.append(found.box);
    appRef.attachView(ref);
    ref.detectChanges();
    stamped.set(element, { box: found.box, ref });
  };

  const unstamp = (element: HTMLElement): void => {
    const entry = stamped.get(element);
    if (!entry) return;
    stamped.delete(element);
    entry.ref.destroy();
    entry.box.remove();
  };

  const matching = (node: Node): HTMLElement[] =>
    node instanceof view.HTMLElement
      ? [
          ...(node.matches(selector) ? [node] : []),
          ...Array.from(node.querySelectorAll<HTMLElement>(selector)),
        ]
      : [];

  const observer = new view.MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => matching(node).forEach(stamp));
    }
    for (const [element, { box }] of [...stamped]) {
      // Gone with it (an annotation deleted, its page let go)…
      if (!element.isConnected) unstamp(element);
      // …or emptied by pdf.js: back in.
      else if (box.parentElement !== element) element.append(box);
    }
  });
  observer.observe(container, { childList: true, subtree: true });
  matching(container).forEach(stamp);

  return () => {
    observer.disconnect();
    [...stamped.keys()].forEach(unstamp);
  };
}
