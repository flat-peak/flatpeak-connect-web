import { useRef, useState } from "react";
import styles from "./Combobox.module.scss";
import Box from "../Box/Box";
import SmallArrowRightIcon from "../icons/SmallArrowRightIcon";

export type ComboboxOption = { label: string; value: string };

export type ComboboxProps = {
  options: Array<ComboboxOption>;
  onChange?: (value: string | undefined) => void;
  name?: string;
  label?: string;
  className?: string;
};

export default function Combobox(props: ComboboxProps) {
  const { options, onChange, name, label, className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openList = () => {
    setIsOpen(true);
  };
  const closeList = () => {
    setIsOpen(false);
  };

  const selectOption = (option: ComboboxOption) => {
    const { label, value } = option;
    setSelectedValue(value);
    setInputValue(label);
    setIsOpen(false);
    onChange?.(value);
    inputRef.current?.focus();
  };

  return (
    <Box rg={8}>
      <div ref={containerRef} className={`${styles.host}`}>
        <input
          ref={inputRef}
          className={`${styles.control} ${className ?? ""}`}
          type="text"
          value={inputValue}
          onClick={openList}
          readOnly
        />

        <div
          className={`${styles.chevron}`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={isOpen ? closeList : openList}
        >
          <SmallArrowRightIcon direction={isOpen ? "up" : "down"} />
        </div>

        {/* select options come here */}
        {isOpen && (
          <div className={`${styles.popover}`}>
            {options.map((option) => {
              const { label, value } = option;
              const isSelected = value === selectedValue;
              return (
                <button
                  key={value}
                  type="button"
                  className={`${styles.option} ${
                    isSelected ? styles.selected : ""
                  }`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* hidden input to store the selected value */}
        <input type="hidden" name={name} value={selectedValue || ""} />
      </div>
    </Box>
  );
}
