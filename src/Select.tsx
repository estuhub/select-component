import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
    label: string,
    value: string | number,
}

type MultipleSelectProps = {
    value?: SelectOption[]
    onChange: (value: SelectOption[]) => void
    multiple: true
}

type SingleSelectProps = {
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
    multiple?: false
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(undefined)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value?.includes(option)) {
                // if the option was already selected, it will deselected
                onChange(value.filter(o => o !== option))
            } else {
                // if the option was not selected, it will add it to the array
                onChange([...(value || []), option])
            }
        } else {
            if (option !== value) onChange(option)
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value?.includes(option) : option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(undefined)
    }, [isOpen])

    return (
        <div 
            onBlur={() => setIsOpen(false)} // closes the options when clicking somewhere else
            onClick={() => setIsOpen(prev => !prev)} // opens or closes when clicking on the div
            tabIndex={0} // specify the element is focusable and to define the order in which it receive focus using the tab
            className={styles.container}
        >
            <span className={styles.value}>
                {
                    multiple ? 
                    value?.map(v => (
                        <button
                            key={v.value}
                            onClick={e => {
                                e.stopPropagation()
                                selectOption(v)
                            }}
                            className={styles["option-badge"]}
                        >
                            {v.label}
                            <span className={styles["remove-btn"]}>&times;</span>
                        </button>
                    )) : 
                    value?.label
                }
            </span>
            <button 
                onClick={e => {
                    e.stopPropagation() // stops the click event from going to the parent div
                    clearOptions()
                }}
                className={styles["clear-btn"]}
            >
                &times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li 
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value} 
                        className={`
                            ${styles.option}
                            ${isOptionSelected(option) ? styles.selected : ""}
                            ${index === highlightedIndex ? styles.highlighted : ""}
                        `}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}