import axios, { AxiosRequestConfig } from 'axios';

class HttpClient {
    private baseUrl: string;
    private readonly headers: Record<string, string>;

    constructor(baseUrl: string, headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    private getCacheKey(url: string): string {
        return `http_cache_${url}`;
    }

    private getFromCache(url: string): any | null {
        const cacheKey = this.getCacheKey(url);
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;

        try {
            const parsed = JSON.parse(cached);
            const isExpired = parsed.expiry && parsed.expiry < Date.now();
            if (isExpired) {
                localStorage.removeItem(cacheKey);
                return null;
            }
            return parsed.data;
        } catch {
            localStorage.removeItem(cacheKey);
            return null;
        }
    }

    private saveToCache(url: string, data: any, ttlMinutes = 60) {
        const cacheKey = this.getCacheKey(url);
        const expiry = Date.now() + ttlMinutes * 60 * 1000;
        const value = JSON.stringify({ data, expiry });
        localStorage.setItem(cacheKey, value);
    }

    private async request(endpoint: string, options: AxiosRequestConfig = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const defaultOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: {
                ...this.headers,
                ...options.headers,
            },
            ...options,
        };

        // Only apply cache logic for GET requests
        if (defaultOptions.method === 'GET') {
            const cached = this.getFromCache(url);
            if (cached) return cached;
        }

        try {
            const response = await axios(url, defaultOptions);
            if (defaultOptions.method === 'GET') {
                this.saveToCache(url, response.data);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro na requisição: ${error.response?.statusText || 'Erro desconhecido'}`);
            }
            throw new Error('Erro desconhecido');
        }
    }

    public async get(endpoint: string, options: AxiosRequestConfig = {}, baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, { method: 'GET', ...options });
    }

    public async post(endpoint: string, body: any, options: AxiosRequestConfig = {}, baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, {
            method: 'POST',
            data: body,
            ...options,
        });
    }

    public async put(endpoint: string, body: any, options: AxiosRequestConfig = {}, baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, {
            method: 'PUT',
            data: body,
            ...options,
        });
    }

    public async delete(endpoint: string, options: AxiosRequestConfig = {}, baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, { method: 'DELETE', ...options });
    }
}

const httpClient = new HttpClient("https://apisidra.ibge.gov.br");

export default httpClient;
