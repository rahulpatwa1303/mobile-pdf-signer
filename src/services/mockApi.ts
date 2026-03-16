/**
 * Simulates uploading a PDF to a server, signing it, and returning the result.
 */
export const signDocumentMock = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // 1. Check if the file is actually a PDF
    if (file.type !== 'application/pdf') {
      return reject(new Error("Invalid file type. Please upload a PDF."));
    }

    // 2. Simulate network delay (e.g., 2.5 seconds)
    setTimeout(() => {
      // 3. In a real app, the server returns a URL to the signed PDF.
      // For this mock, we will just return the original file to simulate success.
      resolve(file);
    }, 2500);
  });
};