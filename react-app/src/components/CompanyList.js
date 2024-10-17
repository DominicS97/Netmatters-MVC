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

	const viewCompany = (event) => {
		const viewTargetId = event.target.parentElement.id;
		const targetURL = "/list?id=" + viewTargetId;

		window.location = targetURL;
	};

	const newCompany = (event) => {
		event.preventDefault();
		window.location = "/create?var=0";
	};

	return (
		<div>
			<button onClick={newCompany}>Register Company</button>
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
					<button onClick={viewCompany}>VIEW</button>
				</div>
			))}
		</div>
	);
}

export default CompanyList;
