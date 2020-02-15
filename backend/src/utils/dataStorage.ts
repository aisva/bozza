import * as winston from 'winston';
import * as AWS from 'aws-sdk';

export function createS3(logger: winston.Logger): AWS.S3 {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local S3 instance');
    return new AWS.S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      endpoint: 'http://localhost:8001',
      signatureVersion: 'v4'
    });
  }
  return new AWS.S3({
    signatureVersion: 'v4'
  });
}

export function getDownloadUrl(itemId: string): string {
  const attachmentsBucket: string = process.env.ATTACHMENTS_S3_BUCKET;
  return process.env.IS_OFFLINE
    ? `http://localhost:8001/${attachmentsBucket}/${itemId}`
    : `https://${attachmentsBucket}.s3.amazonaws.com/${itemId}`;
}
