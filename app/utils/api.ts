export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...(typeof options.headers === 'object' && options.headers !== null ? options.headers : {}),
        },
    });

    return response;
}

export async function apiCall(
    endpoint: string,
    options: RequestInit = {}
) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const url = `${API_URL}${endpoint}`;
    return fetchWithAuth(url, options);
}
