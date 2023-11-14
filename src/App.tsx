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
  const [value, setValue] = useState<SelectOption | undefined>()

  return <Select options={options} value={value} onChange={o => setValue(o)}/>
}

export default App
