import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BucketParams, UploadFileParams } from './supabase.service.types';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  private storage() {
    return this.supabase.storage;
  }

  async getBucket({ bucket }: BucketParams) {
    return this.storage().getBucket(bucket);
  }

  async uploadBucket({ bucket, file, name }: UploadFileParams) {
    return this.storage().from(bucket).upload(name, file, {
      cacheControl: '3600',
      upsert: false,
    });
  }
}
