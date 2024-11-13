// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Home from './Pages/Home/Home';
// // import AddTablePage from './Pages/AddTablePage';

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* <Route path="/add" element={<AddTablePage />} /> */}
// //         <Route path="/home" element={<Home />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import Axios from './Axios';
// import MainTable from "../src/MainTable";
// import "./App.css";

// function App() {
//   const [config, setConfig] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch config data from the API
//     Axios.get("/api/getConfig")
//       .then(response => {
//         setConfig(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching config:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!config) {
//     return <div>Error loading config data.</div>;
//   }

//   return (
//     <div className="App">
//       <header>
//         <h1>{config.applicationName}</h1>
//       </header>
//       <MainTable tableDetails={config.tableDetails} />
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import Axios from './Axios';
import MainTable from "./MainTable";
import "./App.css";

function App() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch config data from the API
    Axios.get("/api/getConfig")
      .then(response => {
        setConfig(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching config:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading configuration...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="error-screen">
        <p>Failed to load configuration. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>{config.applicationName}</h1>
      </header>
      <main>
        <section className="table-section">
          <MainTable tableDetails={config.tableDetails} />
        </section>
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 {config.applicationName} - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
