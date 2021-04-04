const AWS = require('aws-sdk');
const {BUCKET_NAME,AWS_ACCESS_KEY,AWS_SECRET_ACCESS_KEY} = process.env;
const fs = require('fs')
async function upload(filename, path) {
    const s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
  
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: fs.createReadStream(path),
      }, (err, res) => err ? reject(err) : resolve());
    });
  }
  
  module.exports.upload = upload;