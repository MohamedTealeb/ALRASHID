import Academic from "@/components/sections/academic";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Slider from "@/components/sections/slider";
import Video from "@/components/sections/video";

export default function page(){

    return (
        <div>

            <Hero />
            <Academic />
            <Video />
            <Slider />
            <Footer />
        </div>
    )
}
