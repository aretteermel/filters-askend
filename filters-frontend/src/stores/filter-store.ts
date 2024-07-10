export class FilterStore {
    private baseUrl = 'http://localhost:8080';

    async fetchFilters(): Promise<Filters[]> {
        try {
            const response = await this.fetch(`${this.baseUrl}/api/filters`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching types:', error);
            throw error;
        }
    }

    async fetchTypes(): Promise<Types[]> {
        try {
            const response = await this.fetch(`${this.baseUrl}/api/types`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching types:', error);
            throw error;
        }
    }

    async fetchComparisons(): Promise<Comparisons[]> {
        try {
            const response = await fetch(`${this.baseUrl}/api/comparisons`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching comparisons:', error);
            throw error;
        }
    }

    async saveNewFilter(filterData: FilterData): Promise<void> {
        try {
            await this.post(`${this.baseUrl}/api/filters`, filterData);
        } catch (error) {
            console.error('Error adding new filter:', error);
        }
    }

    private async fetch(url: string, options?: RequestInit): Promise<Response> {
        const response = await fetch(url, { ...options, credentials: 'include' });
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        return response;
    }

    private async post(url: string, data: any, options?: RequestInit): Promise<Response> {
        return await this.fetch(url, {
            ...options,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
}

export interface Types {
    id: number;
    type: string;
}

export interface Comparisons {
    typeId: number;
    comparison: string;
}

export interface CriteriaRow {
    type: string;
    comparison: string;
    value: string;
}

export interface FilterData {
    name: string;
    criteria: CriteriaRow[];
}

export interface Filters {
    id: number;
    name: string;
    criteria: CriteriaRow[];
}