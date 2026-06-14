import React, { useState } from 'react';
import styled from 'styled-components';
import { uploadImage } from '../../hooks/useApi';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #b1b2b3;
  font-size: 13px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const UrlInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 12px;
  background: #1C1C27;
  border: 1px solid #444;
  border-radius: 8px;
  color: #F2F3F4;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #854CE6; }
`;

const FileButton = styled.label`
  padding: 10px 14px;
  background: #854CE6;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #6b3bbf; }
`;

const Preview = styled.img`
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #444;
`;

const Status = styled.span`
  font-size: 12px;
  color: ${({ error }) => (error ? '#ff6b6b' : '#b1b2b3')};
`;

const ImageUpload = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const token = localStorage.getItem('admin_token');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const { url } = await uploadImage(file, token);
      onChange(url);
    } catch (err) {
      setUploadError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Row>
        <UrlInput
          type="text"
          placeholder="Paste image URL or upload a file"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <FileButton>
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} disabled={uploading} />
        </FileButton>
        {value && <Preview src={value} alt="preview" />}
      </Row>
      {uploadError && <Status error>{uploadError}</Status>}
    </Wrapper>
  );
};

export default ImageUpload;
