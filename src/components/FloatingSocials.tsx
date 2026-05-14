"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// All custom icons since lucide-react version is limited
const PhoneIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const EmailIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

// const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//     </svg>
// );

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

// const XIcon = ({ size = 20 }: { size?: number }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//     </svg>
// );

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.2 0 .39.02.58.05V9.66a6.33 6.33 0 0 0-.58-.03A6.34 6.34 0 0 0 3.24 16a6.34 6.34 0 0 0 6.33 6.33 6.34 6.34 0 0 0 6.33-6.33V8.83a8.36 8.36 0 0 0 4.89 1.58V7.07a4.97 4.97 0 0 1-1.2-.38z" />
    </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const PlusIcon = ({ size = 28 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const socials = [
    { icon: PhoneIcon, href: "tel:+254706253252", color: "bg-green-600", label: "Call" },
    { icon: EmailIcon, href: "mailto:homezyrealtyke@gmail.com", color: "bg-red-500", label: "Email" },
    // { icon: LinkedinIcon, href: "https://linkedin.com", color: "bg-[#0077b5]", label: "LinkedIn" },
    { icon: FacebookIcon, href: "https://www.facebook.com/share/18qMebaJrk/?mibextid=wwXIfr", color: "bg-[#1877f2]", label: "Facebook" },
    { icon: TikTokIcon, href: "https://tiktok.com", color: "bg-black", label: "TikTok" },
    { icon: InstagramIcon, href: "https://www.instagram.com/homezyrealtyke?igsh=dGVubzlwY2RxcnFy&utm_source=qr", color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600", label: "Instagram" },
    // { icon: XIcon, href: "https://x.com", color: "bg-black", label: "X" },
    { icon: YoutubeIcon, href: "https://youtube.com", color: "bg-[#ff0000]", label: "YouTube" },
];

export default function FloatingSocials() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed left-4 bottom-20 z-50 flex flex-col items-center gap-3">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {socials.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, scale: 0, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0, y: 20 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                                title={social.label}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button - Changed to green */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 ${isOpen ? "bg-homezy-primary text-white" : "bg-[#004d40] text-white"
                    }`}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <PlusIcon size={28} />
                </motion.div>
            </motion.button>
        </div>
    );
}