import { Route, Routes, useLocation } from "react-router-dom"
import { Layout } from "./Layout"
import { IndexPage } from "./IndexPage"
import { TestPage } from "./TestPage";
import axios from "axios";

function App() {
  const location = useLocation();
  axios.defaults.withCredentials = true
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