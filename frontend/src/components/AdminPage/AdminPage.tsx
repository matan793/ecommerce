import { useState } from 'react';
import { apiClient } from '../../api/api';

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setImageUrl(res.data.url);
    } catch (error) {
        console.error('Upload failed:', error);
    }
};

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: 200, marginTop: 10 }} />}
    </div>
  );
}
