export interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    currency: "KES" | "USD";
    type: "apartment" | "villa" | "townhouse" | "commercial" | "land";
    status: "for-sale" | "for-rent";
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    image: string;
    gallery?: string[];  // <-- ADDED
    description: string;
    amenities: string[];
    demand: "low" | "medium" | "high" | "very-high";
    featured: boolean;
    agent: {
        name: string;
        phone: string;
        email: string;
    };
}