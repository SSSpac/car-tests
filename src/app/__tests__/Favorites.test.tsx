import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from './Favorites';
import { mockCars } from '../../types/Car';

describe('Favorites Component', () => {
  test('renders favorite cars', () => {
    render(
      <Favorites 
        favoriteCars={mockCars} 
        onSelectCar={jest.fn()} 
        onRemoveFavorite={jest.fn()} 
      />
    );
    
    mockCars.forEach(car => {
      expect(screen.getByText(`${car.make} ${car.model}`)).toBeInTheDocument();
    });
    
    const removeButtons = screen.getAllByText('Remove from Favorites');
    expect(removeButtons).toHaveLength(mockCars.length);
  });

  test('shows empty message when no favorites', () => {
    render(
      <Favorites 
        favoriteCars={[]} 
        onSelectCar={jest.fn()} 
        onRemoveFavorite={jest.fn()} 
      />
    );
    
    expect(screen.getByText('No favorite cars')).toBeInTheDocument();
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
  });

  test('handles car selection', () => {
    const mockSelectCar = jest.fn();
    render(
      <Favorites 
        favoriteCars={mockCars} 
        onSelectCar={mockSelectCar} 
        onRemoveFavorite={jest.fn()} 
      />
    );
    
    const firstCar = screen.getByText(`${mockCars[0].make} ${mockCars[0].model}`);
    fireEvent.click(firstCar);
    
    expect(mockSelectCar).toHaveBeenCalledWith(mockCars[0]);
  });

  test('handles remove from favorites', () => {
    const mockRemoveFavorite = jest.fn();
    render(
      <Favorites 
        favoriteCars={mockCars} 
        onSelectCar={jest.fn()} 
        onRemoveFavorite={mockRemoveFavorite} 
      />
    );
    
    const removeButtons = screen.getAllByText('Remove from Favorites');
    fireEvent.click(removeButtons[0]);
    
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCars[0].id);
  });
});