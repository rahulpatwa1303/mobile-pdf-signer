import { useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) {
      onFileSelect(fileUploaded);
    }
  };

  return (
    <div className="uploader-container">
      <div className="upload-card">
        <h2>Upload your PDF</h2>
        <p>Tap below to select a document from your device.</p>
        
        <button className="btn-primary" onClick={handleClick}>
          Select PDF
        </button>
        
        <input
          type="file"
          accept="application/pdf"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }} 
        />
      </div>
    </div>
  );
}