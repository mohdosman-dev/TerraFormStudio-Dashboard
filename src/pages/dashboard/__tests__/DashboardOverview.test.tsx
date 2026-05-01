import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardOverview } from '../DashboardOverview';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard Overview Page', () => {
  it('renders welcome message and statistics cards', () => {
    render(
      <MemoryRouter>
        <DashboardOverview />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Artisans/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Collections/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Orders/i)).toBeInTheDocument();
  });

  it('renders the revenue overview chart and spotlight card', () => {
    render(
      <MemoryRouter>
        <DashboardOverview />
      </MemoryRouter>
    );

    expect(screen.getByText(/Revenue Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Artisan Spotlight/i)).toBeInTheDocument();
  });

  it('renders the recent orders table', () => {
    render(
      <MemoryRouter>
        <DashboardOverview />
      </MemoryRouter>
    );

    expect(screen.getByText(/Recent Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Order ID/i)).toBeInTheDocument();
    
    // Multiple orders might have the same artisan, so use getAllByText
    const artisanNames = screen.getAllByText(/Amara Okafor/i);
    expect(artisanNames.length).toBeGreaterThan(0);
    expect(artisanNames[0]).toBeInTheDocument();
  });
});
