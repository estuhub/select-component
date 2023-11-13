import { useState } from "react"
import { Select } from "./Select"

function App() {
  const options = [
    { label: 'chocolate', value: 1 },
    { label: 'vanilla', value: 2 },
    { label: 'strawberry', value: 3 },
    { label: 'coffee', value: 4 },
    { label: 'mint', value: 5 },
  ]

  const [value, setValue] = useState<typeof options[0] | undefined>(options[0])

  return <Select options={options} value={value} onChange={o => setValue(o)}/>
}

export default App
