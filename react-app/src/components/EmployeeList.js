import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeeList() {
	const [employees, setEmployees] = useState([]);
	const [company, setCompany] = useState({
		id: 0,
		fullName: "",
		email: "",
		logo: "",
		website: "",
	});

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const companyId = urlParams.get("id");

	useEffect(() => {
		axios
			.get(`/api/company/${companyId}`)
			.then((response) => {
				setCompany(response.data);
				// not working currently
				return axios
					.get("/api/employee")
					.then((response) => {
						let filter = response.data;
						setEmployees(
							filter.filter(
								(employee) =>
									employee.company === company.fullName
							)
						);
					})
					.catch((error) => {
						console.error("Error fetching data: ", error);
					});
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, []);

	axios
		.get("/api/employee")
		.then((response) => {
			let filter = response.data;
			setEmployees(
				filter.filter(
					(employee) => employee.company === company.fullName
				)
			);
		})
		.catch((error) => {
			console.error("Error fetching data: ", error);
		});

	const buttonDeleteEmployee = (event) => {
		const deleteTargetId = event.target.parentElement.id;
		const deleteEmployee = {
			id: deleteTargetId,
		};

		axios
			.delete(`/api/employee/${deleteTargetId}`, deleteEmployee)
			.then((response) => {
				console.log("Employee deleted successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error deleting employee: ", error);
			});

		location.reload();
	};

	const buttonDeleteCompany = (event) => {
		event.preventDefault();
		const deleteCompany = {
			id: companyId,
		};

		axios
			.delete(`/api/company/${companyId}`, deleteCompany)
			.then((response) => {
				console.log("Company deleted successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error deleting company: ", error);
			});

		location.reload();
	};

	const buttonEditCompany = (event) => {
		event.preventDefault();
		window.location = `/edit/?var=0&id=${companyId}`;
	};

	const buttonEditEmployee = (event) => {
		const editTargetId = event.target.parentElement.id;

		window.location = `/edit/?var=1&id=${editTargetId}`;
	};

	const buttonCreateEmployee = (event) => {
		event.preventDefault();
		window.location = `/create?var=1&id=${companyId}`;
	};

	return (
		<div>
			<button onClick={buttonEditCompany}>EDIT</button>
			<button onClick={buttonDeleteCompany}>DELETE</button>
			<h2>{company.fullName}'s Employees</h2>
			<button onClick={buttonCreateEmployee}>Register Employee</button>
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
					<button onClick={buttonEditEmployee}>EDIT</button>
					<button onClick={buttonDeleteEmployee}>DELETE</button>
				</div>
			))}
		</div>
	);
}

export default EmployeeList;
