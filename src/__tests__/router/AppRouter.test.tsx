import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../router';
import { useAuthStore } from '../../hooks/useAuthStore';
import { User } from '../../store';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks/useAuthStore');
vi.mock('../../calendar/pages/CalendarPage', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Tests on <AppRouter />', () => {
  const mockCheckAuthToken = vi.fn();

  beforeAll(() => {
    vi.clearAllMocks();
  })

  test('should show the loading page and call checkAuthToken', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      status: 'checking',
      user: {} as User,
      errorMessage: '',
      startLogin: vi.fn(),
      startRegister: vi.fn(),
      checkAuthToken: mockCheckAuthToken,
      startLogout: vi.fn()
    })
    const { container } = render(<AppRouter />);

    expect(container.innerHTML).toBe('<h3>Checking</h3>');
    expect(screen.getByText('Checking')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('should show the calendar if user is authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      status: 'authenticated',
      user: {} as User,
      errorMessage: '',
      startLogin: vi.fn(),
      startRegister: vi.fn(),
      checkAuthToken: mockCheckAuthToken,
      startLogout: vi.fn()
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  });
});