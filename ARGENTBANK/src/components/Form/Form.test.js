import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';

describe('Form Component', () => {
  const mockHandleSubmit = jest.fn();
  const className = 'test-form-class';

  test('renders without crashing', () => {
    render(<Form handleSubmit={mockHandleSubmit} className={className}><input type="text" /></Form>);
    
    // Vérifie que le formulaire est présent
    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <Form handleSubmit={mockHandleSubmit} className={className}>
        <input type="text" placeholder="Test input" />
      </Form>
    );

    // Vérifie que l'input enfant est présent
    const inputElement = screen.getByPlaceholderText('Test input');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls handleSubmit on form submission', () => {
    render(
      <Form handleSubmit={mockHandleSubmit} className={className}>
        <input type="text" placeholder="Test input" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Simule la soumission du formulaire
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test('applies the correct className', () => {
    render(<Form handleSubmit={mockHandleSubmit} className={className}><input type="text" /></Form>);
    
    // Vérifie que le formulaire a la bonne classe CSS
    const formElement = screen.getByTestId('form');
    expect(formElement).toHaveClass(className);
  });
});