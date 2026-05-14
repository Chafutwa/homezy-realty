"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function HomePopup() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4">
            <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-homezy-muted hover:text-homezy-primary transition-colors"
                >
                    <X size={22} />
                </button>

                {/* Heading */}
                <h2 className="font-display text-3xl font-bold text-homezy-primary mb-3">
                    Let’s Find Your Perfect Property
                </h2>

                <p className="text-homezy-muted text-sm mb-6 leading-relaxed">
                    Fill in your details and our team will contact you with curated property options matching your needs.
                </p>

                {/* FORM */}
                <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        setLoading(true);

                        const formData = new FormData(e.currentTarget);

                        const data = {
                            name: formData.get("name"),
                            email: formData.get("email"),
                            phone: formData.get("phone"),
                            propertyType: formData.get("propertyType"),
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
                                setOpen(false);
                            } else {
                                alert("Something went wrong.");
                            }
                        } catch (error) {
                            alert("Failed to send.");
                        }

                        setLoading(false);
                    }}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-homezy-sand outline-none focus:border-homezy-primary"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-homezy-sand outline-none focus:border-homezy-primary"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-homezy-sand outline-none focus:border-homezy-primary"
                    />

                    <select
                        name="propertyType"
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 rounded-xl border border-homezy-sand outline-none focus:border-homezy-primary"
                    >
                        <option value="" disabled>
                            Property Type
                        </option>

                        <option>Apartment</option>
                        <option>Villa</option>
                        <option>Penthouse</option>
                        <option>Investment Property</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-homezy-primary text-white py-3 rounded-xl font-semibold hover:bg-homezy-secondary transition-colors disabled:opacity-70"
                    >
                        {loading ? "Submitting..." : "Submit Details"}
                    </button>
                </form>

                {/* Continue */}
                <button
                    onClick={() => setOpen(false)}
                    className="w-full mt-4 text-sm text-homezy-muted hover:text-homezy-primary transition-colors"
                >
                    Continue browsing
                </button>
            </div>
        </div>
    );
}