'use client';
import { useState } from 'react';

export default function DragAndDropPage() {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    setErrorMessage('');

    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length === 0) {
      setErrorMessage('No files dropped. Please try again.');
      return;
    }

    const newFiles = [];

    droppedFiles.forEach((droppedFile) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
        localStorage.setItem(`uploadedFile-${droppedFile.name}`, fileData);
        newFiles.push({ name: droppedFile.name, data: fileData });

        // Ensure state is updated after all files are processed
        if (newFiles.length === droppedFiles.length) {
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
      };

      reader.onerror = () => {
        setErrorMessage(`Error reading the file: ${droppedFile.name}`);
      };

      reader.readAsDataURL(droppedFile);
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (fileName) => {
    localStorage.removeItem(`uploadedFile-${fileName}`);
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div
      style={{
        border: '2px dashed #ccc',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {files.length > 0 ? (
        <div>
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                {file.name}{' '}
                <button onClick={() => removeFile(file.name)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Drag and drop files here or click to upload.</p>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
