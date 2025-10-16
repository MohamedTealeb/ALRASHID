import Academic from "@/components/sections/academic";
import AcademicSections from "@/components/sections/academicSections";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Slider from "@/components/sections/slider";
import Video from "@/components/sections/video";
import About from "@/components/sections/about";

export default function page(){
    return (
        <div>
            <Hero />
            <About />
            <AcademicSections />
            <Academic /> 
            <Video />
            <Slider />
            <Footer />
        </div>
    )
}



