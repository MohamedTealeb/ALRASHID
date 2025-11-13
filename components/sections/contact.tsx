"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { UseEmail } from "@/hooks/use-email";

interface Sibling {
    name: string;
    class: string;
}

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
    specialNeeds: boolean | null; // هل الطفل يندرج تحت الحالات الخاصة
    hasSiblings: boolean | null; // هل للطالب أخ أو أخت بالمدرسة
    siblings: Sibling[]; // بيانات الأخوة
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
    specialNeeds?: string;
    hasSiblings?: string;
    siblings?: string;
    agreement?: string;
}

export default function Contact() {
    const { translations } = useLanguage();
    const t = translations.contact;
    const c = translations.common as { [key: string]: string };
    const emailMutation = UseEmail();
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
        specialNeeds: null,
        hasSiblings: null,
        siblings: [],
        agreement: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

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
        if (values.specialNeeds === null) newErrors.specialNeeds = t?.errors?.specialNeedsRequired || "الرجاء اختيار نعم أو لا";
        if (values.hasSiblings === null) {
            const errorsObj = t?.errors as Record<string, string> | undefined;
            newErrors.hasSiblings = errorsObj?.hasSiblingsRequired || "الرجاء اختيار نعم أو لا";
        }
        if (values.hasSiblings === true) {
            const errorsObj = t?.errors as Record<string, string> | undefined;
            if (values.siblings.length === 0) {
                newErrors.siblings = errorsObj?.siblingsRequired || "الرجاء إضافة بيانات الأخ أو الأخت";
            } else {
                // التحقق من أن جميع الأخوة لديهم اسم وصف
                const incompleteSibling = values.siblings.find(s => !s.name.trim() || !s.class.trim());
                if (incompleteSibling) {
                    newErrors.siblings = errorsObj?.siblingInfoRequired || "الرجاء إدخال الاسم والصف لجميع الأخوة";
                }
            }
        }
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
        // إذا تغير appliedClass إلى غير "تانيه روضة"، امسح الصورة
        if (name === "appliedClass") {
            const secondKGValue = t?.fields?.appliedClass?.options?.secondKG || "تانيه روضة";
            if (value !== secondKGValue) {
                setImageFile(null);
            }
        }
    };


    const addSibling = () => {
        setForm((prev) => ({
            ...prev,
            siblings: [...prev.siblings, { name: "", class: "" }]
        }));
        if (errors.siblings) {
            setErrors((prev) => ({ ...prev, siblings: undefined }));
        }
    };

    const removeSibling = (index: number) => {
        setForm((prev) => ({
            ...prev,
            siblings: prev.siblings.filter((_, i) => i !== index)
        }));
    };

    const updateSibling = (index: number, field: keyof Sibling, value: string) => {
        setForm((prev) => ({
            ...prev,
            siblings: prev.siblings.map((sibling, i) =>
                i === index ? { ...sibling, [field]: value } : sibling
            )
        }));
        if (errors.siblings) {
            setErrors((prev) => ({ ...prev, siblings: undefined }));
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
            setSubmitted(false);
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
            formData.append("specialNeeds", form.specialNeeds ? "1" : "0");
            formData.append("hasSiblings", form.hasSiblings ? "1" : "0");
            form.siblings.forEach((sibling, index) => {
                formData.append(`siblings[${index}][name]`, sibling.name);
                formData.append(`siblings[${index}][class]`, sibling.class);
            });
            formData.append("agreement", form.agreement ? "1" : "0");
            if (imageFile) {
                formData.append("certificate", imageFile);
            }

            await emailMutation.mutateAsync(formData);

            // نجح الإرسال عبر الـ endpoint
            setSubmitted(true);
            setSubmitError(null);
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
                specialNeeds: null,
                hasSiblings: null,
                siblings: [],
                agreement: false,
            });
            setImageFile(null);
        } catch (error) {
            // معالجة الأخطاء
            const errorMessage = error instanceof Error 
                ? error.message 
                : t?.errors?.submitFailed || "حدث خطأ أثناء الإرسال، حاول مرة أخرى.";
            
            setSubmitError(errorMessage);
            setSubmitted(false);
            console.error("Form submission error:", error);
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
                <form onSubmit={handleSubmit} method="POST" className="space-y-6 bg-gray-50 p-6 md:p-8 rounded-2xl shadow" dir="rtl">
                    <div>
                        <label htmlFor="appliedClass" className="block mb-2 font-medium text-gray-700">{t?.fields?.appliedClass?.label || "الصف المتقدم له"}</label>
                        <select
                            id="appliedClass"
                            name="appliedClass"
                            value={form.appliedClass}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] ${errors.appliedClass ? "border-red-400" : "border-gray-300"}`}
                            aria-invalid={Boolean(errors.appliedClass)}
                            aria-describedby={errors.appliedClass ? "appliedClass-error" : undefined}
                        >
                            <option value="">{t?.fields?.appliedClass?.selectPlaceholder || "اختر الصف"}</option>
                            <option value={t?.fields?.appliedClass?.options?.firstKG || "أولي روضة"}>{t?.fields?.appliedClass?.options?.firstKG || "أولي روضة"}</option>
                            <option value={t?.fields?.appliedClass?.options?.secondKG || "تانيه روضة"}>{t?.fields?.appliedClass?.options?.secondKG || "تانيه روضة"}</option>
                        </select>
                        {errors.appliedClass && <p id="appliedClass-error" className="mt-2 text-sm text-red-600">{errors.appliedClass}</p>}
                    </div>

                    {form.appliedClass === (t?.fields?.appliedClass?.options?.secondKG || "تانيه روضة") && (
                        <div>
                            <label htmlFor="certificate" className="block mb-2 font-medium text-gray-700">{t?.fields?.certificate?.label || "يبعت الشهاده"}</label>
                            <input
                                id="certificate"
                                name="certificate"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                                    setImageFile(file);
                                }}
                                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B33791] border-gray-300"
                            />
                        </div>
                    )}

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

                    <div>
                        <span className="block mb-2 font-medium text-gray-700">
                            {(t?.fields as Record<string, { label?: string }>)?.hasSiblings?.label || "هل للطالب أخ أو أخت بالمدرسة؟"}
                        </span>
                        <div className="flex items-center gap-6">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="hasSiblings"
                                    value="yes"
                                    checked={form.hasSiblings === true}
                                    onChange={() => {
                                        setForm((prev) => ({
                                            ...prev,
                                            hasSiblings: true,
                                            siblings: prev.siblings.length === 0 ? [{ name: "", class: "" }] : prev.siblings
                                        }));
                                        if (errors.hasSiblings || errors.siblings) {
                                            setErrors((prev) => ({ ...prev, hasSiblings: undefined, siblings: undefined }));
                                        }
                                    }}
                                />
                                <span>{c?.yes || "نعم"}</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="hasSiblings"
                                    value="no"
                                    checked={form.hasSiblings === false}
                                    onChange={() => {
                                        setForm((prev) => ({
                                            ...prev,
                                            hasSiblings: false,
                                            siblings: []
                                        }));
                                        if (errors.hasSiblings || errors.siblings) {
                                            setErrors((prev) => ({ ...prev, hasSiblings: undefined, siblings: undefined }));
                                        }
                                    }}
                                />
                                <span>{c?.no || "لا"}</span>
                            </label>
                        </div>
                        {errors.hasSiblings && <p className="mt-2 text-sm text-red-600">{errors.hasSiblings}</p>}

                        {form.hasSiblings === true && (
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-700">
                                        {(t?.fields as Record<string, { title?: string }>)?.siblings?.title || "بيانات الأخوة"}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={addSibling}
                                        className="text-sm text-[#B33791] hover:text-[#a02c82] font-medium"
                                    >
                                        {(t?.fields as Record<string, { addButton?: string }>)?.siblings?.addButton || "+ إضافة أخ/أخت"}
                                    </button>
                                </div>
                                
                                {form.siblings.map((sibling, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-300 space-y-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <h5 className="text-sm font-medium text-gray-600">
                                                {(t?.fields as Record<string, { siblingLabel?: string }>)?.siblings?.siblingLabel || "أخ/أخت"} {index + 1}
                                            </h5>
                                            {form.siblings.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSibling(index)}
                                                    className="text-sm text-red-600 hover:text-red-700"
                                                >
                                                    {(t?.fields as Record<string, { removeButton?: string }>)?.siblings?.removeButton || "حذف"}
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                                    {(t?.fields as Record<string, { nameLabel?: string }>)?.siblings?.nameLabel || "الاسم"}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={sibling.name}
                                                    onChange={(e) => updateSibling(index, "name", e.target.value)}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B33791]"
                                                    placeholder={(t?.fields as Record<string, { namePlaceholder?: string }>)?.siblings?.namePlaceholder || "أدخل الاسم"}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                                    {(t?.fields as Record<string, { classLabel?: string }>)?.siblings?.classLabel || "الصف"}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={sibling.class}
                                                    onChange={(e) => updateSibling(index, "class", e.target.value)}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B33791]"
                                                    placeholder={(t?.fields as Record<string, { classPlaceholder?: string }>)?.siblings?.classPlaceholder || "أدخل الصف"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {errors.siblings && <p className="mt-2 text-sm text-red-600">{errors.siblings}</p>}
                            </div>
                        )}
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
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <p className="text-red-600 font-medium">{submitError}</p>
                            <p className="text-red-500 text-sm mt-1">{t?.errors?.submitFailed || "يرجى المحاولة مرة أخرى."}</p>
                        </div>
                    )}
                    {submitted && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <p className="text-green-600 font-medium text-lg">{t?.success || "تم إرسال البيانات بنجاح."}</p>
                            <p className="text-green-500 text-sm mt-1">{t?.thankYou || "شكراً لك على تقديمك!"}</p>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}