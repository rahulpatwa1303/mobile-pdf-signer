import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  it('renders correctly', () => {
    render(<Loader />);
    expect(screen.getByText('Signing document...')).toBeInTheDocument();
  });
});
