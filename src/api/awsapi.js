
import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = process.env.S3_BUCKET;//'YOUR_BUCKET_NAME_HERE';
const REGION = process.env.S3_REGION;//'YOUR_DESIRED_REGION_HERE';

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID, //'YOUR_ACCESS_KEY_HERE',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY//'YOUR_SECRET_ACCESS_KEY_HERE'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

async function Awsapi(file){

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    myBucket.putObject(params)
        .send((err) => {
            if (err) console.log(err)
        });
}

export default Awsapi;