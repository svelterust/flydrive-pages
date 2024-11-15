import { env } from "$env/dynamic/private";
import { FileStorage } from "@flystorage/file-storage";

async function createAdapter() {
  if (import.meta.env.DEV) {
    const { LocalStorageAdapter } = await import("@flystorage/local-fs");

    // While developing, use local filesystem
    const location = `${process.cwd()}/files`;
    return new LocalStorageAdapter(location, {
      publicUrlOptions: {
        baseUrl: "/files",
      },
    });
  } else {
    const { S3Client } = await import("@aws-sdk/client-s3");
    const { AwsS3StorageAdapter } = await import("@flystorage/aws-s3");

    // In production, use S3
    const client = new S3Client({
      region: env.S3_REGION ?? "auto",
      endpoint: env.S3_URL,
      credentials: {
        accessKeyId: env.S3_ID,
        secretAccessKey: env.S3_KEY,
      },
    });
    return new AwsS3StorageAdapter(client, {
      bucket: env.S3_BUCKET,
    });
  }
}

// Create storage with adapter
const adapter = await createAdapter();
export const storage = new FileStorage(adapter);
