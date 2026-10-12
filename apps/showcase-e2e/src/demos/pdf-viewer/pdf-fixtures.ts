import { type Page, expect } from '@playwright/test';
import { createHash } from 'node:crypto';

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

/** RC4, which the PDF standard security handler (revision 2) uses. */
function rc4(key: Buffer, data: Buffer): Buffer {
  const s = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 0, j = 0; i < 256; i++) {
    j = (j + s[i] + key[i % key.length]) & 255;
    [s[i], s[j]] = [s[j], s[i]];
  }
  const out = Buffer.alloc(data.length);
  for (let n = 0, i = 0, j = 0; n < data.length; n++) {
    i = (i + 1) & 255;
    j = (j + s[i]) & 255;
    [s[i], s[j]] = [s[j], s[i]];
    out[n] = data[n] ^ s[(s[i] + s[j]) & 255];
  }
  return out;
}

const md5 = (...parts: Buffer[]) =>
  createHash('md5').update(Buffer.concat(parts)).digest();

/** The standard security handler's password padding. */
const PADDING = Buffer.from(
  '28bf4e5e4e758a4164004e56fffa01082e2e00b6d0683e802f0ca9fe6453697a',
  'hex',
);

/**
 * A page of text, encrypted (RC4 40-bit, no user password: it opens at once)
 * with permissions that forbid printing, copying, changing and annotating
 * it, and filling in forms.
 */
export function lockedPdf(): Buffer {
  // Every permission bit cleared but the reserved ones (as a 32-bit int).
  const flags = ~(4 | 8 | 16 | 32 | 256 | 512 | 1024 | 2048) | 0;
  const id = Buffer.from('0123456789abcdef0123456789abcdef', 'hex');
  const owner = rc4(
    md5(
      Buffer.concat([Buffer.from('owner'), PADDING]).subarray(0, 32),
    ).subarray(0, 5),
    PADDING,
  );
  const p = Buffer.alloc(4);
  p.writeInt32LE(flags);
  const key = md5(PADDING, owner, p, id).subarray(0, 5);
  const user = rc4(key, PADDING);
  /** An object's stream, encrypted with its own key. */
  const encrypt = (objectNumber: number, data: string) => {
    const salt = Buffer.from([
      objectNumber & 255,
      (objectNumber >> 8) & 255,
      (objectNumber >> 16) & 255,
      0,
      0,
    ]);
    return rc4(
      md5(key, salt).subarray(0, 10),
      Buffer.from(data, 'latin1'),
    ).toString('latin1');
  };

  const text = [
    'BT /F1 18 Tf 72 700 Td (A locked document) Tj ET',
    'BT /F1 12 Tf 72 670 Td (Its text cannot be copied, nor the document printed.) Tj ET',
  ].join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [4 0 R] /Count 1 >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents 5 0 R >>',
    `<< /Length ${text.length} >>\nstream\n${encrypt(5, text)}\nendstream`,
    `<< /Filter /Standard /V 1 /R 2 /Length 40 /O <${owner.toString('hex')}> /U <${user.toString('hex')}> /P ${flags} >>`,
  ];
  let pdf = '%PDF-1.4\n';
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
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Encrypt 6 0 R /ID [<${id.toString('hex')}> <${id.toString('hex')}>] >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, 'latin1');
}

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
