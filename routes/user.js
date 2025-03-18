const express = require("express");


const router = express.Router();

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
        <ul>
            ${allDbUsers
              .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
              .join("")}
        </ul>
        `;
  res.send(html);
});

router.get("/", async (req, res) => {
  // get single user by id
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

router
  .route("/:id")
  .get(async (req, res) => {
    // get single user by id
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    // edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    // delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

// POST route
router.post("/", async (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;

  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const result = await User.create({
      firstName: first_name,
      lastName: last_name,
      email: email,
      gender: gender,
      jobTitle: job_title,
    });

    console.log("result", result);
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to create user", details: error });
  }
});

module.exports = router;