import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from './core/components/Navbar';

import { Main } from './routes/main';
import { SnakePit } from './routes/snake-pit';
import { Map } from './routes/map/Map';

export default function App() {
  return (
    <BrowserRouter>
      <Flex direction="column" height="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<Map />} />
          <Route path="/snake-pit" element={<SnakePit />} />
        </Routes>
      </Flex>
    </BrowserRouter>
  )
}
