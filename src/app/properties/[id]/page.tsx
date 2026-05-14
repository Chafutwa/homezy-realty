"use client";

import { useState, use } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { properties, formatPrice } from "@/lib/data";
import { notFound } from "next/navigation";
import {
    Bed,
    Bath,
    Maximize,
    MapPin,
    Phone,
    Mail,
    Check,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
    params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: Props) {
    const { id } = use(params);
    const property = properties.find((p) => p.id === id);

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactType, setContactType] = useState("Property Inquiry");
    const [loading, setLoading] = useState(false);

    if (!property) {
        notFound();
    }

    const allImages = [property.image, ...(property.gallery || [])];
    const mainImage = allImages[0];
    const sideImages = allImages.slice(1, 3);
    const remainingCount = allImages.length > 3 ? allImages.length - 3 : 0;

    const openContactModal = (type: string) => {
        setContactType(type);
        setIsContactModalOpen(true);
    };

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            propertyType: contactType,
            message: `
Property: ${property.title}
Location: ${property.location}
Price: ${formatPrice(property.price, property.currency)}

Client Message:
${formData.get("message")}
            `,
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
        <main>
            <Navigation />

            {/* Breadcrumb */}
            <div className="pt-24 pb-4 bg-homezy-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-homezy-muted">
                        <Link href="/" className="hover:text-homezy-primary transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/properties" className="hover:text-homezy-primary transition-colors">
                            Properties
                        </Link>
                        <span>/</span>
                        <span className="text-homezy-primary font-medium">
                            {property.title}
                        </span>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <section className="pb-8 bg-homezy-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[400px] lg:h-[500px]">
                        <div
                            onClick={() => {
                                setIsOpen(true);
                                setCurrentIndex(0);
                            }}
                            className="lg:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer bg-homezy-sand"
                        >
                            <Image
                                src={mainImage}
                                alt={property.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority
                                sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                        </div>

                        <div className="hidden lg:grid grid-rows-2 gap-4">
                            {sideImages.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-2xl overflow-hidden bg-homezy-sand cursor-pointer"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setCurrentIndex(index + 1);
                                    }}
                                >
                                    <Image
                                        src={img}
                                        alt={`${property.title} - view ${index + 2}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="33vw"
                                    />

                                    {index === sideImages.length - 1 && remainingCount > 0 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/60 transition-colors">
                                            <span className="text-white text-2xl font-bold">
                                                +{remainingCount}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="py-8 bg-homezy-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-homezy-primary mb-2">
                                {property.title}
                            </h1>

                            <div className="flex items-center gap-2 text-homezy-muted mb-6">
                                <MapPin size={18} />
                                {property.location}
                            </div>

                            <div className="flex gap-6 py-6 border-y border-homezy-sand mb-8">
                                <div className="flex items-center gap-2">
                                    <Bed className="text-homezy-secondary" size={24} />
                                    <div>
                                        <p className="font-semibold text-homezy-primary">
                                            {property.bedrooms}
                                        </p>
                                        <p className="text-sm text-homezy-muted">Bedrooms</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Bath className="text-homezy-secondary" size={24} />
                                    <div>
                                        <p className="font-semibold text-homezy-primary">
                                            {property.bathrooms}
                                        </p>
                                        <p className="text-sm text-homezy-muted">Bathrooms</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Maximize className="text-homezy-secondary" size={24} />
                                    <div>
                                        <p className="font-semibold text-homezy-primary">
                                            {property.sqft.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-homezy-muted">Sq Ft</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-display text-2xl font-bold text-homezy-primary mb-4">
                                    Description
                                </h2>
                                <p className="text-homezy-muted leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-display text-2xl font-bold text-homezy-primary mb-4">
                                    Amenities
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center gap-2">
                                            <Check className="text-homezy-secondary" size={18} />
                                            <span className="text-homezy-primary">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
                                <div className="mb-6">
                                    <p className="text-sm text-homezy-muted mb-1">Price</p>
                                    <p className="font-display text-3xl font-bold text-homezy-primary">
                                        {formatPrice(property.price, property.currency)}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={() => openContactModal("Schedule Viewing")}
                                        className="w-full bg-homezy-secondary text-white py-3 rounded-xl font-semibold hover:bg-homezy-secondary/90 transition-colors"
                                    >
                                        Schedule Viewing
                                    </button>

                                    <button
                                        onClick={() => openContactModal("Make an Offer")}
                                        className="w-full bg-homezy-primary text-white py-3 rounded-xl font-semibold hover:bg-homezy-primary/90 transition-colors"
                                    >
                                        Make an Offer
                                    </button>
                                </div>

                                <div className="pt-6 border-t border-homezy-sand">
                                    <p className="text-sm text-homezy-muted mb-3">Contact Us</p>

                                    <div className="space-y-2">
                                        <a
                                            href="tel:+254706253252"
                                            className="flex items-center gap-2 text-homezy-primary hover:text-homezy-secondary transition-colors"
                                        >
                                            <Phone size={16} />
                                            <span className="text-sm">+254 706 253 252</span>
                                        </a>

                                        <a
                                            href="mailto:homezyrealtyke@gmail.com"
                                            className="flex items-center gap-2 text-homezy-primary hover:text-homezy-secondary transition-colors"
                                        >
                                            <Mail size={16} />
                                            <span className="text-sm">homezyrealtyke@gmail.com</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            {isContactModalOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4"
                    onClick={() => setIsContactModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsContactModalOpen(false)}
                            className="absolute top-4 right-4 text-homezy-muted hover:text-homezy-primary transition-colors"
                        >
                            <X size={22} />
                        </button>

                        <h2 className="font-display text-3xl font-bold text-homezy-primary mb-3">
                            {contactType}
                        </h2>

                        <p className="text-homezy-muted text-sm mb-6 leading-relaxed">
                            Fill in your details and our team will contact you about{" "}
                            <span className="font-semibold text-homezy-primary">
                                {property.title}
                            </span>.
                        </p>

                        <form className="space-y-4" onSubmit={handleContactSubmit}>
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

                            <textarea
                                name="message"
                                rows={4}
                                placeholder="Your message"
                                className="w-full px-4 py-3 rounded-xl border border-homezy-sand outline-none focus:border-homezy-primary resize-none"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-homezy-primary text-white py-3 rounded-xl font-semibold hover:bg-homezy-secondary transition-colors disabled:opacity-70"
                            >
                                {loading ? "Submitting..." : "Submit Details"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Lightbox Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={() =>
                            setCurrentIndex((prev) =>
                                prev === 0 ? allImages.length - 1 : prev - 1
                            )
                        }
                        className="absolute left-4 md:left-8 text-white hover:text-gray-300 transition-colors"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="relative w-[90%] max-w-5xl h-[70vh] md:h-[80vh]">
                        <Image
                            src={allImages[currentIndex]}
                            alt={`${property.title} - image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <button
                        onClick={() =>
                            setCurrentIndex((prev) =>
                                prev === allImages.length - 1 ? 0 : prev + 1
                            )
                        }
                        className="absolute right-4 md:right-8 text-white hover:text-gray-300 transition-colors"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
                        {currentIndex + 1} / {allImages.length}
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}