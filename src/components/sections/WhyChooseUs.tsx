"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, Clock, Award } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Trusted Agency",
        description: "Helping clients find their perfect properties with integrity and transparency.",
    },
    {
        icon: TrendingUp,
        title: "Investment Focus",
        description: "We analyze market trends and provide data to help you make informed investment decisions.",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        description: "Our team is always available to answer your questions and guide you through the buying process.",
    },
    {
        icon: Award,
        title: "Premium Listings",
        description: "Access exclusive properties in Nairobi's most prestigious neighborhoods before they hit the market.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-homezy-secondary font-medium text-sm uppercase tracking-wider">
                        Why Homezy
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-homezy-primary mt-2">
                        The Homezy Advantage
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 rounded-2xl hover:bg-homezy-cream transition-colors"
                        >
                            <div className="w-14 h-14 bg-homezy-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="text-homezy-primary" size={28} />
                            </div>
                            <h3 className="font-display text-xl font-semibold text-homezy-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-homezy-muted text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}