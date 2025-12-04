import {
  ChangeEventHandler,
  InputHTMLAttributes,
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
import View from "../View/View";

export type ComboboxOption = { label: string; value: string };

type OmittedInputProps = "onChange" | "value" | "defaultValue" | "type";
export type ComboboxProps = {
  options: Array<ComboboxOption>;
  onChange?: (value: string | undefined) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  noOptionsText?: string;
  defaultValue?: string;
  searchByValue?: boolean;
  hostClassName?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, OmittedInputProps>;

export default function Combobox(props: ComboboxProps) {
  const {
    options,
    onChange,
    name,
    label,
    placeholder = "Select an option",
    noOptionsText = "No options found",
    defaultValue,
    searchByValue,
    hostClassName,
    className,
    ...inputAttributes
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue ?? undefined
  );
  const [inputValue, setInputValue] = useState<string>(() => {
    if (!defaultValue) return "";
    const selectedOption = options.find(({ value }) => value === defaultValue);
    return selectedOption?.label ?? "";
  });
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const inputId = useId();
  const listboxId = useId();

  useEffect(() => {
    if (defaultValue === undefined) return;

    setSelectedValue(defaultValue || undefined);
    // the check is case sensitive
    const option = options.find(({ value }) => value === defaultValue);
    setInputValue(option?.label || "");
  }, [defaultValue, options]);

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
      return searchByValue
        ? labelText.includes(query) || valueText.includes(query)
        : labelText.includes(query);
    });

    return filteredOptions;
  }, [inputValue, options, searchByValue]);

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

  const handleBlur = () => {
    // Wait one frame to allow focus to move (e.g. input → option) before deciding to close.
    // Without this, the list would close before option clicks are processed.
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      // this prevents from closing the list while the focus moves from input to options
      const isStillFocusInside = container.contains(document.activeElement);
      if (isStillFocusInside) return;

      closeList();
    });
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

    // isOpen is removed from dependency array intentionally
    // this won't cause any issue for country selector
    // but it'll overwrite the selected highlight to the first option
    // when the list is opened by keyboard and there're still multiple options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, filteredOptions]);

  return (
    <Box rg={8}>
      <div ref={containerRef} onBlur={handleBlur}>
        <View className={`${styles.host} ${hostClassName || ""}`}>
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
            {...inputAttributes}
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
                <div
                  className={`${styles.option} ${styles.empty}`}
                  aria-disabled
                >
                  {noOptionsText}
                </div>
              )}
            </div>
          )}

          {/* hidden input to store the selected value */}
          <input type="hidden" name={name} value={selectedValue || ""} />
        </View>
      </div>
    </Box>
  );
}
