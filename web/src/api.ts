const URL = process.env.NEXT_PUBLIC_SERVER_URL;

const init: RequestInit = {
  credentials: 'include',
};

const api = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(URL + path, {
      ...init,
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },
  async post<T>(path: string, data: any = undefined): Promise<T> {
    const response = await fetch(URL + path, {
      ...init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },
  async patch<T>(path: string, data: any = undefined): Promise<T> {
    const response = await fetch(URL + path, {
      ...init,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },
  async delete<T>(path: string): Promise<T> {
    const response = await fetch(URL + path, {
      ...init,
      method: 'DELETE',
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },
};

export default api;
