import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from './Banner.jsx';

describe('Banner Component', () => {
  const imageUrl = 'https://example.com/image.jpg'; // URL de l'image à tester

  // Test 1 : Vérifie que le composant se rend sans erreur
  test('renders without crashing', () => {
    render(<Banner image={imageUrl} />); // Rendu du composant avec l'image
    // Vérifie que l'élément image avec l'attribut alt "Argent Bank" est présent dans le document
    expect(screen.getByAltText('Argent Bank')).toBeInTheDocument();
  });

  // Test 2 : Vérifie que l'image affichée est correcte
  test('displays the correct image', () => {
    render(<Banner image={imageUrl} />); // Rendu du composant avec l'image
    const imgElement = screen.getByAltText('Argent Bank'); // Récupère l'élément image par son attribut alt
    // Vérifie que l'élément image a l'attribut src qui correspond à l'URL fournie
    expect(imgElement).toHaveAttribute('src', imageUrl);
  });

  // Test 3 : Vérifie que le texte attendu est affiché
  test('contains the expected text', () => {
    render(<Banner image={imageUrl} />); // Rendu du composant avec l'image
    // Vérifie que plusieurs phrases sont présentes dans le document
    expect(screen.getByText('No fees.')).toBeInTheDocument();
    expect(screen.getByText('No minimum deposit.')).toBeInTheDocument();
    expect(screen.getByText('High interest rates.')).toBeInTheDocument();
    expect(screen.getByText('Open a savings account with Argent Bank today!')).toBeInTheDocument();
  });
});