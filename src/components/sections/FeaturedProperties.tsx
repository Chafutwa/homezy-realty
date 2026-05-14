"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/properties/PropertyCard";
import { properties } from "@/lib/data";

export default function FeaturedProperties() {
    const featured = [...properties]
        .filter((p) => p.featured)
        .reverse()
        .slice(0, 3);

    return (
        <section className="py-20 bg-homezy-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-homezy-secondary font-medium text-sm uppercase tracking-wider">
                            Featured Listings
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-homezy-primary mt-2">
                            Premium Properties
                        </h2>
                    </motion.div>

                    <Link
                        href="/properties"
                        className="inline-flex items-center gap-2 text-homezy-primary font-medium hover:text-homezy-secondary transition-colors mt-4 md:mt-0"
                    >
                        View All <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((property, index) => (
                        <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}