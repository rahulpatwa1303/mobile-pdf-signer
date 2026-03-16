import { jest } from '@jest/globals';
global.jest = jest;

import '@testing-library/jest-dom';

if (typeof window !== 'undefined' && typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = () => 'blob:http://localhost/';
}

class DOMMatrixMock {
  a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
}
if (typeof global !== 'undefined' && typeof (global as any).DOMMatrix === 'undefined') {
  (global as any).DOMMatrix = DOMMatrixMock;
}

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof global !== 'undefined' && typeof (global as any).ResizeObserver === 'undefined') {
  (global as any).ResizeObserver = ResizeObserverMock;
}
