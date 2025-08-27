import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  test('renders header element', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

test('renders navigation links', () => {
  render(<Header />);

  const homeLinks = screen.getAllByText('Home');
  expect(homeLinks).toHaveLength(2); 
  
  const favoritesLinks = screen.getAllByText('Favorites');
  expect(favoritesLinks).toHaveLength(2);
});

test('navigation is hidden on mobile screens', () => {
  render(<Header />);

  const navElements = screen.getAllByRole('navigation');
  const mainNav = navElements.find(nav => 
    nav.getAttribute('aria-label') === 'Main navigation'
  );
  
  expect(mainNav).toHaveClass('hidden', 'md:flex');
});

  test('toggles mobile menu when hamburger button is clicked', () => {
  render(<Header />);
  
  const menuButton = screen.getByLabelText('Toggle navigation menu');
  const mobileMenu = screen.getByTestId('mobile-menu');
  
  expect(mobileMenu).toHaveClass('max-h-0');
  expect(mobileMenu).toHaveClass('opacity-0');
  expect(mobileMenu).toHaveClass('overflow-hidden');
  
  fireEvent.click(menuButton);
  
  expect(mobileMenu).not.toHaveClass('max-h-0');
  expect(mobileMenu).not.toHaveClass('opacity-0'); 
  });

  test('renders with correct accessibility attributes', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });

  test('renders logo with responsive classes', () => {
    render(<Header />);
    

    
  });
});