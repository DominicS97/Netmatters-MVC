import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyList() {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		axios
			.get("/api/company")
			.then((response) => {
				setCompanies(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, []);

	const buttonDeleteCompany = (event) => {
		const deleteTargetId = event.target.parentElement.id;
		const deleteTarget = {
			id: deleteTargetId,
		};

		axios
			.delete(`/api/company/${deleteTargetId}`, deleteTarget)
			.then((response) => {
				console.log("Company deleted successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error deleting company: ", error);
			});

		location.reload();
	};

	return (
		<div>
			<h2>Company List</h2>
			{companies.map((company) => (
				<div id={company.id} key={company.id}>
					<img src={company.logo} width="100" height="100" />
					<h3>{company.fullName}</h3>
					<p>
						<bold>Email:</bold> {company.email}
					</p>
					<p>
						<a href={company.website}>Visit Website Here</a>
					</p>
					<button onClick={buttonDeleteCompany}>DELETE</button>
				</div>
			))}
		</div>
	);
}

export default CompanyList;
