import ArrowLeftIcon from "../icons/ArrowLeftIcon.tsx";
import CloseIcon from "../icons/CloseIcon.tsx";
import TouchableOpacity from "../../TouchahbleOpacity/TouchableOpacity.tsx";
import {ButtonHTMLAttributes} from "react";

type NavigationButtonProps = {
    action: "Close" | "Left"
} & ButtonHTMLAttributes<HTMLButtonElement>
export default function NavigationButton(props: NavigationButtonProps) {
    const {action, ...buttonAttributes} = props;
    const Tag = action === 'Close' ? CloseIcon : ArrowLeftIcon;
    return <TouchableOpacity {...buttonAttributes}><Tag width={48} height={48}/></TouchableOpacity>
}
