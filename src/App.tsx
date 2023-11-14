import { useState } from "react"
import { Select, SelectOption } from "./Select"

const options = [
  { label: 'chocolate', value: 1 },
  { label: 'vanilla', value: 2 },
  { label: 'strawberry', value: 3 },
  { label: 'coffee', value: 4 },
  { label: 'mint', value: 5 },
]

function App() {
  const [singleValue, setSingleValue] = useState<SelectOption | undefined>()
  const [multipleValues, setMultipleValues] = useState<SelectOption[]>()

  return (
    <>
      <Select options={options} value={singleValue} onChange={o => setSingleValue(o)}/><br />
      <Select multiple options={options} value={multipleValues} onChange={o => setMultipleValues(o)}/>
    </>
  )
}

export default App
