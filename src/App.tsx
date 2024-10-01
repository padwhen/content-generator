
import { Route, Routes } from 'react-router-dom'
import { IndexPage } from './IndexPage'
import { Layout } from './Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
      </Route>
    </Routes>
  )
}

export default App
