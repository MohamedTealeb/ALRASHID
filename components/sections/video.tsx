`use client`
import { ASSETS_PATHS } from "../constants/AssetsPaths";




export default function Video() {

    return<>    
<div>
    <video className="w-full p-15 mx-auto h-auto" autoPlay controls  controlsList="nodownload" muted  loop >
        <source src={ASSETS_PATHS.video} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
</div>


</>
    }
