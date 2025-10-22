import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuthStore } from '../store/AuthContext';
import Header from './Header';

// Mock useLogout hook
const mockLogout = jest.fn();
jest.mock('../hooks/useLogout', () => ({
  useLogout: () => ({
    logout: mockLogout,
  }),
}));

// Mock AuthContext
jest.mock('../store/AuthContext', () => {
  const actualContext = jest.requireActual('../store/AuthContext');
  return {
    ...actualContext,
    useAuthStore: jest.fn(),
  };
});

// Create a wrapper component that provides necessary context
const HeaderWrapper = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Default to non-authenticated state
    (useAuthStore as jest.Mock).mockImplementation(() => ({
      isAuthenticated: false,
    }));
  });

  test('renders header with TEST nuevo text', () => {
    render(<HeaderWrapper />);
    const headerText = screen.getByText('TEST nuevo');
    expect(headerText).toBeInTheDocument();
  });

//   test('renders Auth and Register links when not authenticated', () => {
//     render(<HeaderWrapper />);
//     const navLinks = screen.getAllByRole('link');
//     expect(navLinks.some(link => link.textContent === 'Auth')).toBeTruthy();
//     expect(navLinks.some(link => link.textContent === 'Register')).toBeTruthy();
//   });

//   test('menu functionality in mobile view', async () => {
//     render(<HeaderWrapper />);
//     const menuButton = screen.getByLabelText('account of current user');
    
//     // Open menu
//     fireEvent.click(menuButton);
//     const menu = screen.getByRole('menu');
//     expect(menu).toBeInTheDocument();
    
//     // Verify menu items
//     const menuItems = within(menu).getAllByRole('menuitem');
//     expect(menuItems.length).toBeGreaterThan(0);
    
//     // Close menu
//     fireEvent.click(menuButton);
//     expect(screen.queryByRole('menu')).not.toBeInTheDocument();
//   });

  test('dark mode switch changes theme correctly', () => {
    render(<HeaderWrapper />);
    const switchElement = screen.getByRole('checkbox');
    const appBar = screen.getByRole('banner');
    
    // Initial state - light mode
    expect(switchElement).not.toBeChecked();
    expect(appBar).toHaveClass('header_black');
    
    // Toggle to dark mode
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();
    expect(appBar).toHaveClass('header_white');
  });

//   test('renders UserList link and logout button when authenticated', () => {
//     // Mock authenticated state
//     (useAuthStore as jest.Mock).mockImplementation(() => ({
//       isAuthenticated: true,
//     }));

//     render(<HeaderWrapper />);
    
//     const navLinks = screen.getAllByRole('link');
//     expect(navLinks.some(link => link.textContent === 'UserList')).toBeTruthy();
    
//     const logoutButton = screen.getByRole('button', { name: /logout/i });
//     expect(logoutButton).toBeInTheDocument();
    
//     // Test logout functionality
//     fireEvent.click(logoutButton);
//     expect(mockLogout).toHaveBeenCalled();
//   });

  test('handles menu interactions correctly', () => {
    render(<HeaderWrapper />);
    const menuButton = screen.getByLabelText('account of current user');
    
    // Open menu
    fireEvent.click(menuButton);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    
    // Click a menu item
    const menuItems = within(menu).getAllByRole('menuitem');
    fireEvent.click(menuItems[0]);
    
    // Menu should close
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});