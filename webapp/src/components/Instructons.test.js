import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Instructions from './Instructions';


describe('Instructions component', () => {
  test('Instructions renders correctly', () => {
   render(
      <Router>
        <Instructions />
      </Router>
    );
    // The welcome messages must be shown
    expect(screen.getByText('instructions.title')).toBeInTheDocument();
    expect(screen.getByText('instructions.objective')).toBeInTheDocument();
    expect(screen.getByText('instructions.objective_p1')).toBeInTheDocument();
    expect(screen.getByText('instructions.how_to_play_p1')).toBeInTheDocument();
    expect(screen.getByText('instructions.how_to_play_p2')).toBeInTheDocument();
    expect(screen.getByText('instructions.how_to_play_p3')).toBeInTheDocument();
    expect(screen.getByText('instructions.how_to_play_p4')).toBeInTheDocument();
    expect(screen.getByText('instructions.scoring')).toBeInTheDocument();
    expect(screen.getByText('instructions.scoring_p1')).toBeInTheDocument();
    expect(screen.getByText('instructions.scoring_p2')).toBeInTheDocument();
    expect(screen.getByText('instructions.time_limit_p1')).toBeInTheDocument();
    expect(screen.getByText('instructions.time_limit')).toBeInTheDocument();
    expect(screen.getByText('instructions.have_fun')).toBeInTheDocument();
    expect(screen.getByText('instructions.have_fun_p1')).toBeInTheDocument();
   
  });
});
