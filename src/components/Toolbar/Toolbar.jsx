import React from 'react';
import './Toolbar.css';

const Toolbar = ({ fileName, onFileChange }) => {
  // Handles file upload and reads its content
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Retrieve the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Pass the file name and content to the parent component
        onFileChange(file.name, reader.result);
      };
      reader.readAsText(file); // Read the file content as text
    }
  };

  return (
    <header className="toolbar">
      {/* Application Title */}
      <h1>Shape Viewer</h1>
      
      {/* Toolbar actions: Display file name or upload button */}
      <div className="toolbar-actions">
        {fileName ? (
          // Display the currently opened file name
          <span className="file-name">{fileName}</span>
        ) : (
          <>
            {/* Hidden file input triggered by label */}
            <input
              type="file"
              id="fileInputToolbar"
              accept=".shapefile" // Restrict file type to .shapefile
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            {/* Label styled as a button to trigger file input */}
            <label htmlFor="fileInputToolbar" className="upload-button">
              <i className="fas fa-folder-open"></i> Open Shape File
            </label>
          </>
        )}
      </div>
    </header>
  );
};

export default Toolbar;
