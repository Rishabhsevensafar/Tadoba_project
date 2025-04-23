import React, { useState } from "react";
import { Upload, Button, message, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

const AdminBannerUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleBeforeUpload = (file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error(`${file.name} is not a supported image type.`);
      return false;
    }

    const isLt4MB = file.size / 1024 / 1024 < 4;
    if (!isLt4MB) {
      message.error(`${file.name} must be smaller than 4MB.`);
      return false;
    }

    if (fileList.length >= 3) {
      message.warning("Only 3 images are allowed.");
      return false;
    }

    setFileList([...fileList, file]);
    return false; // prevent auto upload
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };

  const handleUpload = async () => {
    if (fileList.length !== 3) {
      message.warning("Please upload exactly 3 images.");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploading(true);
      await axios.post("http://localhost:5000/api/herosection/upload-banner", formData);
      message.success("Images uploaded successfully!");
      setFileList([]);
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card title="Homepage Banner Images Upload" bordered style={{ maxWidth: 600, margin: "auto" }}>
      <Title level={5}>Instructions:</Title>
      <Text type="secondary">
        Upload exactly <strong>3 images</strong> (JPEG/PNG). Each must be less than <strong>4MB</strong>.
      </Text>

      <Upload
        beforeUpload={handleBeforeUpload}
        fileList={fileList}
        onRemove={handleRemove}
        listType="picture"
        multiple
      >
        {fileList.length < 3 && (
          <Button icon={<UploadOutlined />} disabled={uploading}>
            Select Image
          </Button>
        )}
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        loading={uploading}
        style={{ marginTop: 16 }}
        disabled={fileList.length !== 3}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </Button>
    </Card>
  );
};

export default AdminBannerUpload;
