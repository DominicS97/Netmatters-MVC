import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<EmployeeList />} />
					<Route path="/create" element={<CreateEmployee />} />
					<Route path="/edit/:id" element={<EditEmployee />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
