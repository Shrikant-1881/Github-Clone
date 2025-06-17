// const fs = require("fs").promises;
// const path = require("path");
// const { s3, S3_BUCKET } = require("../config/aws-config");

// async function pushRepo() {
//   const repoPath = path.resolve(process.cwd(), ".apnaGit");
//   const commitsPath = path.join(repoPath, "commits");

//   try {
//     const commitDirs = await fs.readdir(commitsPath);
//     for (const commitDir of commitDirs) {
//       const commitPath = path.join(commitsPath, commitDir);
//       const files = await fs.readdir(commitPath);

//       for (const file of files) {
//         const filePath = path.join(commitPath, file);
//         const fileContent = await fs.readFile(filePath);
//         const params = {
//           Bucket: S3_BUCKET,
//           Key: `commits/${commitDir}/${file}`,
//           Body: fileContent,
//         };

//         await s3.upload(params).promise();
//       }
//     }
//     console.log("All commits pushed to S3");
//   } catch (err) {
//     console.error("Error pushing to S3 : ", err);
//   }
// }

// module.exports = { pushRepo };

const fs = require("fs").promises;
const path = require("path");
const { PutObjectCommand } = require("@aws-sdk/client-s3"); // Import necessary components
const { s3, S3_BUCKET } = require("../config/aws-config");

// Ensure that the S3 client is initialized with the region
// const s3 = new S3Client({ region: "eu-north-1" });
// const S3_BUCKET = "myapnacollegebucket";

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        // const fileContent = await fs.readFile(filePath);
        const uploadStream = await fs.readFile(filePath);

        // Create the PutObjectCommand with necessary parameters
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: uploadStream,
        };

        // Upload file using PutObjectCommand
        const command = new PutObjectCommand(params);
        await s3.send(command); // Send the command to upload the file
      }
    }
    console.log("All commits pushed to S3");
  } catch (err) {
    console.error("Error pushing to S3 : ", err);
  }
}

module.exports = { pushRepo };
