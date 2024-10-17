import React, { useState, useEffect } from "react";
import axios from "axios";

function EditEmployee({ match }) {
	const [employee, setEmployee] = useState({
		id: 0,
		email: "",
		firstName: "",
		lastName: "",
		company: "",
		phone: "",
	});

	useEffect(() => {
		axios
			.get(`/api/employee/${match.params.id}`)
			.then((response) => {
				setEmployee(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, [match.params.id]);

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.put(`/api/employee/${employee.id}`, employee)
			.then((response) => {
				console.log("Employee updated successfully: ", response.data);
			})
			.catch((error) => {
				console.error("Error updating employee: ", error);
			});
	};

	return (
		<div>
			<h2>Edit Employee</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="text"
						value={employee.email}
						onChange={(e) =>
							setEmployee({
								...employee,
								email: e.target.value,
							})
						}
					/>
				</div>
				<div>
					<label>First Name:</label>
					<input
						type="text"
						value={employee.firstName}
						onChange={(e) =>
							setEmployee({
								...employee,
								firstName: e.target.value,
							})
						}
					/>
				</div>
				<div>
					<label>Last Name:</label>
					<input
						type="text"
						value={employee.lastName}
						onChange={(e) =>
							setEmployee({
								...employee,
								lastName: e.target.value,
							})
						}
					/>
				</div>
				<div>
					<label>Company:</label>
					<input
						type="text"
						value={employee.company}
						onChange={(e) =>
							setEmployee({
								...employee,
								company: e.target.value,
							})
						}
					/>
				</div>
				<div>
					<label>Phone:</label>
					<input
						type="text"
						value={employee.phone}
						onChange={(e) =>
							setEmployee({
								...employee,
								phone: e.target.value,
							})
						}
					/>
				</div>
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default EditEmployee;
