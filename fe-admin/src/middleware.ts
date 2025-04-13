// src/middleware.ts
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, url } = context;

  console.log('aye')
  // Example: Redirect if path is /old to /new
  if (url.pathname == '/news') {
    return new Response(null, {
      // status: 301,
      headers: {
        Location: '/login',
      },
    });
  }

  // Example: Block access to /admin if not authorized
  if (url.pathname.startsWith('/admin')) {
    const isLoggedIn = false; // You can check cookies/headers here
    if (!isLoggedIn) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  // Continue to the next handler (i.e., page rendering)
  return next();
};
