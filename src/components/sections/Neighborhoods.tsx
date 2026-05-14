"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const neighborhoods = [
    { name: "Westlands", count: 45, price: "From KES 5M" },
    { name: "Karen", count: 28, price: "From KES 15M" },
    { name: "Kilimani", count: 32, price: "From KES 8M" },
    { name: "Lavington", count: 24, price: "From KES 12M" },
];

export default function Neighborhoods() {
    return (
        <section className="py-20 bg-homezy-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-homezy-secondary font-medium text-sm uppercase tracking-wider">
                            Explore Areas
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
                            Popular Neighborhoods
                        </h2>
                    </motion.div>

                    <Link
                        href="/neighborhoods"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-homezy-secondary transition-colors mt-4 md:mt-0"
                    >
                        View All Areas <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {neighborhoods.map((area, index) => (
                        <motion.div
                            key={area.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/properties?location=${area.name.toLowerCase()}`}
                                className="block group relative overflow-hidden rounded-2xl aspect-[4/5] bg-homezy-accent/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-homezy-secondary transition-colors">
                                        {area.name}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-2">{area.count} Properties</p>
                                    <p className="text-homezy-secondary font-medium">{area.price}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}