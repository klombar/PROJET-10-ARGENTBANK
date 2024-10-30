import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from './Features';

describe('Features Component', () => {
  const icon = 'https://example.com/icon.png';
  const title = 'Feature Title';
  const text = 'Feature description goes here.';

  test('renders without crashing', () => {
    render(<Features icon={icon} title={title} text={text} />);
    
    // Vérifie que le titre est affiché
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(title);
    
    // Vérifie que le texte de la description est affiché
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('displays the correct icon', () => {
    render(<Features icon={icon} title={title} text={text} />);
    
    // Vérifie que l'icône est présente et a la bonne source
    const imgElement = screen.getByAltText('icon features home');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', icon);
  });
});