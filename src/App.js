import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Home from "./component/layout/Home";
import AddNote from "./component/note/AddNote";
import EditNote from "./component/note/EditNote";
import BackupNotes from "./component/note/BackupNotes";
import PageNotFound from "./component/layout/PageNotFound";

function App() {
  const [searchTitleHome, setSearchTitleHome] = useState("");

  const onSearchNavHandler = (searchData) => {
    setSearchTitleHome(searchData);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onSearchNav={onSearchNavHandler} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home onSearchHome={searchTitleHome} />}
          />
          <Route exact path="/notes/add" element={<AddNote />} />
          <Route exact path="/notes/edit/:id" element={<EditNote />} />
          <Route exact path="/backup/notes" element={<BackupNotes />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
