import axios from "axios";

// Helper function to convert URI to Blob (Required for S3 Upload)
const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

// Function to Upload File to AWS S3
const uploadFileToS3 = async (file) => {
  try {
    if (!file || !file.uri) {
      console.error("❌ No file selected");
      return null;
    }

    // Extract file extension and type
    const fileExtension = file.name?.split(".").pop() || "jpg";
    const fileType = file.mimeType || `application/${fileExtension}`;

    // Step 1: Get pre-signed S3 URL from Flask API
    const s3UrlResponse = await axios.post(
      "http://192.168.105.118:4000/generate-upload-url",
      { imgExtension: fileExtension }
    );

    if (!s3UrlResponse.data.url) {
      console.error("❌ Failed to get S3 URL");
      return null;
    }

    const s3UploadUrl = s3UrlResponse.data.url;

    // Step 2: Convert the file to Blob
    const fileBlob = await uriToBlob(file.uri);

    // Step 3: Upload to S3 using fetch
    const response = await fetch(s3UploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": fileType,
      },
      body: fileBlob,
    });

    if (response.status !== 200) {
      console.error("❌ Upload failed:", response.status);
      return null;
    }

    return s3UploadUrl.split("?")[0]; // Remove query params from URL
  } catch (error) {
    console.error("❌ Error uploading file to S3:", error);
    return null;
  }
};

export default uploadFileToS3;
