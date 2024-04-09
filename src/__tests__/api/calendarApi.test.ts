import { calendarApi } from '../../api';

describe('Tests on calendarApi', () => {
  test('should return the default configuration', () => {
    expect(calendarApi.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
  });

  test('should have the x-token on every request header', async() => {
    const token = 'ABC-123-XYZ';
    localStorage.setItem('token', token);
    const res = await calendarApi.post('/auth', {
      "email":"cristian@gmail.com",
      "password":"123123"
    });
    expect(res.config.headers['x-token']).toBe(token);
  });
});
