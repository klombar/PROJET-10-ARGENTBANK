import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  test('renders without crashing', () => {
    render(<Dropdown options={options} />);
    const iconElement = screen.getByTestId('dropdown-icon'); // Utilise data-testid
    expect(iconElement).toBeInTheDocument(); // Vérifie que l'icône est présente
  });

  test('toggles dropdown menu on icon click', () => {
    render(<Dropdown options={options} />);
    
    const iconElement = screen.getByTestId('dropdown-icon');
    
    // Vérifie que le menu déroulant n'est pas visible au départ
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    // Simule un clic sur l'icône pour ouvrir le menu
    fireEvent.click(iconElement);

    // Vérifie que le menu est maintenant visible
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    // Simule un autre clic pour fermer le menu
    fireEvent.click(iconElement);

    // Vérifie que le menu est à nouveau caché
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('displays the correct options', () => {
    render(<Dropdown options={options} />);
    
    const iconElement = screen.getByTestId('dropdown-icon');
    fireEvent.click(iconElement); // Ouvre le menu

    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument(); // Vérifie que chaque option est affichée
    });
  });
});