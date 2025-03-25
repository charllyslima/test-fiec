class HttpClient {
    private baseUrl: string;
    private readonly headers: Record<string, string>;

    constructor(baseUrl: string, headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-Requested-With': 'XMLHttpRequest',
    }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const defaultOptions: RequestInit = {
            method: 'GET',
            headers: {
                ...this.headers,
                ...options.headers,
            },
            credentials: 'same-origin',
            ...options,
        };

        const response = await fetch(url, defaultOptions);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        return await response.json();
    }

    public async get(endpoint: string, options: RequestInit = {}, baseUrl?: string) {
        if(baseUrl){
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, { method: 'GET', ...options });
    }

    public async post(endpoint: string, body: any, options: RequestInit = {}, baseUrl?: string) {
        if(baseUrl){
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options,
        });
    }

    public async put(endpoint: string, body: any, options: RequestInit = {}, baseUrl?: string) {
        if(baseUrl){
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            ...options,
        });
    }

    public async delete(endpoint: string, options: RequestInit = {}, baseUrl?: string) {
        if(baseUrl){
            this.baseUrl = baseUrl;
        }
        return this.request(endpoint, { method: 'DELETE', ...options });
    }
}

const httpClient = new HttpClient("https://apisidra.ibge.gov.br");

export default httpClient;
