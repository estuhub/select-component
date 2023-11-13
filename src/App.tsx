import { Select } from "./Select"

function App() {
  const options = [
    { label: 'chocolate', value: 1 },
    { label: 'vanilla', value: 2 },
    { label: 'strawberry', value: 3 },
    { label: 'coffee', value: 4 },
    { label: 'mint', value: 5 },
  ]

  return <Select options={options} />
}

export default App
