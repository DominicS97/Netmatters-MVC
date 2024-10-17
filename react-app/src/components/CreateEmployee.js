import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateEmployee() {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [company, setCompany] = useState("");

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const createMode = urlParams.get("var");
	const companyId = urlParams.get("id");

	useEffect(() => {
		axios
			.get(`/api/company/${companyId}`)
			.then((response) => {
				setCompany(response.data.fullName);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const employee = {
			email: email,
			firstName: firstName,
			lastName: lastName,
			company: company,
			phone: phone,
		};

		axios
			.post("/api/employee", employee)
			.then((response) => {
				console.log(
					"Employee registered successfully: ",
					response.data
				);
			})
			.catch((error) => {
				console.error("Error registering employee: ", error);
			});

		location.reload();
	};

	if (createMode === "1") {
		return (
			<div>
				<h2>Register Employee at {company}</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Email:</label>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label>First Name:</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div>
						<label>Last Name:</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div>
						<label>Phone:</label>
						<input
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<button type="submit">Register</button>
				</form>
			</div>
		);
	} else {
		return;
	}
}

export default CreateEmployee;
