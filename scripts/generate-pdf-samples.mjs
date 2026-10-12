// Writes the sample PDFs used by the PDF viewer docs demos and e2e tests:
//
//   apps/showcase/public/pdf/handbook.pdf — 6 pages with page labels
//     (i, ii, 1–4), an outline (one branch open, one closed, a bookmark
//     halfway down a page), a named destination ("chapter-2") and
//     /PageMode /UseOutlines.
//   apps/showcase/public/pdf/order-form.pdf — an AcroForm: quantity and
//     price fields, a total computed by a JavaScript calculate action, and a
//     gift-wrap checkbox.
//
// Usage: node scripts/generate-pdf-samples.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '../apps/showcase/public/pdf',
);

/** A minimal PDF writer: objects, then the xref table and trailer. */
function writePdf(file, build) {
  const objects = [];
  const add = (body = null) => {
    objects.push(body);
    return objects.length;
  };
  const set = (n, body) => (objects[n - 1] = body);
  const root = build({ add, set, ref: (n) => `${n} 0 R` });

  let pdf = '%PDF-1.7\n';
  const offsets = [];
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
  writeFileSync(join(outDir, file), pdf, 'latin1');
  console.log(`wrote ${file} (${pdf.length} bytes)`);
}

const stream = (content) =>
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
const text = (size, x, y, value) =>
  `BT /F1 ${size} Tf ${x} ${y} Td (${value}) Tj ET`;

mkdirSync(outDir, { recursive: true });

writePdf('handbook.pdf', ({ add, set, ref }) => {
  const catalog = add();
  const pages = add();
  const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const titles = [
    'Preface',
    'Contents',
    'Chapter 1: Getting started',
    'Chapter 1: Configuration',
    'Chapter 2: Reference',
    'Chapter 2: API',
  ];
  const pageIds = titles.map((title, i) => {
    const content = add(
      stream(
        [
          text(28, 72, 700, title),
          text(12, 72, 670, `Page ${i + 1} of the handbook.`),
          text(16, 72, 400, `Section in the middle of page ${i + 1}`),
        ].join('\n'),
      ),
    );
    return add(
      `<< /Type /Page /Parent ${ref(pages)} /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${ref(font)} >> >> /Contents ${ref(content)} >>`,
    );
  });
  set(
    pages,
    `<< /Type /Pages /Kids [${pageIds.map(ref).join(' ')}] /Count ${pageIds.length} >>`,
  );
  const dest = (page, top = 792) =>
    `[${ref(pageIds[page - 1])} /XYZ 0 ${top} 0]`;

  const outlines = add();
  const [preface, ch1, s11, s12, ch2, s21] = [
    add(),
    add(),
    add(),
    add(),
    add(),
    add(),
  ];
  set(
    outlines,
    `<< /Type /Outlines /First ${ref(preface)} /Last ${ref(ch2)} /Count 4 >>`,
  );
  set(
    preface,
    `<< /Title (Preface) /Parent ${ref(outlines)} /Next ${ref(ch1)} /Dest ${dest(1)} >>`,
  );
  set(
    ch1,
    `<< /Title (Chapter 1) /Parent ${ref(outlines)} /Prev ${ref(preface)} /Next ${ref(ch2)} /First ${ref(s11)} /Last ${ref(s12)} /Count 2 /F 2 /Dest ${dest(3)} >>`,
  );
  set(
    s11,
    `<< /Title (Middle of chapter 1) /Parent ${ref(ch1)} /Next ${ref(s12)} /Dest ${dest(3, 420)} >>`,
  );
  set(
    s12,
    `<< /Title (Configuration) /Parent ${ref(ch1)} /Prev ${ref(s11)} /Dest ${dest(4)} >>`,
  );
  set(
    ch2,
    `<< /Title (Chapter 2) /Parent ${ref(outlines)} /Prev ${ref(ch1)} /First ${ref(s21)} /Last ${ref(s21)} /Count -1 /Dest /chapter-2 >>`,
  );
  set(s21, `<< /Title (API) /Parent ${ref(ch2)} /Dest ${dest(6)} >>`);

  const dests = add(`<< /chapter-2 ${dest(5)} >>`);
  set(
    catalog,
    `<< /Type /Catalog /Pages ${ref(pages)} /Outlines ${ref(outlines)} /PageMode /UseOutlines /Dests ${ref(dests)} /PageLabels << /Nums [0 << /S /r >> 2 << /S /D >>] >> >>`,
  );
  return catalog;
});

writePdf('order-form.pdf', ({ add, set, ref }) => {
  const catalog = add();
  const pages = add();
  const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const helv = add(
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  );
  const content = add(
    stream(
      [
        text(24, 72, 710, 'Order form'),
        text(12, 72, 652, 'Quantity'),
        text(12, 72, 612, 'Unit price'),
        text(12, 72, 572, 'Total'),
        text(12, 100, 532, 'Gift wrap'),
        text(
          10,
          72,
          480,
          "The total is computed by the document's own script.",
        ),
      ].join('\n'),
    ),
  );
  const page = add();
  const js = (code) => `<< /S /JavaScript /JS (${code}) >>`;
  const field = (name, y, extra = '') =>
    add(
      `<< /Type /Annot /Subtype /Widget /FT /Tx /T (${name}) /TU (${name}) /Rect [160 ${y} 360 ${y + 22}] /F 4 /P ${ref(page)} /DA (/Helv 12 Tf 0 g) /MK << /BC [0 0 0] >> ${extra} >>`,
    );
  const quantity = field('Quantity', 645);
  const price = field('Unit price', 605);
  const total = field(
    'Total',
    565,
    `/Ff 1 /AA << /C ${js("event.value = Number(this.getField('Quantity').value) * Number(this.getField('Unit price').value);")} >>`,
  );
  const empty = () =>
    add(
      '<< /Length 0 /Type /XObject /Subtype /Form /BBox [0 0 16 16] >>\nstream\n\nendstream',
    );
  const gift = add(
    `<< /Type /Annot /Subtype /Widget /FT /Btn /T (Gift wrap) /TU (Gift wrap) /Rect [72 528 88 544] /F 4 /P ${ref(page)} /V /Off /AS /Off /MK << /BC [0 0 0] >> /AP << /N << /Yes ${ref(empty())} /Off ${ref(empty())} >> >> >>`,
  );
  const fields = [quantity, price, total, gift].map(ref).join(' ');
  set(
    page,
    `<< /Type /Page /Parent ${ref(pages)} /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${ref(font)} >> >> /Contents ${ref(content)} /Annots [${fields}] >>`,
  );
  set(pages, `<< /Type /Pages /Kids [${ref(page)}] /Count 1 >>`);
  set(
    catalog,
    `<< /Type /Catalog /Pages ${ref(pages)} /AcroForm << /Fields [${fields}] /CO [${ref(total)}] /DA (/Helv 12 Tf 0 g) /DR << /Font << /Helv ${ref(helv)} >> >> /NeedAppearances true >> >>`,
  );
  return catalog;
});
