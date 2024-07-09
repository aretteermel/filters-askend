export class FilterStore {
    private baseUrl = 'http://localhost:8080';


    async fetchTypes(): Promise<Types[]> {
        try {
            const response = await this.fetch(`${this.baseUrl}/api/types`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching types:', error);
            throw error;
        }
    }


    private async fetch(url: string, options?: RequestInit): Promise<Response> {
        const response = await fetch(url, { ...options, credentials: 'include' });
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        return response;
    }
}

export interface Types {
    type: string;
}