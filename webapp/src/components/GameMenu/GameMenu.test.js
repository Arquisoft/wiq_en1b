import { render, screen } from '@testing-library/react';
import GameMenu from './GameMenu';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
    render(<MemoryRouter><GameMenu /></MemoryRouter>);
    const linkElement = screen.getByText(/Game Menu/i);
    expect(linkElement).toBeInTheDocument();
});

