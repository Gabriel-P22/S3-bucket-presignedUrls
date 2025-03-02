import parser from "lambda-multipart-parser";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'node:crypto';

import { response } from "./utils/response.js";

export async function handler(event) {
    const { files: [file] } = await parser.parse(event);
    
    if (!file || file.fieldname !== 'file') {
        return response(400, {
            error: "file is required."
        });
    }

    if (file.contentType !== 'image/png' ) {
        return response(400, {
            error: "file is required."
        });
    }

    const s3Client = new S3Client({
        region: "us-east-1"
    });
    const command = new PutObjectCommand({
        Bucket: "images-backup-r",
        Key: `uploads/${crypto.randomUUID()}-${file.filename}`,
        Body: file.content
    });

    const s3Response = await s3Client.send(command);

    return response(200, s3Response.Body);
}