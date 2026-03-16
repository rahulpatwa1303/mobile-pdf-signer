import { useState, useRef, type TouchEvent, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { CheckCircle2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  file: File;
  onReset: () => void;
}

export default function PdfViewer({ file, onReset }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfWidth, setPdfWidth] = useState<number>(window.innerWidth);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setPdfWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent, currentScale: number) => {
    if (touchStartX.current === null || currentScale > 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (distance > 50 && pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
    } else if (distance < -50 && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
    touchStartX.current = null;
  };

  return (
    <div className="fullscreen-viewer">
      <div className="viewer-header">
        <div className="success-badge">
          <CheckCircle2 size={20} color="#10b981" />
          <span>Signed</span>
        </div>
        <button className="icon-close" onClick={onReset} aria-label="Close">
          <X size={24} />
        </button>
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, state }: any) => (
          <>
            <div 
              className="swipe-container"
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, state.scale)}
            >
              <TransformComponent wrapperStyle={{ width: '100vw', height: '100vh' }}>
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div className="loader-text" style={{ color: 'white' }}>Loading PDF...</div>}
                >
                  <Page 
                    pageNumber={pageNumber} 
                    width={pdfWidth > 800 ? 800 : pdfWidth} 
                    renderTextLayer={false} 
                    className="pdf-page-shadow"
                  />
                </Document>
              </TransformComponent>
            </div>

            <div className="control-dock">
              <div className="dock-group">
                <button 
                  className="dock-btn" 
                  onClick={() => setPageNumber(p => p - 1)} 
                  disabled={pageNumber <= 1}
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="dock-text">{pageNumber} / {numPages || '-'}</span>
                <button 
                  className="dock-btn" 
                  onClick={() => setPageNumber(p => p + 1)} 
                  disabled={pageNumber >= numPages}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="dock-divider"></div>

              <div className="dock-group">
                <button className="dock-btn" onClick={() => zoomOut()} disabled={state.scale <= 0.5}>
                  <ZoomOut size={20} />
                </button>
                
                <button 
                  className="dock-btn-text" 
                  onClick={() => resetTransform()}
                  title="Reset Zoom"
                >
                  {Math.round(state.scale * 100)}%
                </button>

                <button className="dock-btn" onClick={() => zoomIn()} disabled={state.scale >= 4}>
                  <ZoomIn size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}