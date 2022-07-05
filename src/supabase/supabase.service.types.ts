import { SUPABASE_BUCKETS } from './constants';

export type Bucket = SUPABASE_BUCKETS;

export interface BucketParams {
  bucket: Bucket;
}

export interface UploadFileFn {
  name: string;
  file:
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | Buffer
    | File
    | FormData
    | NodeJS.ReadableStream
    | ReadableStream<Uint8Array>
    | URLSearchParams
    | string;
}

export type UploadFileParams = BucketParams & UploadFileFn;
