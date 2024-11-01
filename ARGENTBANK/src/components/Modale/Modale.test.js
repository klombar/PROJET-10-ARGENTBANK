import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Modale from './Modale';

const mockStore = configureStore([]);

describe('Modale Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ auth: {} }); // Créer un mock store
  });

  test('renders Modale component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modale />
        </MemoryRouter>
      </Provider>
    );

    // Vérifie qu'il y a au moins un "Sign In"
    const signInElements = screen.getAllByText(/Sign In/i);
    expect(signInElements.length).toBeGreaterThan(0); 

    // Vérifie la présence des champs
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Remember Me/i)).toBeInTheDocument();
  });

  test('changes email input value', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modale />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com'); // Vérifie que la valeur a changé
  });

  test('changes password input value', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modale />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123'); 
  });

  test('toggles Remember Me checkbox', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modale />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText(/Remember Me/i);
    fireEvent.click(checkbox);
    
    expect(checkbox.checked).toBe(true); 
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false); // Vérifie que la case est décochée
  });
});