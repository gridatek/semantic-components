import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';

import { ProviderConfig, StorageProviderFactory } from '../providers/provider.factory';
import { StorageProvider, UploadResult } from '../providers/storage-provider.interface';

export interface FileUploadConfig {
  maxFileSize?: number;
  allowedFileTypes?: string[];
  maxNumberOfFiles?: number;
  autoProceed?: boolean;
  showProgressDetails?: boolean;
}

export interface UploadEvent {
  files: UploadResult[];
  successful: UploadResult[];
  failed: any[];
}

@Component({
  selector: 'sc-file-uploader',
  imports: [],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploader implements OnInit, OnDestroy {
  readonly providerConfig = input.required<ProviderConfig>();
  readonly config = input<FileUploadConfig>({});
  readonly uploadPath = input<string>('');
  readonly bucket = input<string>('');
  readonly variant = input<'dashboard' | 'drag-drop' | 'file-input'>('dashboard');

  readonly uploadComplete = output<UploadEvent>();
  readonly uploadProgress = output<number>();
  readonly uploadError = output<Error>();

  private readonly uploaderElement = viewChild.required<ElementRef>('uploader');
  private uppy: any;
  private storageProvider: StorageProvider | null = null;

  constructor() {
    effect(() => {
      this.initializeProvider();
    });
  }

  async ngOnInit() {
    await this.initializeUppy();
  }

  ngOnDestroy() {
    if (this.uppy) {
      this.uppy.destroy();
    }
  }

  private initializeProvider() {
    try {
      this.storageProvider = StorageProviderFactory.create(this.providerConfig());
    } catch (error) {
      this.uploadError.emit(error as Error);
    }
  }

  private async initializeUppy() {
    try {
      const { default: Uppy } = await import('@uppy/core');

      const config = this.config();

      this.uppy = new Uppy({
        autoProceed: config.autoProceed ?? false,
        restrictions: {
          maxFileSize: config.maxFileSize,
          allowedFileTypes: config.allowedFileTypes,
          maxNumberOfFiles: config.maxNumberOfFiles,
        },
      });

      // Set up custom uploader function
      this.uppy.use(this.createCustomUploader());

      // Set up UI based on variant
      await this.setupUI();

      // Event listeners
      this.uppy.on('complete', (result: any) => {
        const event: UploadEvent = {
          files: result.successful.map((file: any) => file.response?.body),
          successful: result.successful.map((file: any) => file.response?.body),
          failed: result.failed,
        };
        this.uploadComplete.emit(event);
      });

      this.uppy.on('progress', (progress: number) => {
        this.uploadProgress.emit(progress);
      });

      this.uppy.on('error', (error: Error) => {
        this.uploadError.emit(error);
      });
    } catch (error) {
      this.uploadError.emit(error as Error);
    }
  }

  private async setupUI() {
    const variant = this.variant();
    const target = this.uploaderElement().nativeElement;

    switch (variant) {
      case 'dashboard':
        const { default: Dashboard } = await import('@uppy/dashboard');
        this.uppy.use(Dashboard, {
          target,
          inline: true,
          showProgressDetails: this.config().showProgressDetails ?? true,
        });
        break;

      case 'drag-drop':
        const { default: DragDrop } = await import('@uppy/drag-drop');
        this.uppy.use(DragDrop, { target });
        break;

      case 'file-input':
        const { default: FileInput } = await import('@uppy/file-input');
        this.uppy.use(FileInput, { target });
        break;
    }
  }

  private createCustomUploader() {
    return {
      name: 'StorageProviderUploader',
      type: 'acquirer',
      install: () => {},
      uninstall: () => {},
      upload: async (fileIDs: string[]) => {
        if (!this.storageProvider) {
          throw new Error('Storage provider not initialized');
        }

        const promises = fileIDs.map(async (fileID) => {
          const file = this.uppy.getFile(fileID);

          try {
            const result = await this.storageProvider!.upload(file.data, {
              path: this.uploadPath(),
              bucket: this.bucket(),
              onProgress: (progress) => {
                this.uppy.emit('upload-progress', file, {
                  uploader: this,
                  bytesUploaded: Math.round(file.size * (progress / 100)),
                  bytesTotal: file.size,
                });
              },
            });

            this.uppy.emit('upload-success', file, { body: result });
            return { successful: [{ ...file, response: { body: result } }], failed: [] };
          } catch (error) {
            this.uppy.emit('upload-error', file, error);
            return { successful: [], failed: [{ ...file, error }] };
          }
        });

        return Promise.all(promises);
      },
    };
  }
}
