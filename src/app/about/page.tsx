"use client";

import Navigation from "@/components/layout/Navigation";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Rocket, Target, Users, TrendingUp, MapPin, Award, Smartphone } from "lucide-react";
import Image from "next/image";

const stats = [
    { value: "Nairobi", label: "Market Focus", icon: MapPin },
    { value: "4+", label: "Prime Areas Covered", icon: Award },
    { value: "100%", label: "Client-Centered", icon: Users },
    { value: "Modern", label: "Digital Experience", icon: Smartphone },
];

export default function AboutPage() {
    return (
        <main>
            <Navigation />

            {/* Startup Hero - With Background Image */}
            <section className="relative pt-32 pb-20 min-h-[80vh] flex items-center text-white overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/cheval (5).jpeg"
                        alt="Luxury Property"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-homezy-primary/70" />
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Text */}
                        <div>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-homezy-secondary/20 backdrop-blur rounded-full text-homezy-secondary text-sm font-medium mb-6"
                            >
                                <Rocket size={16} />
                                Founded 2026
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight"
                            >
                                Your Property<br />
                                <span className="text-homezy-secondary">Journey Starts Here</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-white/70 max-w-lg"
                            >
                                A fresh approach to Nairobi real estate. We combine local expertise with modern technology to help you find your perfect space.
                            </motion.p>
                        </div>

                        {/* Right - Stats Grid */}

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-homezy-secondary/90 backdrop-blur-sm p-8 rounded-2xl"
                        >
                            <div className="grid grid-cols-2 gap-8">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <stat.icon className="mx-auto mb-3 text-homezy-primary" size={28} />
                                        <p className="font-display text-2xl md:text-3xl font-bold text-homezy-primary">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-homezy-primary/70 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Rest of your page... */}
            <WhyChooseUs />
            <Footer />
        </main>
    );
}