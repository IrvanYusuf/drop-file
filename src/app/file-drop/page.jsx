'use client';
import { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useHandleDropFile } from 'src/hooks/use-on-drop-file';

export default function DragAndDropPage() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const modelTypes = ['stl', 'glb'];

  const handleDropFile = useHandleDropFile(modelTypes, setFiles, files, false);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: handleDropFile,
  });

  console.log(files);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFiles = localStorage.getItem('files');
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
    }
  }, []);
  return (
    <div
      style={{
        border: '2px dashed #ccc',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      {files.length > 0 ? (
        <div>
          <ul>
            {files.map((file, i) => (
              <li key={i}>
                {file.file.name}{' '}
                <button onClick={() => removeFile(i)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <input
          {...getInputProps()}
          ref={fileInputRef}
          type="file"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}
