import { createRoot } from 'react-dom/client'
import {Demo} from './App'

const container = document.getElementById('app')!
const root = createRoot(container)

const App = () => {
  return (
    <>
      <h1>虚拟宇宙</h1>
      <Demo />
    </>
  )
}

root.render(<App />)
