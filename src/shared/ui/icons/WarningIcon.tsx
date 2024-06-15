import {HTMLAttributes} from "react";
const WarningIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number, color?: string, opacity?: number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={83}
        height={75}
        fill="none"
        viewBox={"0 0 83 75"}
        {...props}
    >
        <path
            fill={props.color || '#fff'}
            fillOpacity={props.opacity ?? 0.2}
            d="M11.633 74.71C4.993 74.71.969 70.103.969 64.126c0-1.836.469-3.71 1.523-5.469L32.805 5.844C34.797 2.289 38.313.492 41.906.492c3.594 0 7.07 1.797 9.102 5.352L81.32 58.656c.977 1.719 1.524 3.633 1.524 5.469 0 5.977-4.024 10.586-10.664 10.586H11.633Zm30.312-26.093c1.914 0 3.047-1.133 3.086-3.242l.586-21.21c.04-2.071-1.601-3.595-3.71-3.595-2.188 0-3.712 1.485-3.673 3.555l.508 21.25c.04 2.07 1.172 3.242 3.203 3.242Zm0 13.086c2.305 0 4.336-1.836 4.336-4.18 0-2.382-1.992-4.218-4.336-4.218-2.383 0-4.375 1.875-4.375 4.218 0 2.305 2.032 4.18 4.375 4.18Z"
        />
    </svg>
)
export default WarningIcon
