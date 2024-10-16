import React, { useState } from "react";
import axios from "axios";

function CreateCompany() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [logo, setLogo] = useState("");
	const [website, setWebsite] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const company = {
			fullName: fullName,
			email: email,
			logo: logo,
			website: website,
		};

		axios
			.post("/api/company", company)
			.then((response) => {
				console.log("Company registered successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error registering company: ", error);
			});
	};

	return (
		<div>
			<h2>Register Company</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Company Name:</label>
					<input
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label>Logo</label>
					<input
						type="text"
						value={logo}
						onChange={(e) => setLogo(e.target.value)}
					/>
				</div>
				<div>
					<label>Website</label>
					<input
						type="text"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default CreateCompany;
