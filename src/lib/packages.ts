export interface Package {
    id: string;
    name: string;
    description?: string;
    author: string;
    tags?: string[];
    source: string;
    download: string;
}