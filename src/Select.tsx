import { useEffect, useRef, useState } from "react"
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
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

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
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    // add functionality using keyboard commands
    useEffect(() => {
        // define the keyboard event handler
        const handler = (e: KeyboardEvent) => {
            // check if the event target is not the container
            if (e.target !== containerRef.current) return
            // handle different keyboard events
            switch (e.code) {
                // open or close the options on "Enter" or "Space" key press
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    // if the dropdown is open, select the option highlighted
                    if (isOpen) selectOption(options[highlightedIndex])
                    break
                // navigate through options using arrow keys
                case "ArrowUp":
                case "ArrowDown": {
                    // open the dropdown if it's closed
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }
                    // calculate the new highlighted index based on key press
                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    // update the highlighted index within valid bounds
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                } // add curly braces because of declaring variables inside a switch-case
                // close the dropdown on "Escape" key press
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }

        // add the event listener to the container
        containerRef.current?.addEventListener("keydown", handler)
        // clean up by removing the event listener when the component unmounts
        return () => {
            containerRef.current?.removeEventListener("keydown", handler)
        }
    }, [isOpen, highlightedIndex, options])

    return (
        <div 
            ref={containerRef}
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