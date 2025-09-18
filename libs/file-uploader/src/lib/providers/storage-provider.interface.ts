export interface UploadResult {
  url: string;
  key: string;
  bucket?: string;
  metadata?: Record<string, any>;
}

export interface UploadOptions {
  bucket?: string;
  path?: string;
  metadata?: Record<string, any>;
  onProgress?: (progress: number) => void;
}

export interface StorageProvider {
  name: string;
  upload(file: File, options?: UploadOptions): Promise<UploadResult>;
  delete(key: string, bucket?: string): Promise<void>;
  getSignedUrl(key: string, bucket?: string, expiresIn?: number): Promise<string>;
}
