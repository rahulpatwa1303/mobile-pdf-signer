import { useState } from 'react';
import { signDocumentMock } from './services/mockApi';
import './App.css';
import FileUploader from './components/FileUploader';
import Loader from './components/Loader';
import PdfViewer from './components/PdfViewer';

// 1. Define strict types for our application state
type AppState = 'idle' | 'signing' | 'viewing' | 'error';

function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    try {
      setAppState('signing');
      setErrorMessage('');
      const signedPdf = await signDocumentMock(file);
      setPdfFile(signedPdf);
      setAppState('viewing');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setAppState('error');
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setAppState('idle');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mobile Signer</h1>
      </header>

      <main className="app-main">
        {appState === 'idle' && (
           <FileUploader onFileSelect={handleFileUpload} />
        )}

        {appState === 'signing' && (
          <Loader />
        )}

        {appState === 'viewing' && pdfFile && (
          <PdfViewer file={pdfFile} onReset={handleReset} />
        )}

        {appState === 'error' && (
          <div className="error-container">
            <p className="error-text">{errorMessage}</p>
            <button onClick={handleReset} className="btn-secondary">Try Again</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;