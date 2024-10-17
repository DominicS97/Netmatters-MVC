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
		axios
			.get(`/api/company/${companyId}`)
			.then((response) => {
				setCompany(response.data);
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

	const handleSubmit = (event) => {
		event.preventDefault();
		employees.forEach((employee) => (employee.company = company.fullName));

		axios
			.put(`/api/company/${company.id}`, company)
			.then((response) => {
				console.log("Company updated successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error updating company: ", error);
			});

		axios
			// no response
			.all(
				employees.map((employee) =>
					axios.put(`/api/employee/${employee.id}`, employee)
				)
			)
			.then((response) => {
				console.log("Employees updated successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error updating employees: ", error);
			});
	};

	if (editMode === "0") {
		return (
			<div>
				<h2>Edit Company</h2>
				<form onSubmit={handleSubmit}>
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
		return;
	}
}

export default EditCompany;
