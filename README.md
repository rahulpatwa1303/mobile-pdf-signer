# Mobile PDF Signer

A React+TypeScript web application for viewing, navigating, and signing PDFs, optimized for mobile devices. Built using Vite for an ultra-fast development experience.

## Features

- **PDF Viewing**: Render and view PDF documents securely in the browser.
- **Mobile Optimized**: Designed for touch interactions including pinch-to-zoom and panning.
- **File Uploading**: Seamlessly browse or drag-and-drop PDF files.
- **Modern UI**: Clean and intuitive interface with scalable icons.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **PDF Rendering**: [react-pdf](https://github.com/wojtekmaj/react-pdf)
- **Zoom & Pan**: [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- **Icons**: [lucide-react](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mobile-pdf-signer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *or if you use yarn/pnpm: `yarn install` / `pnpm install`*

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will output the static files to the `dist` directory. You can preview the built app using:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── FileUploader.tsx    # Handles PDF file uploads
│   ├── Loader.tsx          # Loading state component
│   └── PdfViewer.tsx       # Main PDF rendering and interaction
├── services/               # API and external service integrations
├── assets/                 # Static assets (images, global css etc)
├── App.tsx                 # Main application root
└── main.tsx                # Entry point
```

## License

This project is open-source and available under the [MIT License](LICENSE).
