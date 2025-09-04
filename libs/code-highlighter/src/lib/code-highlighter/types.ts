// Define your array of strings
export const themesArray = ['github-light', 'github-dark'] as const;
// Create a type from the array elements
export type ThemeType = (typeof themesArray)[number];

// Define your array of strings
export const langsArray = [
  'angular-ts',
  'angular-html',
  'shellscript',
  'typescript',
  'javascript',
  'html',
  'css',
  'json',
  'markdown',
  'python',
  'java',
  'cpp',
  'c',
  'rust',
  'go',
  'php',
  'ruby',
  'sql',
  'yaml',
  'xml',
] as const;
// Create a type from the array elements
export type LangType = (typeof langsArray)[number];
