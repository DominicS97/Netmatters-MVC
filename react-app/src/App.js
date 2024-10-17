import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";
import CompanyList from "./components/CompanyList";
import CreateCompany from "./components/CreateCompany";
import EditCompany from "./components/EditCompany";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<CompanyList />} />
					<Route path="/list" element={<EmployeeList />} />
					<Route
						path="/create"
						element={
							<>
								<CreateCompany />
								<CreateEmployee />
							</>
						}
					/>
					<Route
						path="/edit"
						element={
							<>
								<EditCompany />
								<EditEmployee />
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
