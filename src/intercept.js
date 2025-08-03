const originalFetch = window.fetch;

window.fetch = async (...args) => {
    const url = args[0];

    if (typeof url === 'string' && url.includes('/auth/v1')) {
        window.location.href = '/403';
        return new Response(null, {
            status: 403,
            statusText: 'Forbidden'
        });
    }

    return originalFetch(...args);
};