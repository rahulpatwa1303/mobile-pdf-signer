import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const appElement = screen.getByText(/mobile signer/i);
    expect(appElement).toBeInTheDocument();
  });
});
