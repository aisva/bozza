import { createLogger } from '../utils/logger';
import * as AWS from 'aws-sdk';
import { createS3 } from '../utils/dataStorage';

const logger = createLogger('itemStorage');

export class ItemStorage {
  constructor(
    private readonly s3: AWS.S3 = createS3(logger),
    private readonly attachmentsBucket: string = process.env.ATTACHMENTS_S3_BUCKET,
    private readonly signedUrlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION)
  ) {}

  getUploadUrl(itemId: string): string {
    logger.info('Getting upload URL', { itemId: itemId });
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.attachmentsBucket,
      Key: itemId,
      Expires: this.signedUrlExpiration
    });
  }
}
