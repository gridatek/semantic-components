import { Extension } from '@tiptap/core';
import { TableKit } from '@tiptap/extension-table';
import { Plugin } from '@tiptap/pm/state';
import { TableMap, columnResizingPluginKey } from '@tiptap/pm/tables';
import type { EditorView } from '@tiptap/pm/view';
import type { ScEditorFeature } from '@semantic-components/ui/editor';

/**
 * Tables, their columns resized by dragging their borders: the document holds
 * them, `scEditorTable` inserts and edits them.
 */
export function withTables(): ScEditorFeature {
  return {
    name: 'withTables',
    content: [
      TableKit.configure({ table: { resizable: true } }),
      FixColumnsOnResize,
    ],
  };
}

/**
 * A table fills its width until its columns have widths of their own. Then
 * dragging a border moves only that border: Tiptap would widen the dragged
 * column at its neighbour's cost (the table's edge can't move), so its last
 * border went the wrong way and no column got smaller. So the first drag gives
 * every column the width it has on screen: from then on the table is its
 * columns' sum — narrower, or wider and scrolled, as you drag.
 */
const FixColumnsOnResize = Extension.create({
  name: 'scFixColumnsOnResize',
  // Before Tiptap's column resizing, which reads the widths as the drag starts.
  priority: 101,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mousedown: (view) => {
              fixColumns(view);
              return false;
            },
          },
        },
      }),
    ];
  },
});

function fixColumns(view: EditorView): void {
  const handle = columnResizingPluginKey.getState(view.state)?.activeHandle;
  if (handle === undefined || handle < 0) return;
  const $cell = view.state.doc.resolve(handle);
  const table = $cell.node(-1);
  const start = $cell.start(-1);
  const map = TableMap.get(table);
  const cells = [...new Set(map.map)];
  // Every column has a width already: nothing to do.
  const fixed = cells.every((pos) => {
    const { colspan, colwidth } = table.nodeAt(pos)?.attrs ?? {};
    return (
      Array.isArray(colwidth) &&
      colwidth.length === colspan &&
      colwidth.every(Boolean)
    );
  });
  if (fixed) return;
  // Each column's place on screen, from a cell that spans it alone.
  const rects: DOMRect[] = [];
  for (let col = 0; col < map.width; col++) {
    for (let row = 0; row < map.height; row++) {
      const pos = map.map[row * map.width + col];
      if (table.nodeAt(pos)?.attrs['colspan'] !== 1) continue;
      const dom = view.nodeDOM(start + pos);
      if (dom instanceof HTMLElement) {
        rects[col] = dom.getBoundingClientRect();
        break;
      }
    }
  }
  if (rects.length !== map.width || rects.includes(undefined as never)) return;
  // Whole pixels, each border where it was (rounded); the last rounded down,
  // so the table never grows past its box.
  const left = rects[0].left;
  const edges = rects.map((rect, col) =>
    col === rects.length - 1
      ? Math.floor(rect.right - left)
      : Math.round(rect.right - left),
  );
  const widths = edges.map((edge, col) => edge - (col ? edges[col - 1] : 0));
  if (!widths.every((width) => width > 0)) return;
  const tr = view.state.tr;
  for (const pos of cells) {
    const node = table.nodeAt(pos);
    if (!node) continue;
    const col = map.colCount(pos);
    tr.setNodeMarkup(start + pos, null, {
      ...node.attrs,
      colwidth: widths.slice(col, col + node.attrs['colspan']),
    });
  }
  view.dispatch(tr);
}
