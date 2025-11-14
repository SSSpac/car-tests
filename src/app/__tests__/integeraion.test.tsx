import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Page from '@/app/page';
import { FavoritesProvider } from '@/components/Favorites/FavoritesContext';
import { mockCars } from '@/data/Car';
import '@testing-library/jest-dom';

const renderApp = () => {
  return render(
    <FavoritesProvider>
      <Page />
    </FavoritesProvider>
  );
};

describe('App Integration Tests - Complete User Journeys', () => {
  test('Journey 1: Add car to favorites and verify state across list and modal', () => {
    renderApp();

    const firstCar = mockCars[0];
    const carItem = screen.getByTestId(`car-item-${firstCar.id}`);

    expect(within(carItem).getByText('Add to Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText('Add to Favorites'));

    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(carItem).queryByText('Add to Favorites')).not.toBeInTheDocument();

    fireEvent.click(within(carItem).getByText(`${firstCar.make} ${firstCar.model}`));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Remove Favorite')).toBeInTheDocument();
  });

  test('Journey 2: Remove car from favorites and verify state updates', () => {
    renderApp();

    const testCar = mockCars[1];
    const carItem = screen.getByTestId(`car-item-${testCar.id}`);

    fireEvent.click(within(carItem).getByText('Add to Favorites'));
    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText('Remove from Favorites'));

    expect(within(carItem).getByText('Add to Favorites')).toBeInTheDocument();
    expect(within(carItem).queryByText('Remove from Favorites')).not.toBeInTheDocument();
  });

  test('Journey 3: Add multiple cars and verify independent state management', () => {
    renderApp();

    const firstCarItem = screen.getByTestId(`car-item-${mockCars[0].id}`);
    const secondCarItem = screen.getByTestId(`car-item-${mockCars[1].id}`);
    const thirdCarItem = screen.getByTestId(`car-item-${mockCars[2].id}`);

    fireEvent.click(within(firstCarItem).getByText('Add to Favorites'));
    fireEvent.click(within(secondCarItem).getByText('Add to Favorites'));
    fireEvent.click(within(thirdCarItem).getByText('Add to Favorites'));

    expect(within(firstCarItem).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(secondCarItem).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(thirdCarItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(within(secondCarItem).getByText('Remove from Favorites'));

    expect(within(firstCarItem).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(secondCarItem).getByText('Add to Favorites')).toBeInTheDocument();
    expect(within(thirdCarItem).getByText('Remove from Favorites')).toBeInTheDocument();
  });

  test('Journey 4: Add to favorites from modal and verify list updates', () => {
    renderApp();

    const testCar = mockCars[0];
    const carItem = screen.getByTestId(`car-item-${testCar.id}`);

    fireEvent.click(within(carItem).getByText(`${testCar.make} ${testCar.model}`));
    const dialog = screen.getByRole('dialog');

    expect(within(dialog).getByText('Add Favorite')).toBeInTheDocument();
    fireEvent.click(within(dialog).getByText('Add Favorite'));

    expect(within(dialog).getByText('Remove Favorite')).toBeInTheDocument();

    fireEvent.click(within(dialog).getByLabelText('Close car details'));

    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();
  });

  test('Journey 5: Toggle favorites multiple times on same car', () => {
    renderApp();

    const carItem = screen.getByTestId(`car-item-${mockCars[0].id}`);

    expect(within(carItem).getByText('Add to Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText('Add to Favorites'));
    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText('Remove from Favorites'));
    expect(within(carItem).getByText('Add to Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText('Add to Favorites'));
    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText('Remove from Favorites'));
    expect(within(carItem).getByText('Add to Favorites')).toBeInTheDocument();
  });

  test('Journey 6: Open and close modal multiple ways', () => {
    renderApp();

    const carName = screen.getByText(`${mockCars[0].make} ${mockCars[0].model}`);

    fireEvent.click(carName);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close car details'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(carName);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const dialog = screen.getByRole('dialog');
    const closeButtons = within(dialog).getAllByRole('button', { name: /close/i });
    const closeButton = closeButtons.find(btn => btn.textContent === 'Close');
    fireEvent.click(closeButton!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('Journey 7: Favorite status persists across modal opens', () => {
    renderApp();

    const carItem = screen.getByTestId(`car-item-${mockCars[0].id}`);

    fireEvent.click(within(carItem).getByText('Add to Favorites'));

    fireEvent.click(within(carItem).getByText(`${mockCars[0].make} ${mockCars[0].model}`));
    expect(within(screen.getByRole('dialog')).getByText('Remove Favorite')).toBeInTheDocument();

    fireEvent.click(within(screen.getByRole('dialog')).getByLabelText('Close car details'));

    expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(within(carItem).getByText(`${mockCars[0].make} ${mockCars[0].model}`));
    expect(within(screen.getByRole('dialog')).getByText('Remove Favorite')).toBeInTheDocument();
  });

  test('Journey 8: All cars can be favorited simultaneously', () => {
    renderApp();

    mockCars.forEach(car => {
      const carItem = screen.getByTestId(`car-item-${car.id}`);
      expect(within(carItem).getByText('Add to Favorites')).toBeInTheDocument();
    });

    mockCars.forEach(car => {
      const carItem = screen.getByTestId(`car-item-${car.id}`);
      fireEvent.click(within(carItem).getByText('Add to Favorites'));
    });

    mockCars.forEach(car => {
      const carItem = screen.getByTestId(`car-item-${car.id}`);
      expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();
    });
  });

  test('Journey 9: Favoriting one car does not affect others', () => {
    renderApp();

    const firstCar = mockCars[0];
    const secondCar = mockCars[1];

    fireEvent.click(screen.getByTestId(`car-item-${firstCar.id}`));
    fireEvent.click(within(screen.getByRole('dialog')).getByText('Add Favorite'));
    fireEvent.click(within(screen.getByRole('dialog')).getByLabelText('Close car details'));

    expect(within(screen.getByTestId(`car-item-${firstCar.id}`)).getByText('Remove from Favorites')).toBeInTheDocument();

    expect(within(screen.getByTestId(`car-item-${secondCar.id}`)).getByText('Add to Favorites')).toBeInTheDocument();
  });

  test('Journey 10: Each car modal shows correct unique information', () => {
    renderApp();

    fireEvent.click(screen.getByTestId(`car-item-${mockCars[0].id}`));
    let dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(`${mockCars[0].make} ${mockCars[0].model}`)).toBeInTheDocument();
    expect(within(dialog).getByText(`Year: ${mockCars[0].year}`)).toBeInTheDocument();
    fireEvent.click(within(dialog).getByLabelText('Close car details'));

    fireEvent.click(screen.getByTestId(`car-item-${mockCars[1].id}`));
    dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(`${mockCars[1].make} ${mockCars[1].model}`)).toBeInTheDocument();
    expect(within(dialog).getByText(`Year: ${mockCars[1].year}`)).toBeInTheDocument();
  });

  test('Journey 11: Toggle favorites from modal and verify state synchronization', () => {
    renderApp();

    const firstCar = mockCars[0];
    const secondCar = mockCars[1];
    const firstCarItem = screen.getByTestId(`car-item-${firstCar.id}`);
    const secondCarItem = screen.getByTestId(`car-item-${secondCar.id}`);

    fireEvent.click(within(firstCarItem).getByText('Add to Favorites'));
    expect(within(firstCarItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(secondCarItem);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Add Favorite')).toBeInTheDocument();
    fireEvent.click(within(dialog).getByText('Add Favorite'));
    expect(within(dialog).getByText('Remove Favorite')).toBeInTheDocument();

    fireEvent.click(within(dialog).getByLabelText('Close car details'));

    expect(within(firstCarItem).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(secondCarItem).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(firstCarItem);
    const firstDialog = screen.getByRole('dialog');
    expect(within(firstDialog).getByText('Remove Favorite')).toBeInTheDocument();
    fireEvent.click(within(firstDialog).getByText('Remove Favorite'));
    expect(within(firstDialog).getByText('Add Favorite')).toBeInTheDocument();

    fireEvent.click(within(firstDialog).getByLabelText('Close car details'));
    expect(within(firstCarItem).getByText('Add to Favorites')).toBeInTheDocument();
    expect(within(secondCarItem).getByText('Remove from Favorites')).toBeInTheDocument();
  });

  test('Journey 12: Rapidly toggle multiple cars and verify state consistency', () => {
    renderApp();

    const carItems = mockCars.map(car => screen.getByTestId(`car-item-${car.id}`));

    carItems.forEach(carItem => {
      fireEvent.click(within(carItem).getByText('Add to Favorites'));
    });

    carItems.forEach(carItem => {
      expect(within(carItem).getByText('Remove from Favorites')).toBeInTheDocument();
    });

    [carItems[0], carItems[2]].forEach(carItem => {
      fireEvent.click(within(carItem).getByText('Remove from Favorites'));
    });

    expect(within(carItems[0]).getByText('Add to Favorites')).toBeInTheDocument();
    expect(within(carItems[1]).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(carItems[2]).getByText('Add to Favorites')).toBeInTheDocument();
    expect(within(carItems[3]).getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(carItems[0]);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByText('Add Favorite'));
    fireEvent.click(within(dialog).getByLabelText('Close car details'));

    expect(within(carItems[0]).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(carItems[1]).getByText('Remove from Favorites')).toBeInTheDocument();
    expect(within(carItems[2]).getByText('Add to Favorites')).toBeInTheDocument();
    expect(within(carItems[3]).getByText('Remove from Favorites')).toBeInTheDocument();
  });
});