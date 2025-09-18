import { StorageProvider } from './storage-provider.interface';
import { SupabaseConfig, SupabaseStorageProvider } from './supabase-storage.provider';

export type ProviderConfig =
  | { provider: 'supabase'; config: SupabaseConfig }
  | { provider: 'aws-s3'; config: any } // Future AWS S3 support
  | { provider: 'google-cloud'; config: any } // Future Google Cloud support
  | { provider: 'azure-blob'; config: any }; // Future Azure support

export class StorageProviderFactory {
  static create(providerConfig: ProviderConfig): StorageProvider {
    switch (providerConfig.provider) {
      case 'supabase':
        return new SupabaseStorageProvider(providerConfig.config);

      case 'aws-s3':
        throw new Error('AWS S3 provider not implemented yet');

      case 'google-cloud':
        throw new Error('Google Cloud provider not implemented yet');

      case 'azure-blob':
        throw new Error('Azure Blob provider not implemented yet');

      default:
        throw new Error(`Unknown storage provider: ${(providerConfig as any).provider}`);
    }
  }
}
