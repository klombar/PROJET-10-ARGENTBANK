import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './Banner';

describe('Banner Component', () => {
  const imageUrl = 'https://example.com/image.jpg';

  test('renders without crashing', () => {
    render(<Banner image={imageUrl} />);
    expect(screen.getByAltText('Argent Bank')).toBeInTheDocument();
  });

  test('displays the correct image', () => {
    render(<Banner image={imageUrl} />);
    const imgElement = screen.getByAltText('Argent Bank');
    expect(imgElement).toHaveAttribute('src', imageUrl);
  });

  test('contains the expected text', () => {
    render(<Banner image={imageUrl} />);
    expect(screen.getByText('No fees.')).toBeInTheDocument();
    expect(screen.getByText('No minimum deposit.')).toBeInTheDocument();
    expect(screen.getByText('High interest rates.')).toBeInTheDocument();
    expect(screen.getByText('Open a savings account with Argent Bank today!')).toBeInTheDocument();
  });
});