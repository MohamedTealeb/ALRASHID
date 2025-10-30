"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactFormState {
    appliedClass: string; // الصف المتقدم له
    studentCivilId: string; // رقم مدني الطالب
    studentName: string; // اسم الطالب
    nationality: string; // الجنسية
    guardianName: string; // اسم ولي الأمر
    fatherCivilId: string; // رقم مدني الاب
    birthDate: string; // تاريخ الميلاد (yyyy-mm-dd)
    residencyExpiry: string; // تاريخ انتهاء الاقامه (yyyy-mm-dd)
    passportNumber: string; // رقم جواز سفر الطالب
    passportExpiry: string; // تاريخ انتهاء جواز السفر (yyyy-mm-dd)
    photo: File | null; // صورة شخصية خلفية زرقاء
    specialNeeds: boolean | null; // هل الطفل يندرج تحت الحالات الخاصة
    agreement: boolean; // إقرار صحة البيانات
}

interface FormErrors {
    appliedClass?: string;
    studentCivilId?: string;
    studentName?: string;
    nationality?: string;
    guardianName?: string;
    fatherCivilId?: string;
    birthDate?: string;
    residencyExpiry?: string;
    passportNumber?: string;
    passportExpiry?: string;
    photo?: string;
    specialNeeds?: string;
    agreement?: string;
}

