import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Logo from './Logo';

const unauthenticatedReducer = (state = { auth: { token: null } }) => state;

const authenticatedReducer = (state = { auth: { token: 'test-token' } }) => state;

describe('Logo Component', () => {
  test('renders the logo image correctly', () => {
    const store = configureStore({ reducer: { auth: unauthenticatedReducer } });

    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo logo="test-logo.png" />
        </MemoryRouter>
      </Provider>
    );

    const logoImage = getByAltText(/argent bank logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'test-logo.png');
  });

  test('renders the link to the dashboard when authenticated', () => {
    const store = configureStore({ reducer: { auth: authenticatedReducer } });

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo logo="test-logo.png" />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/dashboard'); 
  });
});