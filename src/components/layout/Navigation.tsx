"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleContactSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            propertyType: "Navigation Contact Form",
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
                alert("Message sent successfully!");
                setIsContactModalOpen(false);
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
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <div className="relative w-50 h-50">
                                <Image
                                    src="/images/logo.png"
                                    alt="Homezy Realty"
                                    fill
                                    className="object-contain rounded-lg"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium hover:text-homezy-secondary transition-colors ${
                                        isScrolled
                                            ? "text-homezy-primary"
                                            : "text-white/90"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Contact Button */}
                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                className="flex items-center gap-2 bg-homezy-secondary text-homezy-primary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-homezy-secondary/90 transition-colors"
                            >
                                <Phone size={16} />
                                <span>Contact Us</span>
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className={`md:hidden p-2 ${
                                isScrolled
                                    ? "text-homezy-primary"
                                    : "text-white"
                            }`}
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-40 bg-homezy-primary md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() =>
                                        setIsMobileMenuOpen(false)
                                    }
                                    className="text-2xl font-display text-white hover:text-homezy-secondary"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsContactModalOpen(true);
                                }}
                                className="flex items-center gap-2 bg-homezy-secondary text-homezy-primary px-6 py-3 rounded-full font-medium"
                            >
                                <Phone size={18} />
                                Contact Us
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsContactModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                        >

                            {/* Close */}
                            <button
                                onClick={() =>
                                    setIsContactModalOpen(false)
                                }
                                className="absolute top-4 right-4 text-homezy-muted hover:text-homezy-primary transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Title */}
                            <h3 className="font-display text-2xl font-bold text-homezy-primary mb-6">
                                Contact Us
                            </h3>

                            {/* Form */}
                            <form
                                onSubmit={handleContactSubmit}
                                className="space-y-4"
                            >

                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Contact Number"
                                        required
                                        className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted"
                                    />
                                </div>

                                <div>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-homezy-sand rounded-lg outline-none focus:border-homezy-secondary focus:ring-1 focus:ring-homezy-secondary text-homezy-primary placeholder:text-homezy-muted resize-none"
                                    />
                                </div>

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