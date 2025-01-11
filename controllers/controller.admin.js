/**
 * ThirdParty Module Dependencies
 */

/**
 * Custom Module Dependencies
 **/

const adminModel = require("../database/models/model.admin.js");
const userModel = require("../database/models/model.user.js");

const adminDashBoard = async (req, res) => {

	try {
		const findUser = await userModel.find({});

		if (findUser.length == 0) {
			return res.status(200).render("dashboard", { data: findUser });
		} else {
			return res.status(200).render("dashboard", { data: findUser });
		}
	} catch (error) {
		return res.status(500).json(error);
	}

};


const createUser = async (req, res) => {

	if (req.method == "GET") {
		res.status(200).render("createUsers", {
			data: undefined,
			heading: "New User",
			error: undefined,
			emailValidationError: undefined,
			passwordValidationError: undefined,
			message: undefined,
		});
	}

	if (req.method == "POST") {
		const nameChar = req.body.name.split("")[0].toUpperCase();
		const nameChars = req.body.name.slice(1);
		const email = req.body.email;
		const password = req.body.password;
		const role = req.body.state == "on" ? "admin" : "user";
		const name = nameChar + nameChars;

		if (role == "user") {
			try {
				const userExist = await userModel.findOne({ email: email });

				if (userExist) {
					return res.status(200).render("createUsers", {
						data: undefined,
						heading: "New User",
						error: "User Alredy Exist !",
						emailValidationError: undefined,
						passwordValidationError: undefined,
						message: undefined,
					});
				}

				if (!userExist) {
					const newUser = await userModel.create({
						name: name,
						email: email,
						password: password,
					});

					if (newUser) {
						return res.redirect(301, "/admin/dashboard");
					}

					if (!newUser) {
						return res.status(500).render("createUsers", {
							data: undefined,
							heading: "New User",
							error: "User Creation Failed !",
							emailValidationError: undefined,
							passwordValidationError: undefined,
							message: undefined,
						});
					}
				}
			} catch (error) {
				console.log(error);
				return res.status(500).json(error);
			}
		}

		if (role == "admin") {
			try {
				const findAdmin = await adminModel.findOne({ email: email });

				if (findAdmin) {
					return res.status(200).render("createUsers", {
						data: undefined,
						heading: "New User",
						error: "Admin User Exits !",
						emailValidationError: undefined,
						passwordValidationError: undefined,
						message: undefined,
					});
				}

				if (!findAdmin) {
					const newAdmin = await adminModel.create({
						name: name,
						email: email,
						password: password,
						role: role,
					});
					if (newAdmin) {
						return res.redirect(301, "/admin/dashboard");
					}

					if (!newAdmin) {
						return res.status(500).render("createUsers", {
							data: undefined,
							heading: "New User",
							error: "Admin User Creation Failed !",
							emailValidationError: undefined,
							passwordValidationError: undefined,
							message: undefined,
						});
					}
				}
			} catch (error) {
				return res.status(500).json(error);
			}
		}
	}

};


const updateUser = async (req, res) => {

	const id = req.query.id;

	if (req.method == "GET") {
		try {
			const findUser = await userModel.findById(id);

			if (findUser) {
				return res.status(200).render("createUsers", {
					data: findUser,
					heading: "Update User",
					error: undefined,
					emailValidationError: undefined,
					message: undefined,
				});
			}

			if (!findUser) {
				return res.status(200).render("createUsers", {
					data: undefined,
					heading: "Update User",
					error: "Can't Fetch the user data !",
					emailValidationError: undefined,
					message: undefined,
				});
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	if (req.method == "POST") {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const role = req.body.state == "on" ? "admin" : "user";

		try {
			const updatedUser = await userModel.findByIdAndUpdate(id, {
				name: name,
				email: email,
				password: password,
				role: role,
			});
			if (updatedUser) {
				return res.redirect(301, "/admin/dashboard");
			}

			if (!updatedUser) {
				return res.status(200).render("createUsers", {
					data: undefined,
					heading: "Update User",
					error: "Can not update the data !",
					emailValidationError: undefined,
					message: undefined,
				});
			}
		} catch (error) {
			return res.status(200).json(error);
		}
	}
};


const deleteUser = async (req, res) => {

	try {
		const id = req.query.id;
		const deletedUser = await userModel.findByIdAndDelete(id);

		if (deletedUser) {
			return res.redirect(301, "/admin/dashboard");
		}
	} catch (error) {
		return res.status(500).json(error);
	}

};


const searchUser = async (req, res) => {

	try {
		const name = req.body.value;
		const findUser = await userModel.find({
			name: { $regex: name, $options: "i" },
		});

		if (findUser == 0) {
			return res.status(404).render("dashboard", { data: findUser });
		}

		if (findUser !== 0) {
			return res.status(200).render("dashboard", { data: findUser });
		}
	} catch (error) {
		return res.status(500).json(error);
	}

};


const logOut = async (req, res) => {

	req.session.destroy(function (error) {
		if (error) {
			return res.status(500).json(error);
		} else {
			return res.redirect(301, "/login");
		}
	});

};

/**
 * Exporting custom modules as a part of node.js modules
 */
module.exports = {
	adminDashBoard,
	logOut,
	searchUser,
	createUser,
	updateUser,
	deleteUser,
};
