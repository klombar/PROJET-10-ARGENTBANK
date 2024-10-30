import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  const mockOnChange = jest.fn();

  test('renders with correct label and checked state', () => {
    render(<Checkbox label="Remember Me" checked={true} onChange={mockOnChange} />);
    
    // Vérifie si le label est affiché correctement
    const labelElement = screen.getByText(/remember me/i);
    expect(labelElement).toBeInTheDocument();
    
    // Vérifie si la checkbox est cochée
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked();
  });

  test('calls onChange function when clicked', () => {
    render(<Checkbox label="Remember Me" checked={false} onChange={mockOnChange} />);

    const checkboxElement = screen.getByRole('checkbox');
    // Simule un clic sur la checkbox
    fireEvent.click(checkboxElement);
    
    // Vérifie si la fonction onChange a été appelée
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});