export default function Contact() {
    const { translations } = useLanguage();
    const t = (translations as any)?.contact || {};
    const c = (translations as any)?.common || {};
    const [form, setForm] = useState<ContactFormState>({
        appliedClass: "",
        studentCivilId: "",
        studentName: "",
        nationality: "",
        guardianName: "",
        fatherCivilId: "",
        birthDate: "",
        residencyExpiry: "",
        passportNumber: "",
        passportExpiry: "",
        photo: null,
        specialNeeds: null,
        agreement: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const validate = (values: ContactFormState): FormErrors => {
        const newErrors: FormErrors = {};
        if (!values.appliedClass.trim()) newErrors.appliedClass = t?.errors?.appliedClassRequired || "الرجاء إدخال الصف المتقدم له";
        if (!values.studentCivilId.trim()) newErrors.studentCivilId = t?.errors?.studentCivilIdRequired || "الرجاء إدخال رقم مدني الطالب";
        if (!values.studentName.trim()) newErrors.studentName = t?.errors?.studentNameRequired || "الرجاء إدخال اسم الطالب";
        if (!values.nationality.trim()) newErrors.nationality = t?.errors?.nationalityRequired || "الرجاء إدخال الجنسية";
        if (!values.guardianName.trim()) newErrors.guardianName = t?.errors?.guardianNameRequired || "الرجاء إدخال اسم ولي الأمر";
        if (!values.fatherCivilId.trim()) newErrors.fatherCivilId = t?.errors?.fatherCivilIdRequired || "الرجاء إدخال رقم مدني الأب";
        if (!values.birthDate) newErrors.birthDate = t?.errors?.birthDateRequired || "الرجاء إدخال تاريخ الميلاد";
        if (!values.residencyExpiry) newErrors.residencyExpiry = t?.errors?.residencyExpiryRequired || "الرجاء إدخال تاريخ انتهاء الإقامة";
        if (!values.passportNumber.trim()) newErrors.passportNumber = t?.errors?.passportNumberRequired || "الرجاء إدخال رقم جواز السفر";
        if (!values.passportExpiry) newErrors.passportExpiry = t?.errors?.passportExpiryRequired || "الرجاء إدخال تاريخ انتهاء الجواز";
        if (!values.photo) newErrors.photo = t?.errors?.photoRequired || "الرجاء رفع صورة شخصية بخلفية زرقاء";
        if (values.specialNeeds === null) newErrors.specialNeeds = t?.errors?.specialNeedsRequired || "الرجاء اختيار نعم أو لا";
        if (!values.agreement) newErrors.agreement = t?.errors?.agreementRequired || "يجب الإقرار بصحة البيانات";
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const newValue = type === "radio" ? (value === "yes") : value;
        setForm((prev) => ({ ...prev, [name]: newValue as never }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
        setForm((prev) => ({ ...prev, photo: file }));
        if (errors.photo) {
            setErrors((prev) => ({ ...prev, photo: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = validate(form);
        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        try {
            setIsSubmitting(true);
            setSubmitError(null);
            const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || t?.formspreeEndpoint;
            if (!endpoint) {
                throw new Error("Form endpoint not configured");
            }

            const formData = new FormData();
            formData.append("appliedClass", form.appliedClass);
            formData.append("studentCivilId", form.studentCivilId);
            formData.append("studentName", form.studentName);
            formData.append("nationality", form.nationality);
            formData.append("guardianName", form.guardianName);
            formData.append("fatherCivilId", form.fatherCivilId);
            formData.append("birthDate", form.birthDate);
            formData.append("residencyExpiry", form.residencyExpiry);
            formData.append("passportNumber", form.passportNumber);
            formData.append("passportExpiry", form.passportExpiry);
            formData.append("specialNeeds", String(form.specialNeeds));
            formData.append("agreement", String(form.agreement));
            if (form.photo) formData.append("photo", form.photo);

            const resp = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });
            if (!resp.ok) {
                throw new Error("Failed to submit");
            }
            setSubmitted(true);
            setForm({
                appliedClass: "",
                studentCivilId: "",
                studentName: "",
                nationality: "",
                guardianName: "",
                fatherCivilId: "",
                birthDate: "",
                residencyExpiry: "",
                passportNumber: "",
                passportExpiry: "",
                photo: null,
                specialNeeds: null,
                agreement: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B33791] font-cairo mb-8 text-center">
                    {t?.title || "التقديم والبيانات"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 md:p-8 rounded-2xl shadow" dir="rtl">
                    <div>
                        <label htmlFor="appliedClass" className="block mb-2 font-medium text-gray-700">{t?.fields?.appliedClass?.label || "الصف المتقدم له"}</label>
                        <input
                            id="appliedClass"
                            name="appliedClass"
                            type="text"
                            value={form.appliedClass}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.appliedClass ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.appliedClass?.placeholder || "مثال: الصف الأول"}
                            aria-invalid={Boolean(errors.appliedClass)}
                            aria-describedby={errors.appliedClass ? "appliedClass-error" : undefined}
                        />
                        {errors.appliedClass && <p id="appliedClass-error" className="mt-2 text-sm text-red-600">{errors.appliedClass}</p>}
                    </div>

                    <div>
                        <label htmlFor="studentCivilId" className="block mb-2 font-medium text-gray-700">{t?.fields?.studentCivilId?.label || "رقم مدني الطالب"}</label>
                        <input
                            id="studentCivilId"
                            name="studentCivilId"
                            type="text"
                            value={form.studentCivilId}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.studentCivilId ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.studentCivilId?.placeholder || "مثال: 123456789012"}
                            aria-invalid={Boolean(errors.studentCivilId)}
                            aria-describedby={errors.studentCivilId ? "studentCivilId-error" : undefined}
                        />
                        {errors.studentCivilId && <p id="studentCivilId-error" className="mt-2 text-sm text-red-600">{errors.studentCivilId}</p>}
                    </div>

                    <div>
                        <label htmlFor="studentName" className="block mb-2 font-medium text-gray-700">{t?.fields?.studentName?.label || "اسم الطالب"}</label>
                        <input
                            id="studentName"
                            name="studentName"
                            type="text"
                            value={form.studentName}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.studentName ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.studentName?.placeholder || "أدخل اسم الطالب"}
                            aria-invalid={Boolean(errors.studentName)}
                            aria-describedby={errors.studentName ? "studentName-error" : undefined}
                        />
                        {errors.studentName && <p id="studentName-error" className="mt-2 text-sm text-red-600">{errors.studentName}</p>}
                    </div>

                    <div>
                        <label htmlFor="nationality" className="block mb-2 font-medium text-gray-700">{t?.fields?.nationality?.label || "الجنسية"}</label>
                        <input
                            id="nationality"
                            name="nationality"
                            type="text"
                            value={form.nationality}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.nationality ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.nationality?.placeholder || "أدخل الجنسية"}
                            aria-invalid={Boolean(errors.nationality)}
                            aria-describedby={errors.nationality ? "nationality-error" : undefined}
                        />
                        {errors.nationality && <p id="nationality-error" className="mt-2 text-sm text-red-600">{errors.nationality}</p>}
                    </div>

                    <div>
                        <label htmlFor="guardianName" className="block mb-2 font-medium text-gray-700">{t?.fields?.guardianName?.label || "اسم ولي الأمر"}</label>
                        <input
                            id="guardianName"
                            name="guardianName"
                            type="text"
                            value={form.guardianName}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.guardianName ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.guardianName?.placeholder || "أدخل اسم ولي الأمر"}
                            aria-invalid={Boolean(errors.guardianName)}
                            aria-describedby={errors.guardianName ? "guardianName-error" : undefined}
                        />
                        {errors.guardianName && <p id="guardianName-error" className="mt-2 text-sm text-red-600">{errors.guardianName}</p>}
                    </div>

                    <div>
                        <label htmlFor="fatherCivilId" className="block mb-2 font-medium text-gray-700">{t?.fields?.fatherCivilId?.label || "رقم مدني الاب"}</label>
                        <input
                            id="fatherCivilId"
                            name="fatherCivilId"
                            type="text"
                            value={form.fatherCivilId}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.fatherCivilId ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.fatherCivilId?.placeholder || "مثال: 123456789012"}
                            aria-invalid={Boolean(errors.fatherCivilId)}
                            aria-describedby={errors.fatherCivilId ? "fatherCivilId-error" : undefined}
                        />
                        {errors.fatherCivilId && <p id="fatherCivilId-error" className="mt-2 text-sm text-red-600">{errors.fatherCivilId}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="birthDate" className="block mb-2 font-medium text-gray-700">{t?.fields?.birthDate?.label || "تاريخ الميلاد"}</label>
                            <input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                value={form.birthDate}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.birthDate ? "border-red-400" : "border-gray-300"}`}
                                aria-invalid={Boolean(errors.birthDate)}
                                aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                            />
                            {errors.birthDate && <p id="birthDate-error" className="mt-2 text-sm text-red-600">{errors.birthDate}</p>}
                        </div>
                        <div>
                            <label htmlFor="residencyExpiry" className="block mb-2 font-medium text-gray-700">{t?.fields?.residencyExpiry?.label || "تاريخ انتهاء الاقامة"}</label>
                            <input
                                id="residencyExpiry"
                                name="residencyExpiry"
                                type="date"
                                value={form.residencyExpiry}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.residencyExpiry ? "border-red-400" : "border-gray-300"}`}
                                aria-invalid={Boolean(errors.residencyExpiry)}
                                aria-describedby={errors.residencyExpiry ? "residencyExpiry-error" : undefined}
                            />
                            {errors.residencyExpiry && <p id="residencyExpiry-error" className="mt-2 text-sm text-red-600">{errors.residencyExpiry}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="passportNumber" className="block mb-2 font-medium text-gray-700">{t?.fields?.passportNumber?.label || "رقم جواز سفر الطالب"}</label>
                        <input
                            id="passportNumber"
                            name="passportNumber"
                            type="text"
                            value={form.passportNumber}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.passportNumber ? "border-red-400" : "border-gray-300"}`}
                            placeholder={t?.fields?.passportNumber?.placeholder || "أدخل رقم الجواز"}
                            aria-invalid={Boolean(errors.passportNumber)}
                            aria-describedby={errors.passportNumber ? "passportNumber-error" : undefined}
                        />
                        {errors.passportNumber && <p id="passportNumber-error" className="mt-2 text-sm text-red-600">{errors.passportNumber}</p>}
                    </div>

                    <div>
                        <label htmlFor="passportExpiry" className="block mb-2 font-medium text-gray-700">{t?.fields?.passportExpiry?.label || "تاريخ انتهاء جواز السفر"}</label>
                        <input
                            id="passportExpiry"
                            name="passportExpiry"
                            type="date"
                            value={form.passportExpiry}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.passportExpiry ? "border-red-400" : "border-gray-300"}`}
                            aria-invalid={Boolean(errors.passportExpiry)}
                            aria-describedby={errors.passportExpiry ? "passportExpiry-error" : undefined}
                        />
                        {errors.passportExpiry && <p id="passportExpiry-error" className="mt-2 text-sm text-red-600">{errors.passportExpiry}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">{t?.fields?.photo?.label || "اضافة صوره شخصي للطالب خلفية زرقاء"}</label>
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={`w-full rounded-lg border px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#B33791] file:text-white hover:file:bg-[#a02c82] ${errors.photo ? "border-red-400" : "border-gray-300"}`}
                            aria-invalid={Boolean(errors.photo)}
                            aria-describedby={errors.photo ? "photo-error" : undefined}
                        />
                        {errors.photo && <p id="photo-error" className="mt-2 text-sm text-red-600">{errors.photo}</p>}
                    </div>

                    <div>
                        <span className="block mb-2 font-medium text-gray-700">{t?.fields?.specialNeeds?.label || "هل الطفل يندرج تحت الحالات الخاصه"}</span>
                        <div className="flex items-center gap-6">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="specialNeeds"
                                    value="yes"
                                    checked={form.specialNeeds === true}
                                    onChange={handleChange}
                                />
                                <span>{c?.yes || "نعم"}</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="specialNeeds"
                                    value="no"
                                    checked={form.specialNeeds === false}
                                    onChange={handleChange}
                                />
                                <span>{c?.no || "لا"}</span>
                            </label>
                        </div>
                        {errors.specialNeeds && <p className="mt-2 text-sm text-red-600">{errors.specialNeeds}</p>}
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                id="agreement"
                                name="agreement"
                                type="checkbox"
                                checked={form.agreement}
                                onChange={(e) => {
                                    setForm((prev) => ({ ...prev, agreement: e.target.checked }));
                                    if (errors.agreement) setErrors((prev) => ({ ...prev, agreement: undefined }));
                                }}
                            />
                            <span className="text-sm text-gray-700">{t?.fields?.agreement?.label || "اقر بأن جميع البيانات المدخلة صحيحة"}</span>
                        </label>
                        {errors.agreement && <p className="mt-2 text-sm text-red-600">{errors.agreement}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-[#B33791] text-white py-3 font-semibold hover:bg-[#a02c82] transition disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? (t?.submitting || "جاري الإرسال...") : (t?.submit || "إرسال")}
                    </button>

                    {submitError && (
                        <p className="text-red-600 text-center">{t?.errors?.submitFailed || "حدث خطأ أثناء الإرسال، حاول مرة أخرى."}</p>
                    )}
                    {submitted && (
                        <p className="text-green-600 text-center">{t?.success || "تم إرسال البيانات بنجاح."}</p>
                    )}
                </form>
            </div>
        </section>
    );
}