import React, { useState, useEffect } from "react";
import axios from "axios";

function EditCompany({ match }) {
	const [company, setCompany] = useState({
		id: 0,
		fullName: "",
		email: "",
		logo: "",
		website: "",
	});

	useEffect(() => {
		axios
			.get(`/api/company/${match.params.id}`)
			.then((response) => {
				setCompany(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, [match.params.id]);

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.put(`/api/company/${company.id}`, company)
			.then((response) => {
				console.log("Company updated successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error updating company: ", error);
			});
	};

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
}

export default EditCompany;
