"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/properties/PropertyCard";
import { properties } from "@/lib/data";
import { Search, Filter } from "lucide-react";

export default function PropertiesPage() {
    const [showAll, setShowAll] = useState(false);

    // Latest first, because newest properties are usually added at the bottom of data.ts
    const latestProperties = [...properties].reverse();

    // Show 6 first, then all when button is clicked
    const visibleProperties = showAll
        ? latestProperties
        : latestProperties.slice(0, 6);

    return (
        <main>
            <Navigation />

            {/* Page Header */}
            <section className="pt-32 pb-12 bg-homezy-primary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        All Properties
                    </h1>
                    <p className="text-white/60 text-lg">
                        Browse our curated selection of premium properties in Nairobi
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-6 bg-white border-b border-homezy-sand sticky top-20 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="flex items-center gap-2 bg-homezy-cream px-4 py-2 rounded-lg">
                            <Search size={18} className="text-homezy-muted" />
                            <input
                                type="text"
                                placeholder="Search location..."
                                className="bg-transparent outline-none text-sm w-40"
                            />
                        </div>

                        <select className="bg-homezy-cream px-4 py-2 rounded-lg text-sm outline-none">
                            <option>All Types</option>
                            <option>Apartment</option>
                            <option>Villa</option>
                            <option>Townhouse</option>
                        </select>

                        <select className="bg-homezy-cream px-4 py-2 rounded-lg text-sm outline-none">
                            <option>Any Price</option>
                            <option>Under KES 5M</option>
                            <option>KES 5M - 15M</option>
                            <option>Above KES 15M</option>
                        </select>

                        <select className="bg-homezy-cream px-4 py-2 rounded-lg text-sm outline-none">
                            <option>Bedrooms</option>
                            <option>1-2</option>
                            <option>3-4</option>
                            <option>5+</option>
                        </select>

                        <button className="ml-auto flex items-center gap-2 text-homezy-primary text-sm font-medium">
                            <Filter size={18} />
                            More Filters
                        </button>
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-12 bg-homezy-cream min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-homezy-muted">
                            Showing{" "}
                            <span className="text-homezy-primary font-semibold">
                                {visibleProperties.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-homezy-primary font-semibold">
                                {properties.length}
                            </span>{" "}
                            properties
                        </p>

                        <select className="bg-white px-4 py-2 rounded-lg text-sm outline-none border border-homezy-sand">
                            <option>Sort by: Newest First</option>
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visibleProperties.map((property, index) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                index={index}
                            />
                        ))}
                    </div>

                    {!showAll && properties.length > 6 && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={() => setShowAll(true)}
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-homezy-primary text-white font-semibold hover:bg-homezy-secondary transition-colors"
                            >
                                See More Listings
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}