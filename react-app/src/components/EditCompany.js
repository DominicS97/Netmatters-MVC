import React, { useState, useEffect } from "react";
import axios from "axios";

function EditCompany() {
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
	const editMode = urlParams.get("var");
	const companyId = urlParams.get("id");

	useEffect(() => {
		const fetchCompanyAndEmployees = async () => {
			try {
				// Fetch the company data first
				const companyResponse = await axios.get(
					`/api/company/${companyId}`
				);
				setCompany(companyResponse.data);
				console.log("Fetched company data: ", companyResponse.data);

				// Fetch employees after setting the company
				const employeeResponse = await axios.get("/api/employee");
				console.log("Fetched employees data: ", employeeResponse.data);

				// Set employees where company matches the fullName of the fetched company
				const filteredEmployees = employeeResponse.data.filter(
					(employee) => {
						console.log(
							`Comparing employee.company: '${employee.company.trim()}' with company.fullName: '${companyResponse.data.fullName.trim()}'`
						);
						return (
							employee.company.trim() ===
							companyResponse.data.fullName.trim()
						); // Normalize by trimming whitespace
					}
				);

				setEmployees(filteredEmployees);
				console.log("Filtered employees: ", filteredEmployees); // Log filtered employees
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchCompanyAndEmployees();
	}, [companyId]); // Dependency array ensures this runs once per companyId

	const editCompany = async (event) => {
		event.preventDefault();
		employees.forEach((employee) => (employee.company = company.fullName));

		// First update employees, then update the company
		try {
			// First update employees
			const responses = await axios.all(
				employees.map((employee) => {
					console.log(`Updating employee with ID: ${employee.id}`);
					return axios.put(`/api/employee/${employee.id}`, employee);
				})
			);

			// Log all employee update responses
			responses.forEach((response, index) => {
				console.log(
					`Employee ${employees[index].id} updated successfully: `,
					response.data
				);
			});

			// Proceed to update the company after employees are updated
			const companyResponse = await axios.put(
				`/api/company/${company.id}`,
				company
			);
			console.log("Company updated successfully: ", companyResponse.data);
		} catch (error) {
			// Catch any errors in the entire process
			console.error("Error updating employees or company: ", error);
		}
	};

	if (editMode === "0") {
		return (
			<div>
				<h2>Edit Company</h2>
				<form onSubmit={editCompany}>
					<div>
						<label>Company Name:</label>
						<input
							type="text"
							value={company.fullName}
							onChange={(e) =>
								setCompany({
									...company,
									fullName: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label>Email:</label>
						<input
							type="text"
							value={company.email}
							onChange={(e) =>
								setCompany({
									...company,
									email: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label>Logo:</label>
						<input
							type="text"
							value={company.logo}
							onChange={(e) =>
								setCompany({
									...company,
									logo: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label>Website:</label>
						<input
							type="text"
							value={company.website}
							onChange={(e) =>
								setCompany({
									...company,
									website: e.target.value,
								})
							}
						/>
					</div>
					<button type="submit">Update</button>
				</form>
			</div>
		);
	} else {
		return null; // Return null instead of nothing
	}
}

export default EditCompany;
