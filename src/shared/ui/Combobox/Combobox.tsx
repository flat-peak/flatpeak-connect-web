import styles from "./Combobox.module.scss";

export type ComboboxProps = {
  label?: string;
  className?: string;
};

export default function Combobox(props: ComboboxProps) {
  const { label } = props;
  return <div className={styles.host}>Combobox {label}</div>;
}
