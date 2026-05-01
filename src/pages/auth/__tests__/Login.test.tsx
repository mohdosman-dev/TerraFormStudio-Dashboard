import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Login } from '../Login';
import { useAuthStore } from '../../../store/authStore';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.getState().logout();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows client-side validation error for empty email', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  it('shows client-side validation error for invalid email format', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const form = screen.getByRole('button', { name: /Sign In/i }).closest('form')!;
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(form);
    
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows client-side validation error for empty password', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const form = screen.getByRole('button', { name: /Sign In/i }).closest('form')!;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(form);
    
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('shows client-side validation error for short password', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = screen.getByRole('button', { name: /Sign In/i }).closest('form')!;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.submit(form);
    
    expect(await screen.findByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
  });

  it('successfully logs in with valid credentials', async () => {
    const setAuthSpy = vi.spyOn(useAuthStore.getState(), 'setAuth');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = screen.getByRole('button', { name: /Sign In/i }).closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'curator@terraform.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(setAuthSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'curator@terraform.com',
          roles: expect.arrayContaining(['super_admin']),
        }),
        'mock-jwt-token'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }, { timeout: 5000 });
  });

  it('shows server error for invalid credentials', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = screen.getByRole('button', { name: /Sign In/i }).closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword123' } });
    fireEvent.submit(form);

    expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
  });
});
