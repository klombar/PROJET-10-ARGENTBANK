// InputField.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField'; // Ajuste le chemin d'importation si nécessaire

describe('InputField Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <InputField
        label="Test Label"
        type="text"
        value="Test Value"
        onChange={mockOnChange}
        className="input-class"
        disabled={false}
      />
    );
  });

  test('renders without crashing', () => {
    expect(screen.getByTestId('input-field')).toBeInTheDocument();
  });

  test('displays the correct value', () => {
    const input = screen.getByTestId('input-field');
    expect(input).toHaveValue('Test Value');
  });

  test('calls onChange when input value changes', () => {
    const input = screen.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('is disabled when disabled prop is true', () => {
    render(
      <InputField
        label="Test Label"
        type="text"
        value="Test Value"
        onChange={mockOnChange}
        className="input-class"
        disabled={true}
      />
    );
  });
});