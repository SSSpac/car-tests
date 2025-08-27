import { render, screen, fireEvent } from '@testing-library/react';
import CarDetail from './CarDetail'; 
import { mockCars } from '../../types/Car';
import '@testing-library/jest-dom';

describe('CarDetail Component', () => {
  test('renders car details correctly', () => {
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={jest.fn()} 
        onToggleFavorite={jest.fn()}
        isFavorite={false}
      />
    );
    
   expect(screen.getByText(/toyota/i)).toBeInTheDocument();
  expect(screen.getByText(/camry/i)).toBeInTheDocument();
  expect(screen.getByText(/\$7,800/)).toBeInTheDocument();
  expect(screen.getByText(/reliable midsize sedan/i)).toBeInTheDocument();
  
  expect(screen.getByText(/Year: 2040/)).toBeInTheDocument();
  mockCars[0].features.forEach(feature => {
    expect(screen.getByText(feature)).toBeInTheDocument();
  });
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={mockOnClose}
        onToggleFavorite={jest.fn()}
        isFavorite={false}
      />
    );
    
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onToggleFavorite when favorite button is clicked', () => {
    const mockOnToggleFavorite = jest.fn();
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={jest.fn()}
        onToggleFavorite={mockOnToggleFavorite}
        isFavorite={false}
      />
    );
    
    const favoriteButton = screen.getByText('Add Favorite');
    fireEvent.click(favoriteButton);
    
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockCars[0].id);
  });

  test('shows remove favorite when isFavorite is true', () => {
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={jest.fn()}
        onToggleFavorite={jest.fn()}
        isFavorite={true}
      />
    );
    
    expect(screen.getByText('Remove Favorite')).toBeInTheDocument();
  });

  test('shows add favorite when isFavorite is false', () => {
    render(
      <CarDetail 
        car={mockCars[0]} 
        onClose={jest.fn()}
        onToggleFavorite={jest.fn()}
        isFavorite={false}
      />
    );
    
    expect(screen.getByText('Add Favorite')).toBeInTheDocument();
  });
});