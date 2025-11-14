'use client';

import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import CarList from '@/components/CarList/CarList';
import CarDetail from '@/components/CarDetail/CarDetail';
import { useFavorites } from '@/components/Favorites/FavoritesContext';
import { Car, mockCars } from '@/data/Car';

export default function Page() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
  };

  const handleToggleFavorite = (carId: string) => {
    const car = mockCars.find((c) => c.id === carId);
    if (car) {
      toggleFavorite(car);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Cars</h1>
        <CarList
          cars={mockCars}
          onSelectCar={handleSelectCar}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </main>
      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={handleCloseDetail}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite(selectedCar.id)}
        />
      )}
    </div>
  );
}