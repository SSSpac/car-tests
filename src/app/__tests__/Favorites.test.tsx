import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from '@/components/Favorites/Favorites';
import { mockCars } from '@/data/Car';
import '@testing-library/jest-dom';

describe('Favorites Component - Unit Tests', () => {
  const mockOnSelectCar = jest.fn();
  const mockOnRemoveFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no favorites', () => {
    render(
      <Favorites 
        favoriteCars={[]} 
        onSelectCar={mockOnSelectCar} 
        onRemoveFavorite={mockOnRemoveFavorite} 
      />
    );
    
    expect(screen.getByTestId('empty-favorites')).toBeInTheDocument();
    expect(screen.getByText('No favorite cars')).toBeInTheDocument();
    expect(screen.queryByText('Remove from Favorites')).not.toBeInTheDocument();
  });

  test('renders all favorite cars with complete information', () => {
    render(
      <Favorites 
        favoriteCars={mockCars} 
        onSelectCar={mockOnSelectCar} 
        onRemoveFavorite={mockOnRemoveFavorite} 
      />
    );
    
    mockCars.forEach(car => {
      expect(screen.getByText(`${car.make} ${car.model}`)).toBeInTheDocument();
      expect(screen.getByText(`Year: ${car.year}`)).toBeInTheDocument();
      expect(screen.getByTestId(`favorite-car-${car.id}`)).toBeInTheDocument();
    });
    
    const removeButtons = screen.getAllByText('Remove from Favorites');
    expect(removeButtons).toHaveLength(mockCars.length);
  });

  test('clicking remove button does not trigger car selection', () => {
    render(
      <Favorites 
        favoriteCars={[mockCars[0]]} 
        onSelectCar={mockOnSelectCar} 
        onRemoveFavorite={mockOnRemoveFavorite} 
      />
    );
    
    const removeButton = screen.getByText('Remove from Favorites');
    fireEvent.click(removeButton);
    
    expect(mockOnSelectCar).not.toHaveBeenCalled();
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith(mockCars[0].id);
  });

  test('supports keyboard navigation on car cards', () => {
    render(
      <Favorites 
        favoriteCars={[mockCars[0]]} 
        onSelectCar={mockOnSelectCar} 
        onRemoveFavorite={mockOnRemoveFavorite} 
      />
    );
    
    const carCard = screen.getByRole('button', { name: '' });
    
    fireEvent.keyDown(carCard, { key: 'Enter' });
    expect(mockOnSelectCar).toHaveBeenCalledWith(mockCars[0]);
    
    fireEvent.keyDown(carCard, { key: ' ' });
    expect(mockOnSelectCar).toHaveBeenCalledTimes(2);
  });
});