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

## System Design

The application follows a client-heavy web architecture to prioritize data privacy and reduce server overhead. 

### Core Architecture

1. **Client-Side Processing Strategy**
   - **Privacy First**: PDF documents are loaded entirely into browser memory and are **never** uploaded to an external server. The `services/mockApi.ts` simulates network requests to maintain UI flow without risking data exfiltration.
   - **Web Workers**: PDF parsing and rendering are offloaded to dedicated Web Workers via `pdfjs-dist` to prevent blocking the main JS thread and ensuring UI animations (like spinners or page swipes) remain 60FPS.

2. **Component Interactions**
   - `App.tsx` acts as the global state manager, dictating the flow between three distinct application phases:
     1. **Idle/Upload**: Handled by `FileUploader.tsx`. Uses HTML5 File API and hidden native inputs.
     2. **Processing/Loading**: Handled by `Loader.tsx`. Simulates asynchronous network calls or cryptographic signing processes.
     3. **Viewing Frame**: Handled by `PdfViewer.tsx`. 

3. **Rendering & Interaction Engine**
   - **Canvas Overlay**: Pages are rendered via HTML5 `<canvas>` inside `react-pdf`, dropping text layers to prioritize visual accuracy and rendering speed on underpowered mobile devices.
   - **Gesture Recognition**: `react-zoom-pan-pinch` wraps the canvas engine, exposing imperative controls (Zoom In, Zoom Out, Reset) alongside passive mobile gesture handling (pinch mechanics).
   - **Local State Paging**: Custom `onTouchStart` and `onTouchEnd` swipe heuristics are bound directly to the viewport wrapper, calculating delta X-axis distances to trigger page increments without utilizing heavy third-party routing or slider libraries.