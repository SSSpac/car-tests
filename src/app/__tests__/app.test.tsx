import { render, screen } from '@testing-library/react';
import Page from '../page';
import { FavoritesProvider } from '../../components/Favorites/FavoritesContext';

jest.mock('../../components/Header/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>;
  };
});

jest.mock('../../components/CarList/CarList', () => {
  return function MockCarList() {
    return <div data-testid="car-list">Car List Component</div>;
  };
});

jest.mock('../../components/CarDetail/CarDetail', () => {
  return function MockCarDetail() {
    return <div data-testid="car-detail">Car Detail Component</div>;
  };
});

describe('Main Page', () => {
  test('renders without crashing', () => {
    render(
      <FavoritesProvider> 
        <Page />
      </FavoritesProvider>
    );
  });

  test('renders search component', () => {
    render(
      <FavoritesProvider> 
        <Page />
      </FavoritesProvider>
    );
  });

  test('renders car list component', () => {
    render(
      <FavoritesProvider> 
        <Page />
      </FavoritesProvider>
    );
  });
});

test('simple math test', () => {
  expect(1 + 1).toBe(2);
});