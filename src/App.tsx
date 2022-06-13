import React from "react";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { Game } from "./components/TicTacToe";

function App() {
  return (
    <>
      {/* <div className="site"> */}

      <Game />
      {/* </div> */}
      <ToastContainer />
    </>
  );
}

export default App;
