import type { PageServerLoad } from "./$types";
import { Disk } from 'flydrive'
import { S3Driver } from 'flydrive/drivers/s3'

const disk = new Disk(
  new S3Driver({
    credentials: {
      accessKeyId: 'AWS_ACCESS_KEY_ID',
      secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    },
    region: 'AWS_REGION',
    bucket: 'S3_BUCKET',
    visibility: 'private',
  })
)

export const load: PageServerLoad = async () => {
  // Initialize disk
  console.log(disk);
  return {};
};
