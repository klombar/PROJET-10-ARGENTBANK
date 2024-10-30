import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapse from './Collapse';

describe('Collapse Component', () => {
  const title = 'Test Title';
  const amount = '1000€';
  const subtitle = 'Test Subtitle';
  const date = '2024-01-01';
  const childrenContent = <div>Transaction Details</div>;

  // Test 1 : Vérifie que le composant se rend sans erreur
  test('renders without crashing', () => {
    render(
      <Collapse title={title} amount={amount} subtitle={subtitle} date={date}>
        {childrenContent}
      </Collapse>
    );
    // Vérifie que le titre est présent
    expect(screen.getByText(title)).toBeInTheDocument();
    // Vérifie que le montant est présent
    expect(screen.getByText(amount)).toBeInTheDocument();
    // Vérifie que le sous-titre est présent
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    // Vérifie que la date est présente
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  // Test 2 : Vérifie que les enfants sont cachés au départ
  test('does not display children initially', () => {
    render(
      <Collapse title={title} amount={amount} subtitle={subtitle} date={date}>
        {childrenContent}
      </Collapse>
    );
    // Vérifie que le contenu des enfants n'est pas présent au début
    expect(screen.queryByText('Transaction Details')).not.toBeInTheDocument();
  });

  // Test 3 : Vérifie que les enfants s'affichent après un clic sur le bouton
  test('displays children when button is clicked', () => {
    render(
      <Collapse title={title} amount={amount} subtitle={subtitle} date={date}>
        {childrenContent}
      </Collapse>
    );

    // Simule un clic sur le bouton
    fireEvent.click(screen.getByRole('button', { name: /View Transactions/i }));

    // Vérifie que le contenu des enfants est maintenant présent
    expect(screen.getByText('Transaction Details')).toBeInTheDocument();
  });

  // Test 4 : Vérifie que le texte du bouton change après le clic
  test('changes button text on click', () => {
      render(
        <Collapse title={title} amount={amount} subtitle={subtitle} date={date}>
          {childrenContent}
        </Collapse>
      );
  
      const button = screen.getByRole('button', { name: /View Transactions/i });
      expect(button).toBeInTheDocument(); // Vérifie que le bouton est au départ "View Transactions"
  
      // Simule un clic sur le bouton
      fireEvent.click(button);
  
      // Vérifie que le texte du bouton est maintenant "Cancel"
      const updatedButton = screen.getByRole('button', { name: /Cancel/i });
      expect(updatedButton).toBeInTheDocument(); // Vérifie que le texte est maintenant "Cancel"
  });

  // Test 5 : Vérifie que le contenu des enfants est caché à nouveau après un deuxième clic
  test('hides children when button is clicked again', () => {
    render(
      <Collapse title={title} amount={amount} subtitle={subtitle} date={date}>
        {childrenContent}
      </Collapse>
    );

    const button = screen.getByRole('button', { name: /View Transactions/i });

    // Simule un clic pour ouvrir
    fireEvent.click(button);
    expect(screen.getByText('Transaction Details')).toBeInTheDocument(); // Vérifie que le contenu est affiché

    // Simule un deuxième clic pour fermer
    fireEvent.click(button);
    expect(screen.queryByText('Transaction Details')).not.toBeInTheDocument(); // Vérifie que le contenu est caché
  });
});