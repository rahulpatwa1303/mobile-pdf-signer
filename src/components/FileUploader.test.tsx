import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploader from './FileUploader';

describe('FileUploader Component', () => {
  it('renders correctly', () => {
    render(<FileUploader onFileSelect={jest.fn()} />);
    expect(screen.getByText('Upload your PDF')).toBeInTheDocument();
    expect(screen.getByText('Select PDF')).toBeInTheDocument();
  });

  it('calls onFileSelect when a file is chosen', async () => {
    const handleFileSelect = jest.fn();
    render(<FileUploader onFileSelect={handleFileSelect} />);
    
    // Create a mock generic file
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });
    
    // Find the hidden input
    // The querySelector is needed since the input has display: none and might not be easily accessible via standard roles
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    await userEvent.upload(input, file);
    
    expect(handleFileSelect).toHaveBeenCalledTimes(1);
    expect(handleFileSelect).toHaveBeenCalledWith(file);
  });
});
