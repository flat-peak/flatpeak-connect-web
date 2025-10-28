import {HTMLAttributes} from "react";

const LongArrowRightIcon = (props: HTMLAttributes<SVGElement> & {width?: number, height?: number}) => (
    <svg
        width={props.width || 14}
        height={props.height || 6}
        viewBox="0 0 14 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M-8.78572e-05 3.50003V2.43603H6.99991V3.50003H-8.78572e-05ZM10.9916 3.17693e-05L13.9736 2.96803L10.9916 5.93603H9.59155L12.0276 3.50003H6.58155V2.43603L12.0416 2.45003L9.59155 3.17693e-05H10.9916Z"
            fill="currentColor"
        />
    </svg>
);

export default LongArrowRightIcon;

