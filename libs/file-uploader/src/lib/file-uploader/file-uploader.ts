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
  template: `
    <div class="sc-file-uploader" #uploaderContainer>
      <!-- Uppy will be mounted here -->
    </div>
  `,
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

  private readonly uploaderContainer = viewChild.required<ElementRef>('uploaderContainer');
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
      // Load Uppy from CDN to avoid build dependencies
      const Uppy = await this.loadUppyFromCDN();
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

      // Setup UI based on variant
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
    const target = this.uploaderContainer().nativeElement;

    switch (variant) {
      case 'dashboard':
        const Dashboard = await this.loadUppyPlugin('Dashboard');
        this.uppy.use(Dashboard, {
          target,
          inline: true,
          showProgressDetails: this.config().showProgressDetails ?? true,
        });
        break;

      case 'drag-drop':
        const DragDrop = await this.loadUppyPlugin('DragDrop');
        this.uppy.use(DragDrop, { target });
        break;

      case 'file-input':
        const FileInput = await this.loadUppyPlugin('FileInput');
        this.uppy.use(FileInput, { target });
        break;
    }
  }

  private async loadUppyFromCDN(): Promise<any> {
    // Check if Uppy is already loaded
    if (typeof (window as any).Uppy === 'function') {
      return (window as any).Uppy;
    }

    return new Promise((resolve, reject) => {
      this.loadUppyStyles();

      const script = document.createElement('script');
      script.src = 'https://releases.transloadit.com/uppy/v4.3.0/uppy.min.js';
      script.onload = () => {
        const uppy = (window as any).Uppy;
        console.log('Uppy object structure:', uppy);
        console.log('Uppy object keys:', Object.keys(uppy || {}));

        // In Uppy v4.x, Core has been renamed to Uppy
        if (uppy && typeof uppy.Uppy === 'function') {
          resolve(uppy.Uppy);
        } else if (uppy && typeof uppy.Core === 'function') {
          // Fallback for older versions
          resolve(uppy.Core);
        } else if (typeof uppy === 'function') {
          resolve(uppy);
        } else {
          console.error('Failed to find Uppy constructor. Available:', uppy);
          reject(new Error('Uppy constructor not found after loading CDN'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Uppy from CDN'));
      document.head.appendChild(script);
    });
  }

  private async loadUppyPlugin(pluginName: string): Promise<any> {
    // Wait for Uppy to be available and check for plugins
    const uppy = (window as any).Uppy;
    if (uppy && uppy[pluginName]) {
      return uppy[pluginName];
    }

    console.error(`Available Uppy plugins:`, Object.keys(uppy || {}));
    throw new Error(
      `Uppy plugin ${pluginName} not found. Make sure Uppy CDN includes all plugins.`,
    );
  }

  private loadUppyStyles(): void {
    if (document.querySelector('link[href*="uppy"]')) {
      return; // Styles already loaded
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://releases.transloadit.com/uppy/v4.3.0/uppy.min.css';
    document.head.appendChild(link);
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
