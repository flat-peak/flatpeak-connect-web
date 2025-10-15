import {PropsWithChildren} from "react";
import styles from "./RegionPicker.module.scss";
import DropdownArrow from "../icons/DropdownArrow.tsx";

type RegionPickerProps = {
	options: string[];
	name: string;
	defaultValue?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

export default function RegionPicker(props: PropsWithChildren<RegionPickerProps>) {
    const {name, options, defaultValue, placeholder = "Choose your region", onChange} = props;
    
    return (
        <div className={styles.container}>
					<select 
						name={name}
						defaultValue={defaultValue || ""}
						className={styles.select}
						onChange={(e) => onChange?.(e.target.value)}
						required
					>
						<option value="" disabled hidden>
							{placeholder}
						</option>
						{options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
            </select>
            <div className={styles.chevron}>
							<DropdownArrow />
            </div>
        </div>
    );
}
