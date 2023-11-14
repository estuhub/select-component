import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
    label: string,
    value: string | number,
}

type SelectProps = {
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
    options: SelectOption[]
}

export function Select({ value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(undefined)

    function clearOptions() {
        onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (option !== value) onChange(option)
    }

    function isOptionSelected(option: SelectOption) {
        return option === value
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
            <span className={styles.value}>{value?.label}</span>
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