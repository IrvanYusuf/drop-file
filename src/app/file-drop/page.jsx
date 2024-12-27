'use client';
import { useState, useEffect } from 'react';

export default function DragAndDropPage() {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Load files from localStorage when component mounts
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setFiles(storedFiles);
  }, []);

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
        const fileInfo = { name: droppedFile.name, data: fileData };
        
        // Save file info to localStorage
        const updatedFiles = [...files, fileInfo];
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

        newFiles.push(fileInfo);

        // Update state after processing all files
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
    const updatedFiles = files.filter((file) => file.name !== fileName);

    // Update files in localStorage after removal
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

    // Update state to reflect removal
    setFiles(updatedFiles);
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
