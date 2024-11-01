import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

jest.mock('../../components/Logo/Logo.jsx', () => () => <div>Mocked Logo</div>);
jest.mock('../../components/Nav/Nav.jsx', () => () => <nav>Mocked Nav</nav>);

describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the Logo component', () => {
    render(<Header />);
    const logoElement = screen.getByText('Mocked Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders the Nav component', () => {
    render(<Header />);
    const navElement = screen.getByText('Mocked Nav');
    expect(navElement).toBeInTheDocument();
  });
});