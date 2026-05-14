"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            propertyType: "CTA Schedule Meeting",
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Details submitted successfully!");
                setIsModalOpen(false);
                e.currentTarget.reset();
            } else {
                alert("Something went wrong.");
            }
        } catch (error) {
            alert("Failed to send message.");
        }

        setLoading(false);
    };

    return (
        <>
            <section className="py-20 bg-homezy-secondary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-homezy-primary mb-4">
                            Ready to Find Your Dream Home?
                        </h2>

                        <p className="text-homezy-primary/80 text-lg mb-8 max-w-2xl mx-auto">
                            Let our experts guide you through Nairobi's premium real estate market.
                            Get personalized recommendations based on your preferences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/properties">
                                <button className="inline-flex items-center justify-center gap-2 bg-white text-homezy-primary px-8 py-4 rounded-full font-semibold hover:bg-homezy-cream transition-colors w-full sm:w-auto">
                                    Browse Properties
                                    <ArrowRight size={20} />
                                </button>
                            </Link>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center justify-center gap-2 bg-homezy-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-homezy-primary/90 transition-colors w-full sm:w-auto"
                            >
                                <Phone size={20} />
                                Schedule a Meeting
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-homezy-muted hover:text-homezy-primary transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="font-display text-2xl font-bold text-homezy-primary mb-3">
                                Schedule a Meeting
                            </h3>

                            <p className="text-homezy-muted text-sm mb-6">
                                Fill in your details and our team will contact you shortly.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Contact Number"
                                    required
                                    className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted"
                                />

                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted resize-none"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-homezy-primary text-white py-3 rounded-lg font-semibold hover:bg-homezy-primary/90 transition-colors disabled:opacity-70"
                                >
                                    {loading ? "Sending..." : "Submit"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}