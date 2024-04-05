import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from "../../App";

describe('<NavBar />', () => {
    test('Navbar renders correctly', async () => {
      render(
          <App />
      );
  
      expect(screen.getByAltText('App logo')).toBeInTheDocument();
      expect(screen.getByAltText('Help')).toBeInTheDocument();
      expect(screen.getByText('navBar.title')).toBeInTheDocument();
      expect(screen.getByText('navBar.language')).toBeInTheDocument();
  
    fireEvent.click(screen.getByText('navBar.language'));
  
    // Change to spanish
    fireEvent.click(screen.getByText('navBar.es'));
  
    // Go to instructions
    fireEvent.click(screen.getByAltText('Help'));
    expect(screen.getByText('instructions.title')).toBeInTheDocument();

     
    });
  });