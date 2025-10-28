"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactFormState {
    name: string;
    email: string;
    phone: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
}

export default function Contact() {
    const { translations } = useLanguage();
    const [form, setForm] = useState<ContactFormState>({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validate = (values: ContactFormState): FormErrors => {
        const newErrors: FormErrors = {};
        if (!values.name.trim()) newErrors.name = translations?.contact?.errors?.nameRequired || "Name is required";
        if (!values.email.trim()) {
            newErrors.email = translations?.contact?.errors?.emailRequired || "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = translations?.contact?.errors?.emailInvalid || "Invalid email format";
        }
        if (!values.phone.trim()) {
            newErrors.phone = translations?.contact?.errors?.phoneRequired || "Phone number is required";
        } else if (!/^\+?[0-9\s-]{7,15}$/.test(values.phone)) {
            newErrors.phone = translations?.contact?.errors?.phoneInvalid || "Invalid phone number format";
        }
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = validate(form);
        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        try {
            setIsSubmitting(true);
            // Placeholder: send to API if available
            await new Promise((res) => setTimeout(res, 800));
            setSubmitted(true);
            setForm({ name: "", email: "", phone: "" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B33791] font-cairo mb-8 text-center">
                    {translations?.contact?.title || "Contact Us"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 md:p-8 rounded-2xl shadow">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">{translations?.contact?.name || "Name"}</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.name ? "border-red-400" : "border-gray-300"}`}
                            placeholder={translations?.contact?.namePlaceholder || "Enter your name"}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && <p id="name-error" className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">{translations?.contact?.email || "Email"}</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.email ? "border-red-400" : "border-gray-300"}`}
                            placeholder={translations?.contact?.emailPlaceholder || "example@email.com"}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">{translations?.contact?.phone || "Phone"}</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.phone ? "border-red-400" : "border-gray-300"}`}
                            placeholder={translations?.contact?.phonePlaceholder || "05xxxxxxxx"}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && <p id="phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-[#B33791] text-white py-3 font-semibold hover:bg-[#a02c82] transition disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? (translations?.contact?.submitting || "Sending...") : (translations?.contact?.submit || "Send")}
                    </button>

                    {submitted && (
                        <p className="text-green-600 text-center">{translations?.contact?.success || "Your details have been sent successfully."}</p>
                    )}
                </form>
            </div>
        </section>
    );
}