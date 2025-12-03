/**
 * Raw Discogs API record structure
 * The validator accepts this structure but only extracts the fields
 * defined in the Release interface
 */
export interface DiscogRecord {
    id: number;
    instance_id: number;
    date_added: string;
    rating: number;
    basic_information: BasicInformation;
    folder_id: number;
    notes: Array<{ field_id: number; value: string }>;
}

interface BasicInformation {
    id: number;
    master_id?: number;
    master_url?: string;
    cover_image: string;
    thumb: string;
    year: number;
    title: string;
    genres: string[];
    styles: string[];
    artists: Artist[];
    labels?: Array<{ name: string; catno: string }>;
    formats: Array<{ name: string; qty: string; descriptions: string[] }>;
    resource_url: string;
}

export interface Artist {
    name: string;
    anv?: string;
    id?: string | number;
    resource_url?: string;
    role?: string;
    tracks?: string;
}

export type { DiscogResponse, Release } from '@/lib/validators/discogs';