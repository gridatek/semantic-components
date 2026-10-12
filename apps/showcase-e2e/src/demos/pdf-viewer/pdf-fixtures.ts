import { type Page, expect } from '@playwright/test';

/**
 * Small PDFs built for the tests (not shipped with the showcase), opened in
 * the full demo with More → Open file….
 */

/** A minimal PDF writer: objects, then the xref table and trailer. */
function buildPdf(
  build: (pdf: {
    add: (body?: string | null) => number;
    set: (n: number, body: string) => void;
    ref: (n: number) => string;
  }) => number,
): Buffer {
  const objects: (string | null)[] = [];
  const add = (body: string | null = null) => {
    objects.push(body);
    return objects.length;
  };
  const set = (n: number, body: string) => (objects[n - 1] = body);
  const root = build({ add, set, ref: (n) => `${n} 0 R` });

  let pdf = '%PDF-1.7\n';
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${root} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, 'latin1');
}

const stream = (content: string) =>
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;

/** One page of Helvetica text, a line per entry. */
function onePage(
  lines: [y: number, text: string][],
): (pdf: Parameters<Parameters<typeof buildPdf>[0]>[0]) => number {
  return ({ add, set, ref }) => {
    const catalog = add();
    const pages = add();
    const font = add(
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    );
    const content = add(
      stream(
        lines
          .map(([y, s]) => `BT /F1 14 Tf 72 ${y} Td (${s}) Tj ET`)
          .join('\n'),
      ),
    );
    const page = add(
      `<< /Type /Page /Parent ${ref(pages)} /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${ref(font)} >> >> /Contents ${ref(content)} >>`,
    );
    set(pages, `<< /Type /Pages /Kids [${ref(page)}] /Count 1 >>`);
    set(catalog, `<< /Type /Catalog /Pages ${ref(pages)} >>`);
    return catalog;
  };
}

/** Text for find: a word hyphenated at a line end, a wrapped phrase, a word thrice in a line. */
export const findPdf = () =>
  buildPdf(
    onePage([
      [700, 'The infor-'],
      [680, 'mation is useful.'],
      [640, 'A long phrase that'],
      [620, 'wraps across lines.'],
      [580, 'cat and cat and cat'],
    ]),
  );

/**
 * A tagged page: a heading, a paragraph, a figure with alt text, a link
 * (with its annotation), a footer marked as an artifact.
 */
export const taggedPdf = () =>
  buildPdf(({ add, set, ref }) => {
    const catalog = add();
    const pages = add();
    const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    const page = add();
    const text = (
      mcid: number,
      tag: string,
      size: number,
      y: number,
      s: string,
    ) =>
      `/${tag} <</MCID ${mcid}>> BDC BT /F1 ${size} Tf 72 ${y} Td (${s}) Tj ET EMC`;
    const content = add(
      stream(
        [
          text(0, 'H1', 24, 700, 'Annual report'),
          text(1, 'P', 12, 670, 'This is the first paragraph.'),
          '/Figure <</MCID 2>> BDC 0 0 1 rg 72 520 100 100 re f EMC',
          text(3, 'Link', 12, 480, 'Visit the website'),
          '/Artifact BMC BT /F1 10 Tf 72 40 Td (Footer) Tj ET EMC',
        ].join('\n'),
      ),
    );
    const link = add();
    const root = add();
    const doc = add();
    const element = (s: string, k: string, extra = '') =>
      add(
        `<< /Type /StructElem /S /${s} /P ${ref(doc)} /Pg ${ref(page)} /K ${k} ${extra} >>`,
      );
    const h1 = element('H1', '0');
    const p = element('P', '1');
    const figure = element(
      'Figure',
      '2',
      '/Alt (A blue square) /A << /O /Layout /BBox [72 520 172 620] >>',
    );
    const linkElement = element(
      'Link',
      `[3 << /Type /OBJR /Obj ${ref(link)} >>]`,
    );
    set(
      doc,
      `<< /Type /StructElem /S /Document /P ${ref(root)} /K [${[h1, p, figure, linkElement].map(ref).join(' ')}] >>`,
    );
    set(
      root,
      `<< /Type /StructTreeRoot /K ${ref(doc)} /ParentTree << /Nums [0 [${[h1, p, figure, linkElement].map(ref).join(' ')}] 1 ${ref(linkElement)}] >> /ParentTreeNextKey 2 >>`,
    );
    set(
      link,
      `<< /Type /Annot /Subtype /Link /Rect [72 475 180 495] /Border [0 0 0] /StructParent 1 /A << /S /URI /URI (https://example.com/) >> >>`,
    );
    set(
      page,
      `<< /Type /Page /Parent ${ref(pages)} /MediaBox [0 0 612 792] /StructParents 0 /Resources << /Font << /F1 ${ref(font)} >> >> /Contents ${ref(content)} /Annots [${ref(link)}] >>`,
    );
    set(pages, `<< /Type /Pages /Kids [${ref(page)}] /Count 1 >>`);
    set(
      catalog,
      `<< /Type /Catalog /Pages ${ref(pages)} /MarkInfo << /Marked true >> /StructTreeRoot ${ref(root)} /Lang (en) >>`,
    );
    return catalog;
  });

/** Opens a PDF (without page labels) in the full demo with More → Open file…. */
export async function openPdf(
  page: Page,
  name: string,
  buffer: Buffer,
): Promise<void> {
  await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
  await page.getByRole('button', { name: 'More' }).click();
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('menuitem', { name: 'Open file…' }).click(),
  ]);
  await chooser.setFiles({ name, mimeType: 'application/pdf', buffer });
  await expect(page.getByTestId('page-count')).toHaveText('/ 1', {
    timeout: 20_000,
  });
  // Its text is drawn.
  await expect(
    page.locator('div[data-page="1"] .textLayer span').first(),
  ).toBeAttached();
}
