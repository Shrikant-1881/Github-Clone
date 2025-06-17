const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETEACCESSKEY,
  },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET;

module.exports = { s3, S3_BUCKET };
