"use client";

import { motion } from "framer-motion";
import { Search, Calendar, KeyRound } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Browse Properties",
        description: "Explore our curated listings of premium homes, apartments, and commercial spaces across Nairobi.",
    },
    {
        icon: Calendar,
        title: "Schedule a Viewing",
        description: "Book a personalized tour at your convenience. We'll handle all the arrangements.",
    },
    {
        icon: KeyRound,
        title: "Close the Deal",
        description: "From negotiations to paperwork, we guide you every step until you get your keys.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-homezy-secondary font-medium text-sm uppercase tracking-wider">
                        Simple Process
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-homezy-primary mt-2">
                        How It Works
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-homezy-cream p-8 rounded-2xl text-center"
                        >
                            <div className="w-16 h-16 bg-homezy-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <step.icon className="text-homezy-primary" size={32} />
                            </div>

                            <h3 className="font-display text-xl font-bold text-homezy-primary mb-3">
                                {step.title}
                            </h3>

                            <p className="text-homezy-muted leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}