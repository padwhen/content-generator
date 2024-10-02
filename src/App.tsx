import { Route, Routes, useLocation } from "react-router-dom"
import { Layout } from "./Layout"
import { IndexPage } from "./IndexPage"
import { TestPage } from "./TestPage";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/') && <Layout />}
      <Routes>
          <Route index element={<IndexPage />} />
          <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  )
}

export default App