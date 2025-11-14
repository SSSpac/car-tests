import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';
import { FavoritesProvider } from '@/components/Favorites/FavoritesContext';
import '@testing-library/jest-dom';

describe('Main Page - Basic Tests', () => {
  test('renders page without crashing', () => {
    render(
      <FavoritesProvider>
        <Page />
      </FavoritesProvider>
    );
    
    expect(screen.getByText('Available Cars')).toBeInTheDocument();
  });

  test('renders car list component with cars', () => {
    render(
      <FavoritesProvider>
        <Page />
      </FavoritesProvider>
    );
    
    const carList = screen.getByTestId('car-list');
    expect(carList).toBeInTheDocument();
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
  });

  test('renders header component', () => {
    render(
      <FavoritesProvider>
        <Page />
      </FavoritesProvider>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('initially shows all cars as not favorited', () => {
    render(
      <FavoritesProvider>
        <Page />
      </FavoritesProvider>
    );
    
    const addButtons = screen.getAllByText('Add to Favorites');
    expect(addButtons.length).toBeGreaterThan(0);
    
    expect(screen.queryByText('Remove from Favorites')).not.toBeInTheDocument();
  });
});