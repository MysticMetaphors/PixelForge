const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const url = args[0];

  if (typeof url === 'string' && url.includes('/auth/v1')) {
    console.warn('Blocked fetch to /auth/v1:', url);
    return new Response(null, {
      status: 403,
      statusText: 'Forbidden'
    });
  }

  return originalFetch(...args);
};