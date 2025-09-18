import { StorageProvider, UploadOptions, UploadResult } from './storage-provider.interface';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  defaultBucket?: string;
}

export class SupabaseStorageProvider implements StorageProvider {
  readonly name = 'supabase';
  private supabase: any;

  constructor(private config: SupabaseConfig) {
    this.initializeSupabase();
  }

  private async initializeSupabase() {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      this.supabase = createClient(this.config.url, this.config.anonKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(
        `Failed to initialize Supabase client: ${message}. ` +
          'Please install @supabase/supabase-js: npm install @supabase/supabase-js',
      );
    }
  }

  async upload(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    if (!this.supabase) {
      await this.initializeSupabase();
    }

    const bucket = options.bucket || this.config.defaultBucket;
    if (!bucket) {
      throw new Error('Bucket is required for Supabase storage');
    }

    const path = options.path || '';
    const fileName = `${path}${path && !path.endsWith('/') ? '/' : ''}${Date.now()}-${file.name}`;

    const { data, error } = await this.supabase.storage.from(bucket).upload(fileName, file, {
      metadata: options.metadata,
    });

    if (error) {
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage.from(bucket).getPublicUrl(data.path);

    return {
      url: publicUrlData.publicUrl,
      key: data.path,
      bucket,
      metadata: options.metadata,
    };
  }

  async delete(key: string, bucket?: string): Promise<void> {
    if (!this.supabase) {
      await this.initializeSupabase();
    }

    const targetBucket = bucket || this.config.defaultBucket;
    if (!targetBucket) {
      throw new Error('Bucket is required for Supabase storage');
    }

    const { error } = await this.supabase.storage.from(targetBucket).remove([key]);

    if (error) {
      throw new Error(`Supabase delete failed: ${error.message}`);
    }
  }

  async getSignedUrl(key: string, bucket?: string, expiresIn = 3600): Promise<string> {
    if (!this.supabase) {
      await this.initializeSupabase();
    }

    const targetBucket = bucket || this.config.defaultBucket;
    if (!targetBucket) {
      throw new Error('Bucket is required for Supabase storage');
    }

    const { data, error } = await this.supabase.storage
      .from(targetBucket)
      .createSignedUrl(key, expiresIn);

    if (error) {
      throw new Error(`Supabase signed URL failed: ${error.message}`);
    }

    return data.signedUrl;
  }
}
