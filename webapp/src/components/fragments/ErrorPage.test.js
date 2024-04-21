import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorPage from './ErrorPage';

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('Error handling', () => {
  test('renders error page for non-existent route', () => {
    render(
      <Router>
          <ErrorPage />
      </Router>
    );

    expect(screen.getByText('error.error')).toBeInTheDocument();
    expect(screen.getByText("error.sorry")).toBeInTheDocument();
    expect(screen.getByAltText('Cat crying')).toBeInTheDocument();
  });
});
