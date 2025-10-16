import styles from "./Select.module.scss";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import Box from "../Box/Box.tsx";
import {InputHTMLAttributes} from "react";
import SmallArrowRightIcon from "../icons/SmallArrowRightIcon.tsx";

type SelectProps = {
    options: Array<{label: string, value: string}>;
    label?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    hostClassName?: string;
} & Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'>

export default function Select(props: SelectProps) {
	const {label, defaultValue, options, placeholder, onChange, hostClassName, ...inputAttributes } = props

	return (
		<Box rg={8}>
			<View className={`${styles.host} ${hostClassName || ''}`}>
				{label && (
					<Typography
						color={'black_a60'}
						variant="button__forms16_book"
						component={"label"}
						className={styles.label}
					>{label}</Typography>
				)}
				<select
					defaultValue={defaultValue}
					className={`${styles.control} ${label && styles.inputWithLabel}`}
					onChange={(e) => onChange?.(e.target.value)}
					{...inputAttributes}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					))}
				</select>

				<div className={styles.chevron}>
					<SmallArrowRightIcon />
				</div>
			</View>
		</Box>
	);
}
