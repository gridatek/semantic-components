/** Why a file was kept out: a built-in rule's, or your `validate`'s. */
export type ScFileInputRejectionReason =
  | 'file-type'
  | 'file-too-large'
  | 'file-too-small'
  | 'too-many-files'
  | (string & {});

/** A file kept out, and every reason. */
export interface ScFileInputRejection {
  readonly file: File;
  readonly reasons: readonly ScFileInputRejectionReason[];
}

/** How files came, or went. */
export type ScFileInputReason =
  'picker' | 'drop' | 'paste' | 'remove-press' | 'imperative';

/** The last change: how, the files added, removed and kept out. */
export interface ScFileInputChange {
  readonly reason: ScFileInputReason;
  readonly added: readonly File[];
  readonly removed: readonly File[];
  readonly rejected: readonly ScFileInputRejection[];
}

/** Your rule: a reason to keep the file out, or nothing. */
export type ScFileInputValidate = (
  file: File,
  context: { readonly accepted: readonly File[] },
) => string | null | undefined;

/** The most files read from dropped folders. */
const FOLDER_LIMIT = 1000;
/** A system's files, not the user's. */
const SYSTEM_FILES = /^(\.DS_Store|Thumbs\.db|desktop\.ini)$/i;

const paths = new WeakMap<File, string>();

/**
 * A file's path in the folder it came in (`photos/2026/beach.jpg`) — picked
 * with `directory` or dropped — else its name.
 */
export function fileRelativePath(file: File): string {
  return paths.get(file) ?? (file.webkitRelativePath || file.name);
}

/** Of a type in `accept`: an extension (by its name), `type/*`, or a type. */
export function scFileAccepted(
  file: { readonly name?: string; readonly type: string },
  accept: readonly string[],
): boolean {
  if (!accept.length) return true;
  const name = (file.name ?? '').toLowerCase();
  const type = file.type.toLowerCase();
  return accept.some((entry) =>
    entry.startsWith('.')
      ? file.name === undefined
        ? // While dragging, no name yet: the extension as the type says it.
          !type || typeOf(entry.slice(1)) === subtype(type)
        : name.endsWith(entry)
      : entry.endsWith('/*')
        ? type.startsWith(entry.slice(0, -1))
        : type === entry,
  );
}

/** An extension's MIME subtype, where they differ. */
const SUBTYPES: Record<string, string> = {
  jpg: 'jpeg',
  txt: 'plain',
  htm: 'html',
  md: 'markdown',
};
const typeOf = (extension: string) => SUBTYPES[extension] ?? extension;
/** `application/pdf` → `pdf`, `image/svg+xml` → `svg`. */
const subtype = (type: string) => type.split('/')[1]?.split('+')[0] ?? '';

/** `accept` as a list: `'image/*, .pdf'` or `['image/*', '.pdf']`. */
export function scAcceptList(accept: string | readonly string[]): string[] {
  return (typeof accept === 'string' ? accept.split(',') : [...accept])
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * The files dropped: folders read through (their paths kept), system files
 * left out, up to a thousand.
 */
export async function scDroppedFiles(data: DataTransfer): Promise<File[]> {
  const entries = Array.from(data.items)
    .filter((item) => item.kind === 'file')
    .map((item) => item.webkitGetAsEntry?.())
    .filter((entry): entry is FileSystemEntry => !!entry);
  if (!entries.some((entry) => entry.isDirectory))
    return Array.from(data.files);
  const files: File[] = [];
  const read = async (entry: FileSystemEntry, path: string): Promise<void> => {
    if (files.length >= FOLDER_LIMIT || SYSTEM_FILES.test(entry.name)) return;
    if (entry.isFile) {
      const file = await new Promise<File>((resolve, reject) =>
        (entry as FileSystemFileEntry).file(resolve, reject),
      );
      paths.set(file, path + entry.name);
      files.push(file);
      return;
    }
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    // A reader gives a folder's entries in batches, until an empty one.
    for (;;) {
      const batch = await new Promise<FileSystemEntry[]>((resolve, reject) =>
        reader.readEntries(resolve, reject),
      );
      if (!batch.length) break;
      for (const child of batch) await read(child, `${path}${entry.name}/`);
    }
  };
  for (const entry of entries) await read(entry, '');
  return files;
}
