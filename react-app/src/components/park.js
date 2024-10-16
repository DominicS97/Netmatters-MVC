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
						company: e.target.value,
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
</div>;
