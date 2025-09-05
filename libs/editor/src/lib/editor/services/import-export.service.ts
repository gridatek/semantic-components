import { Injectable } from '@angular/core';

import { Editor } from '@tiptap/core';

export interface ExportOptions {
  format: 'markdown' | 'html' | 'text' | 'json';
  filename?: string;
}

@Injectable()
export class ScImportExport {
  private editor!: Editor;

  setEditor(editor: Editor) {
    this.editor = editor;
  }

  /**
   * Export editor content in specified format
   */
  export(options: ExportOptions): void {
    let content: string;
    let mimeType: string;
    let extension: string;

    switch (options.format) {
      case 'markdown':
        content = this.toMarkdown();
        mimeType = 'text/markdown';
        extension = 'md';
        break;
      case 'html':
        content = this.editor.getHTML();
        mimeType = 'text/html';
        extension = 'html';
        break;
      case 'text':
        content = this.editor.getText();
        mimeType = 'text/plain';
        extension = 'txt';
        break;
      case 'json':
        content = JSON.stringify(this.editor.getJSON(), null, 2);
        mimeType = 'application/json';
        extension = 'json';
        break;
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    const filename = options.filename || `document.${extension}`;
    this.downloadFile(content, filename, mimeType);
  }

  /**
   * Import content from file
   */
  async importFromFile(file: File): Promise<void> {
    const content = await this.readFileContent(file);
    const extension = file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'md':
      case 'markdown':
        this.fromMarkdown(content);
        break;
      case 'html':
      case 'htm':
        this.editor.commands.setContent(content);
        break;
      case 'txt':
        this.editor.commands.setContent(`<p>${content.replace(/\n/g, '</p><p>')}</p>`);
        break;
      case 'json':
        try {
          const json = JSON.parse(content);
          this.editor.commands.setContent(json);
        } catch (e) {
          throw new Error('Invalid JSON format');
        }
        break;
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  }

  /**
   * Convert editor content to Markdown
   */
  private toMarkdown(): string {
    const json = this.editor.getJSON();
    return this.jsonToMarkdown(json);
  }

  /**
   * Convert Markdown to editor content
   */
  private fromMarkdown(markdown: string): void {
    // Basic markdown to HTML conversion
    const html = this.markdownToHtml(markdown);
    this.editor.commands.setContent(html);
  }

  /**
   * Simple JSON to Markdown converter
   */
  private jsonToMarkdown(node: any): string {
    if (!node) return '';

    let result = '';

    switch (node.type) {
      case 'doc':
        return node.content?.map((child: any) => this.jsonToMarkdown(child)).join('\n\n') || '';

      case 'heading':
        const level = node.attrs?.level || 1;
        const headingText =
          node.content?.map((child: any) => this.jsonToMarkdown(child)).join('') || '';
        return '#'.repeat(level) + ' ' + headingText;

      case 'paragraph':
        return node.content?.map((child: any) => this.jsonToMarkdown(child)).join('') || '';

      case 'text':
        let text = node.text || '';
        if (node.marks) {
          node.marks.forEach((mark: any) => {
            switch (mark.type) {
              case 'bold':
                text = `**${text}**`;
                break;
              case 'italic':
                text = `*${text}*`;
                break;
              case 'code':
                text = `\`${text}\``;
                break;
              case 'link':
                text = `[${text}](${mark.attrs?.href || ''})`;
                break;
            }
          });
        }
        return text;

      case 'codeBlock':
        const language = node.attrs?.language || '';
        const code = node.content?.map((child: any) => child.text).join('\n') || '';
        return `\`\`\`${language}\n${code}\n\`\`\``;

      case 'blockquote':
        const blockquoteContent =
          node.content?.map((child: any) => this.jsonToMarkdown(child)).join('\n') || '';
        return blockquoteContent
          .split('\n')
          .map((line: string) => `> ${line}`)
          .join('\n');

      case 'bulletList':
        return (
          node.content?.map((child: any) => `- ${this.jsonToMarkdown(child)}`).join('\n') || ''
        );

      case 'orderedList':
        return (
          node.content
            ?.map((child: any, index: number) => `${index + 1}. ${this.jsonToMarkdown(child)}`)
            .join('\n') || ''
        );

      case 'listItem':
        return node.content?.map((child: any) => this.jsonToMarkdown(child)).join('') || '';

      case 'horizontalRule':
        return '---';

      default:
        if (node.content) {
          return node.content.map((child: any) => this.jsonToMarkdown(child)).join('');
        }
        return '';
    }
  }

  /**
   * Simple Markdown to HTML converter
   */
  private markdownToHtml(markdown: string): string {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

    // Code
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n$/gim, '<br />');

    // Paragraphs
    html = html.replace(/\n\n/gim, '</p><p>');
    html = '<p>' + html + '</p>';

    return html;
  }

  /**
   * Read file content as text
   */
  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  /**
   * Download content as file
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
