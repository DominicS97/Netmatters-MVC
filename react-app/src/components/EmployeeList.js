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

	const buttonDeleteEmployee = (event) => {
		const deleteTargetId = event.target.parentElement.id;
		const deleteTarget = {
			id: deleteTargetId,
		};

		axios
			.delete(`/api/employee/${deleteTargetId}`, deleteTarget)
			.then((response) => {
				console.log("Employee deleted successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error deleting employee: ", error);
			});

		location.reload();
	};

	return (
		<div>
			<h2>Employee List</h2>
			{employees.map((employee) => (
				<div id={employee.id} key={employee.id}>
					<h3>
						{employee.firstName} {employee.lastName}
					</h3>
					<p>Employee at {employee.company}</p>
					<p>
						<bold>Email:</bold> {employee.email}
					</p>
					<p>
						<bold>Phone:</bold> {employee.phone}
					</p>
					<button>EDIT</button>
					<button onClick={buttonDeleteEmployee}>DELETE</button>
				</div>
			))}
		</div>
	);
}

export default EmployeeList;
