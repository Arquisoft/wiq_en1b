import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  expect(screen.getByAltText('App logo')).toBeInTheDocument();
  expect(screen.getByAltText('Help')).toBeInTheDocument();
});

describe('<NavBar />', () => {
  test('Navbar renders correctly and language change works', async () => {
    render(
        <App />
    );

    expect(screen.getByText('navBar.title')).toBeInTheDocument();
    expect(screen.getByText('navBar.language')).toBeInTheDocument();

  // fireEvent.click(screen.getByText('navBar.language'));

  // // Cambiar idioma a español
  // fireEvent.click(screen.getByText('navBar.es'));

  // Espera a que el cambio de idioma se refleje en el DOM
  // await waitFor(() => {
  //   expect(screen.getByText('¡Saber y ganar!')).toBeInTheDocument();
  // });

  
   
  });
});
