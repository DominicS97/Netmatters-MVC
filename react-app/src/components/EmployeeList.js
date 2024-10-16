import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeeList() {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		axios
			.get("/api/employee")
			.then((response) => {
				setEmployees(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, []);

	return (
		<div>
			<h2>Employee List</h2>
			<ul>
				{employees.map((employee) => (
					<li key={employee.id}>
						Full Name: {employee.firstName} {employee.lastName}
						Email: {employee.email}
						Phone: {employee.phone}
						Works at {employee.company}
					</li>
				))}
			</ul>
		</div>
	);
}

export default EmployeeList;
