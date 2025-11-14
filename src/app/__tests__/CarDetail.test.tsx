import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarDetail from '@/components/CarDetail/CarDetail';
import { mockCars } from '@/data/Car';
import '@testing-library/jest-dom';

describe('CarDetail Component - Unit Tests', () => {
  const mockOnClose = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with all car information and features', () => {
    const testCar = mockCars[0];
    render(
      <CarDetail 
        car={testCar} 
        onClose={mockOnClose} 
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    
    expect(screen.getByText(`${testCar.make} ${testCar.model}`)).toBeInTheDocument();
    expect(screen.getByText(`Year: ${testCar.year}`)).toBeInTheDocument();
    expect(screen.getByText(testCar.description)).toBeInTheDocument();
    
    testCar.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('shows correct favorite button based on isFavorite prop', () => {
    const { rerender } = render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={mockOnClose}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );
    
    expect(screen.getByRole('button', { name: /add favorite/i })).toBeInTheDocument();
    
    rerender(
      <CarDetail 
        car={mockCars[0]} 
        onClose={mockOnClose}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={true}
      />
    );
    
    expect(screen.getByRole('button', { name: /remove favorite/i })).toBeInTheDocument();
  });

  test('closes modal using both close methods', () => {
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={mockOnClose}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );
    
    const closeX = screen.getByLabelText('Close car details');
    fireEvent.click(closeX);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    const closeButtons = screen.getAllByRole('button', { name: /close/i });
    const closeButton = closeButtons.find(btn => btn.textContent === 'Close');
    fireEvent.click(closeButton!);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  test('calls onToggleFavorite with correct car id when favorite button clicked', () => {
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={mockOnClose}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );
    
    const favoriteButton = screen.getByRole('button', { name: /add favorite/i });
    fireEvent.click(favoriteButton);
    
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockCars[0].id);
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
  });
});