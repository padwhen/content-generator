import { Route, Routes, useLocation } from "react-router-dom"
import { Layout } from "./Layout"
import { IndexPage } from "./IndexPage"

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/') && <Layout />}
      <Routes>
          <Route index element={<IndexPage />} />
      </Routes>
    </>
  )
}

export default App