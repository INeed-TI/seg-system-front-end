import * as React from "react"
import { useState } from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import LoginScreen from "./components/Login"
import { 	Route, Routes } from "react-router-dom"
import NotFound from "./components/notFound"
import { Home } from "./components/Dashboard";

export const App = () => {
  const [ticketData, setTicketData] = useState<any>(null);

  return(
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
			
    </ChakraProvider>
  )
}

export default App;
