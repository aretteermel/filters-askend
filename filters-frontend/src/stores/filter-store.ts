export class FilterStore {
    private baseUrl = 'http://localhost:8080';

    async fetchFilters(): Promise<Filter[]> {
        try {
            const response = await this.fetch(`${this.baseUrl}/api/filters`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching types:', error);
            throw error;
        }
    }

    async fetchTypes(): Promise<Type[]> {
        try {
            const response = await this.fetch(`${this.baseUrl}/api/types`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching types:', error);
            throw error;
        }
    }

    async fetchComparisons(): Promise<Comparison[]> {
        try {
            const response = await fetch(`${this.baseUrl}/api/comparisons`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching comparisons:', error);
            throw error;
        }
    }

    async saveNewFilter(filterData: FilterData): Promise<Response> {
        try {
            const formattedFilterData = {
                ...filterData,
                criteria: filterData.criteria.map((criterion) => {
                    return criterion;
                })
            };
            return await this.post(`${this.baseUrl}/api/filters`, formattedFilterData);
        } catch (error) {
            console.error('Error adding new filter:', error);
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

    private async post(url: string, data: any, options?: RequestInit): Promise<Response> {
        return await this.fetch(url, {
            ...options,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
}

export interface Type {
    id: number;
    type: string;
}

export interface Comparison {
    typeId: number;
    comparison: string;
}

export interface Criteria {
    type: string;
    comparison: string;
    value: string;
}

export interface FilterData {
    name: string;
    criteria: Criteria[];
}

export interface Filter {
    id: number;
    name: string;
    criteria: Criteria[];
}