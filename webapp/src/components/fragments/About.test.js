import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import About from './About';


// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: key => key }),
  }));

  describe('About', () => {
    test('renders about page', () => {
      render(
        <Router>
            <About />
        </Router>
      );
  
      expect(screen.getByText('about.hello')).toBeInTheDocument();

      expect(screen.getByText('about.name1')).toBeInTheDocument();
      expect(screen.getByText('about.name2')).toBeInTheDocument();
      expect(screen.getByText('about.name3')).toBeInTheDocument();
      expect(screen.getByText('about.name4')).toBeInTheDocument();
      expect(screen.getByText('about.name5')).toBeInTheDocument();
      expect(screen.getByText('about.name6')).toBeInTheDocument();


    });
  });
