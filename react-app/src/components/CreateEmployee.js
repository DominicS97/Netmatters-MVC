import React, { useState } from "react";
import axios from "axios";

function CreateEmployee() {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [company, setCompany] = useState("");

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

	return (
		<div>
			<h2>Register Employee</h2>
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
					<label>Company:</label>
					<input
						type="text"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
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
}

export default CreateEmployee;
