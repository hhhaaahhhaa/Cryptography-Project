import "./App.css";
import Routes from "./routes/Routes";

import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./routes/loading";

function App() {
    var loading = false;

    return (
        <div className="App">
            <Router>
                {loading ? (
                    <div
                        backgroundColor="blue"
                        style={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Loading type="spinningBubbles" color="ffffff" />
                    </div>
                ) : (
                    <Routes />
                )}
            </Router>
        </div>
    );
}

export default App;
