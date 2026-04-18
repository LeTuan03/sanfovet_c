export const ADMIN_TOKEN = 'sanfovet-dev-token';

export async function adminFetch(url: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${ADMIN_TOKEN}`,
  };

  return fetch(url, { ...options, headers });
}
