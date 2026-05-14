"use client";

import { motion } from "framer-motion";
import { Heart, Bed, Bath, Maximize, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { formatPrice } from "@/lib/data";

interface PropertyCardProps {
    property: Property;
    index?: number;
}

export default function PropertyCard({
    property,
    index = 0,
}: PropertyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            <Link href={`/properties/${property.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-homezy-sand">
                    <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {property.featured && (
                            <span className="px-3 py-1 bg-homezy-primary text-white text-xs font-semibold rounded-full">
                                Featured
                            </span>
                        )}

                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-homezy-primary text-white">
                            For Sale
                        </span>
                    </div>

                    {/* Favorite button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-homezy-sand transition-colors"
                    >
                        <Heart
                            size={18}
                            className="text-homezy-primary"
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5">

                    <h3 className="font-display text-lg font-semibold text-homezy-primary mb-2 group-hover:text-homezy-secondary transition-colors">
                        {property.title}
                    </h3>

                    <div className="flex items-center gap-1 text-homezy-muted text-sm mb-3">
                        <MapPin size={14} />
                        {property.location}
                    </div>

                    <div className="flex gap-4 text-sm text-homezy-muted mb-4">

                        <span className="flex items-center gap-1">
                            <Bed size={16} /> {property.bedrooms}
                        </span>

                        <span className="flex items-center gap-1">
                            <Bath size={16} /> {property.bathrooms}
                        </span>

                        <span className="flex items-center gap-1">
                            <Maximize size={16} />{" "}
                            {property.sqft.toLocaleString()}
                        </span>
                    </div>

                    {/* Bottom */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">

                        <p className="text-xl font-display font-bold text-homezy-primary">
                            {formatPrice(
                                property.price,
                                property.currency
                            )}
                        </p>

                        <span className="text-sm text-homezy-primary font-semibold group-hover:text-homezy-secondary group-hover:translate-x-1 transition-all">
                            Details →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}