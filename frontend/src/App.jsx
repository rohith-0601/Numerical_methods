import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from "./pages/Home"
import Q1 from "./pages/Q1"

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<HomePage/>}/>
      <Route  path="/q1" element={<Q1/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
