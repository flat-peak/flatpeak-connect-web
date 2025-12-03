import {
  ChangeEventHandler,
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const inputId = useId();
  const listboxId = useId();

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;

    // follow the highlighted option and keep it inside the scroll window
    const node = optionRefs.current[highlightedIndex];
    node?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen]);

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

  const updateHighlight = (nextIndex: number) => {
    if (!filteredOptions.length) {
      setHighlightedIndex(-1);
      return;
    }

    const lastIndex = filteredOptions.length - 1;
    if (nextIndex < 0) {
      setHighlightedIndex(lastIndex);
    } else if (nextIndex > lastIndex) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(nextIndex);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        openList();
        updateHighlight(highlightedIndex + 1);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        openList();
        updateHighlight(highlightedIndex - 1);
        break;
      }
      case "Enter": {
        const hasSelected = highlightedIndex >= 0;
        if (isOpen && hasSelected) {
          event.preventDefault();
          const option = filteredOptions[highlightedIndex];
          if (option) {
            selectOption(option);
          }
        }
        break;
      }
      case "Escape": {
        if (isOpen) {
          event.preventDefault();
          closeList();
          inputRef.current?.blur();
        }
        break;
      }

      default: {
        break;
      }
    }
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

  const openList = () => {
    if (!isOpen) {
      setIsOpen(true);

      const selectedIndex = filteredOptions.findIndex(
        ({ value }) => value === selectedValue
      );
      const nextIndex =
        filteredOptions.length === 0
          ? -1
          : selectedIndex >= 0
          ? selectedIndex
          : 0;

      setHighlightedIndex(nextIndex);
    }
  };

  const closeList = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);

    // reset to selected label
    const selectedOption = options.find(({ value }) => value === selectedValue);
    if (selectedOption) {
      setInputValue(selectedOption?.label);
    }
  };

  const hasLabel = Boolean(label);
  const shouldFloatLabel = hasLabel && (isOpen || !!inputValue);

  // actual focus is on the input tag. This is used to inform screen reader current active option
  const activeOption =
    highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : undefined;
  const activeDescendantId = activeOption
    ? `${listboxId}-option-${activeOption.value}`
    : undefined;

  // focus the first option when there're options
  useEffect(() => {
    if (!isOpen) return;
    if (inputValue.trim() === "") {
      setHighlightedIndex(-1);
      return;
    }
    const hasOption = filteredOptions.length > 0;
    setHighlightedIndex(hasOption ? 0 : -1);
  }, [isOpen, inputValue, filteredOptions]);

  return (
    <Box rg={8}>
      <div ref={containerRef} className={`${styles.host}`}>
        <input
          ref={inputRef}
          id={inputId}
          className={`${styles.control} ${className ?? ""} ${
            hasLabel ? styles.inputWithLabel : ""
          }`}
          type="text"
          value={inputValue}
          onClick={openList}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={label ? label : placeholder}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendantId}
        />

        {label && (
          <Typography
            component="label"
            color="black_a60"
            variant="button__forms16_book"
            className={`${styles.label} ${
              shouldFloatLabel ? styles.labelRaised : ""
            }`}
            htmlFor={inputId}
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
          <div className={`${styles.popover}`} role="listbox" id={listboxId}>
            {filteredOptions.map((option, index) => {
              const { label, value } = option;
              const isSelected = value === selectedValue;
              const isActive = index === highlightedIndex;

              return (
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  id={`${listboxId}-option-${value}`}
                  key={value}
                  type="button"
                  className={`${styles.option} ${
                    isSelected ? styles.selected : ""
                  } ${isActive ? styles.active : ""}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {label}
                </button>
              );
            })}

            {!filteredOptions.length && (
              <div className={`${styles.option} ${styles.empty}`} aria-disabled>
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
