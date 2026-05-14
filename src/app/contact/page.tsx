"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    return (
        <main>
            <Navigation />

            <section className="pt-32 pb-20 bg-homezy-primary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Get in Touch
                    </h1>

                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Have questions about a property? Our team is ready to help you find your perfect home.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-homezy-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <h2 className="font-display text-2xl font-bold text-homezy-primary mb-6">
                                Send us a Message
                            </h2>

                            <form
                                className="space-y-4"
                                onSubmit={async (e) => {
                                    e.preventDefault();

                                    setLoading(true);

                                    const formData = new FormData(e.currentTarget);

                                    const data = {
                                        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
                                        email: formData.get("email"),
                                        phone: formData.get("phone"),
                                        propertyType: "General Inquiry",
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
                                            (e.target as HTMLFormElement).reset();
                                        } else {
                                            alert("Something went wrong.");
                                        }
                                    } catch (error) {
                                        alert("Failed to send message.");
                                    }

                                    setLoading(false);
                                }}
                            >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>
                                        <label className="block text-sm font-medium text-homezy-primary mb-2">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            className="w-full px-4 py-3 bg-homezy-cream rounded-xl outline-none focus:ring-2 focus:ring-homezy-secondary"
                                            placeholder="John"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-homezy-primary mb-2">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            className="w-full px-4 py-3 bg-homezy-cream rounded-xl outline-none focus:ring-2 focus:ring-homezy-secondary"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-homezy-primary mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 bg-homezy-cream rounded-xl outline-none focus:ring-2 focus:ring-homezy-secondary"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-homezy-primary mb-2">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-3 bg-homezy-cream rounded-xl outline-none focus:ring-2 focus:ring-homezy-secondary"
                                        placeholder="+254 712 345 678"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-homezy-primary mb-2">
                                        Message
                                    </label>

                                    <textarea
                                        rows={4}
                                        name="message"
                                        required
                                        className="w-full px-4 py-3 bg-homezy-cream rounded-xl outline-none focus:ring-2 focus:ring-homezy-secondary"
                                        placeholder="I'm interested in..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-homezy-primary text-white py-4 rounded-xl font-semibold hover:bg-homezy-primary/90 transition-colors disabled:opacity-70"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">

                            <div>
                                <h2 className="font-display text-2xl font-bold text-homezy-primary mb-6">
                                    Contact Information
                                </h2>

                                <p className="text-homezy-muted mb-8">
                                    Visit our office or reach out to us through any of these channels. We're always happy to help.
                                </p>
                            </div>

                            <div className="space-y-6">

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-homezy-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-homezy-secondary" size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-homezy-primary mb-1">
                                            Office Address
                                        </h3>

                                        <p className="text-homezy-muted">
                                            Westlands,<br />Nairobi, Kenya
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-homezy-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-homezy-secondary" size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-homezy-primary mb-1">
                                            Phone
                                        </h3>

                                        <p className="text-homezy-muted">
                                            +254 706 253 252
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-homezy-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-homezy-secondary" size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-homezy-primary mb-1">
                                            Email
                                        </h3>

                                        <p className="text-homezy-muted">
                                            homezyrealtyke@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-homezy-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Clock className="text-homezy-secondary" size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-homezy-primary mb-1">
                                            Working Hours
                                        </h3>

                                        <p className="text-homezy-muted">
                                            Mon - Fri: 8:00 AM - 6:00 PM
                                            <br />
                                            Sat: 9:00 AM - 4:00 PM
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}