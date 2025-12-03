import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import styles from "./Combobox.module.scss";
import Box from "../Box/Box";
import SmallArrowRightIcon from "../icons/SmallArrowRightIcon";
import Typography from "../Typography/Typography";

export type ComboboxOption = { label: string; value: string };

export type ComboboxProps = {
  options: Array<ComboboxOption>;
  onChange?: (value: string | undefined) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
  className?: string;
};

export default function Combobox(props: ComboboxProps) {
  const {
    options,
    onChange,
    name,
    label,
    placeholder = "Select an option",
    noOptionsText = "No options found",
    className,
  } = props;

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

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);
    // Open when it is typed
    setIsOpen(true);
  };

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    // return all options if query is empty
    if (!query) return options;

    const filteredOptions = options.filter(({ label, value }) => {
      const labelText = label.toLowerCase();
      const valueText = value.toLowerCase();
      // return even if it is a partial match
      return labelText.includes(query) || valueText.includes(query);
    });

    return filteredOptions;
  }, [inputValue, options]);

  const hasLabel = Boolean(label);
  const shouldFloatLabel = hasLabel && (isOpen || inputValue || !!inputValue);

  return (
    <Box rg={8}>
      <div ref={containerRef} className={`${styles.host}`}>
        <input
          ref={inputRef}
          className={`${styles.control} ${className ?? ""} ${
            hasLabel ? styles.inputWithLabel : ""
          }`}
          type="text"
          value={inputValue}
          onClick={openList}
          onChange={handleInputChange}
          placeholder={label ? label : placeholder}
        />

        {label && (
          <Typography
            component="label"
            color="black_a60"
            variant="button__forms16_book"
            className={`${styles.label} ${
              shouldFloatLabel ? styles.labelRaised : ""
            }`}
          >
            {label}
          </Typography>
        )}

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
            {filteredOptions.map((option) => {
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

            {!filteredOptions.length && (
              <div className={`${styles.option} ${styles.empty}`}>
                {noOptionsText}
              </div>
            )}
          </div>
        )}

        {/* hidden input to store the selected value */}
        <input type="hidden" name={name} value={selectedValue || ""} />
      </div>
    </Box>
  );
}
