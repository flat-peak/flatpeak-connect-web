import {HTMLAttributes} from "react";
import {PeakType} from "../../../features/connect/lib/types.ts";


const ColorMap:Record<PeakType, string> = {
    Low: "#6FCF97",
    Medium: "#7857FF",
    High: "#FA4D56",
}

const ColorDotIcon = ({peak, ...props}: HTMLAttributes<SVGElement> & {width?: number, height?: number, peak: PeakType}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={9}
        height={9}
        fill="none"
        {...props}
    >
        <circle cx={4.4} cy={4.6} r={4.4} fill={ColorMap[peak]} />
    </svg>
)
export default ColorDotIcon
