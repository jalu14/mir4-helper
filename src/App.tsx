import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from './core/components/Navbar/Navbar';

import { Map, Main } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <Flex direction="column" height="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Flex>
    </BrowserRouter>
  )
}
