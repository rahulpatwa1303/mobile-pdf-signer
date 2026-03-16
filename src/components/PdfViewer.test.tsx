import { render, screen } from '@testing-library/react';
import PdfViewer from './PdfViewer';

// Mock the react-pdf Document and Page to avoid canvas/worker issues in jsdom
jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: { workerSrc: '' }
  },
  Document: ({ children, onLoadSuccess }: any) => {
    // Simulate immediate load success
    setTimeout(() => onLoadSuccess?.({ numPages: 1 }), 0);
    return <div>{children}</div>;
  },
  Page: () => <div>Mocked Page</div>
}));

describe('PdfViewer Component', () => {
  it('renders viewer with a file', async () => {
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const handleReset = jest.fn();

    render(<PdfViewer file={file} onReset={handleReset} />);
    
    // Check if the successful close button / badge exists
    expect(await screen.findByText('Signed')).toBeInTheDocument();
  });
});
