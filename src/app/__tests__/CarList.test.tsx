import { render, screen } from '@testing-library/react';
import CarList from './CarList';
import { mockCars } from '../../types/Car';

describe('CarList Component', () => {
  test('renders car makes and models', () => {
    render(
      <CarList 
        cars={mockCars} 
        onSelectCar={jest.fn()}
        onToggleFavorite={jest.fn()}
        favoriteCars={[]}
      />
    );
    
    
    });
  });

  test('renders empty when no cars', () => {
    render(
      <CarList 
        cars={[]} 
        onSelectCar={jest.fn()}
        onToggleFavorite={jest.fn()}
        favoriteCars={[]}
      />
    );
    
    const carElements = screen.queryByText(/Year:/);
  });
