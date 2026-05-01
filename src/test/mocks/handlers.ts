import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('http://localhost:3000/api/auth/login', async ({ request }) => {
    const body = await request.json() as any;

    if (body.email === 'curator@terraform.com' && body.password === 'password123') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: 'mock-user-id',
          email: 'curator@terraform.com',
          roles: ['super_admin'],
        },
      });
    }

    return new HttpResponse(
      JSON.stringify({ message: 'Invalid email or password' }),
      { status: 401 }
    );
  }),

  http.get('http://localhost:3000/api/artisans', () => {
    return HttpResponse.json([
      {
        _id: '1',
        name: 'Elena Kostic',
        bio: 'Ceramicist based in Belgrade.',
        status: 'active',
        productCount: 12,
        featured: true,
        imageUrl: '/uploads/artisans/1.png'
      }
    ]);
  }),
];
