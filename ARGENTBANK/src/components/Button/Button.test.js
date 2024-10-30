import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn(); // Fonction mock pour simuler un événement click
  const buttonValue = 'Click Me'; // Valeur à afficher sur le bouton
  const buttonClass = 'btn-primary'; // Classe CSS à appliquer au bouton

  // Test 1 : Vérifie que le composant se rend sans erreur
  test('renders without crashing', () => {
    render(<Button value={buttonValue} onClick={mockOnClick} className={buttonClass} />); // Rendu du composant
    const buttonElement = screen.getByDisplayValue(buttonValue); // Récupère l'élément bouton par sa valeur
    // Vérifie que le bouton est présent dans le document
    expect(buttonElement).toBeInTheDocument();
  });

  // Test 2 : Vérifie que la valeur affichée est correcte
  test('displays the correct value', () => {
    render(<Button value={buttonValue} onClick={mockOnClick} className={buttonClass} />); // Rendu du composant
    const buttonElement = screen.getByDisplayValue(buttonValue); // Récupère l'élément bouton
    // Vérifie que l'attribut value du bouton correspond à la valeur fournie
    expect(buttonElement).toHaveAttribute('value', buttonValue);
  });

  // Test 3 : Vérifie que la classe CSS est appliquée correctement
  test('applies the correct className', () => {
    render(<Button value={buttonValue} onClick={mockOnClick} className={buttonClass} />); // Rendu du composant
    const buttonElement = screen.getByDisplayValue(buttonValue); // Récupère l'élément bouton
    // Vérifie que le bouton a la classe CSS spécifiée
    expect(buttonElement).toHaveClass(buttonClass);
  });

  // Test 4 : Vérifie que la fonction onClick est appelée lors d'un clic
  test('calls onClick when clicked', () => {
    render(<Button value={buttonValue} onClick={mockOnClick} className={buttonClass} />); // Rendu du composant
    const buttonElement = screen.getByDisplayValue(buttonValue); // Récupère l'élément bouton
    fireEvent.click(buttonElement); // Simule un clic sur le bouton
    // Vérifie que la fonction mockOnClick a été appelée une fois
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});