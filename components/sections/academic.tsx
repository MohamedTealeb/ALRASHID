'use client';

import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Academic() {

    const { translations } = useLanguage();
    return<>

<div className="flex w-full h-screen p-15 flex-row items-center gap-10">
    <div className="w-1/2">
        <h1 className="text-[56px] leading-[1.15] font-extrabold text-[#6C4DF6]">
            {translations.academic?.title}
        </h1>
        <p className="mt-8 text-xl text-black max-w-[720px]">
            {translations.academic?.subtitle}
        </p>
        <div className="mt-10 flex flex-row items-center gap-6">
            <button className="px-8 py-4 rounded-full bg-[#6C4DF6] text-white text-lg font-semibold shadow-[0_10px_20px_rgba(108,77,246,0.35)]">
                {translations.academic?.primaryCta}
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-[#F0C94C] text-[#6C4DF6] bg-white text-lg font-semibold">
                {translations.academic?.secondaryCta}
            </button>
        </div>
    </div>
    <div className="w-1/2">
        <img className="w-full h-auto rounded-xl object-cover" src={ASSETS_PATHS.logo_small} alt="academic" />
    </div>

</div>




</>
}