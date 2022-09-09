import { API_URL, DEFAULT_HEADERS } from './config';

type HttpClient = {
  get: (endpoint: string) => Promise<Response>;
  post: (endpoint: string, body: Record<string, unknown>) => Promise<Response>;
};

const get = async (endpoint: string): Promise<Response> => {
  return await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  });
};

const post = async (endpoint: string, body: Record<string, unknown>): Promise<Response> => {
  return await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
  });
};

const FetchHttpClient: HttpClient = {
  get,
  post,
};

export default FetchHttpClient;
