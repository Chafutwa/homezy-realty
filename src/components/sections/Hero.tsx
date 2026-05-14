"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";
import { useState } from "react";

// ============================================
// CONFIGURATION - Switch between video and image
// ============================================
const HERO_CONFIG = {
    type: "video", // Change to "video" or "image"
    imageSrc: "/images/cheval (1).jpeg", // Your image: cheval-1.jpeg
    videoSrc: "/hero.mp4", // Your video: hero.mp4
};

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const [propertyType, setPropertyType] = useState("");

    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background - Video or Image */}
            {HERO_CONFIG.type === "video" ? (
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        poster={HERO_CONFIG.imageSrc}
                    >
                        <source src={HERO_CONFIG.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            ) : (
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${HERO_CONFIG.imageSrc})` }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-homezy-secondary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-homezy-accent/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-homezy-secondary text-sm font-medium mb-8 border border-homezy-secondary/20">
                        <span className="w-2 h-2 bg-homezy-secondary rounded-full animate-pulse" />
                        Nairobi&apos;s #1 Real Estate Agency
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight mb-6"
                >
                    Find The Space That <span className="block text-homezy-secondary mt-2">Fits You.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
                >
                    Premium properties in Nairobi's most desirable neighborhoods.
                </motion.p>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-white rounded-2xl p-2 shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 py-3 bg-homezy-cream rounded-xl">
                                <MapPin className="text-homezy-secondary mr-3 flex-shrink-0" size={20} />
                                <input
                                    type="text"
                                    placeholder="Which area?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent outline-none text-homezy-primary placeholder:text-homezy-muted"
                                />
                            </div>

                            <div className="flex-1 flex items-center px-4 py-3 bg-homezy-cream rounded-xl">
                                <Home className="text-homezy-secondary mr-3 flex-shrink-0" size={20} />
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="w-full bg-transparent outline-none text-homezy-primary cursor-pointer"
                                >
                                    <option value="">Property type</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                    <option value="townhouse">Townhouse</option>
                                </select>
                            </div>

                            <button className="bg-homezy-secondary text-white px-8 py-3 rounded-xl font-semibold hover:bg-homezy-secondary/90 transition-all hover:scale-105 flex items-center justify-center gap-2">
                                <Search size={20} />
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-8 md:gap-16 mt-16"
                >

                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
}