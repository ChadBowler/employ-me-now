import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';

const UPLOAD_RESUME = gql`
  mutation uploadResume($file: Upload!) {
    uploadResume(file: $file) {
      filename
      path
    }
  }
`;

function ResumeUpload() {
  const [uploadResume] = useMutation(UPLOAD_RESUME);
  const [file, setFile] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    try {
      const { data } = await uploadResume({
        variables: { file: uploadedFile },
      });

      console.log('File uploaded:', data.uploadResume);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUploadClick = async () => {
    if (file) {
      try {
        const { data } = await uploadResume({
          variables: { file },
        });

        console.log('File uploaded:', data.uploadResume);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.warn('No file selected.');
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop your resume here, or click to select a file</p>
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default ResumeUpload;
