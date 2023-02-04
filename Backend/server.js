import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import User from "./models/userModel.js";
import generateToken from "./generateToken.js";
import protect from "./authMiddleware.js";
import e from "express";
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("App is running");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

app.post("/api/register", async (req, res) => {
  const { username, email, password, profilePicture } = req.body;

  if (username === "" || email === "" || password === "") {
    return res.json("input all the neccessary fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json("This email is already in use");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      profilePicture,
    });

    if (user) {
      res.status(200).json({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        friends: user.friends,
        createdOn: user.createdOn,
        _id: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json("User not created");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.json("input all the neccessary fields");
  }

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.status(200).json({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        friends: user.friends,
        createdOn: user.createdOn,
        _id: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json("Could not find this account");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/api/updateprofile", protect, async (req, res) => {
  const { newUsername, newProfilePicture } = req.body;

  if (newUsername === "" && newProfilePicture === "") {
    return res.json("input all neccessary fields");
  }

  if (newUsername !== "" && newProfilePicture !== "") {
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        req.loggeduser._id,
        {
          username: newUsername,
          profilePicture: newProfilePicture,
        },
        { new: true }
      );

      if (updatedProfile) {
        res.status(200).json(updatedProfile);
      } else {
        res.status(400).json("could not upadate this account");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (newUsername !== "" && newProfilePicture === "") {
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        req.loggeduser._id,
        {
          username: newUsername,
        },
        { new: true }
      );

      if (updatedProfile) {
        res.status(200).json(updatedProfile);
      } else {
        res.status(400).json("could not upadate this account");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (newUsername === "" && newProfilePicture !== "") {
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        req.loggeduser._id,
        {
          profilePicture: newProfilePicture,
        },
        { new: true }
      );

      if (updatedProfile) {
        res.status(200).json(updatedProfile);
      } else {
        res.status(400).json("could not upadate this account");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});

app.delete("/api/deleteaccount", protect, async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.loggeduser._id);
  if (deleted) {
    res.json(deleted);
  } else {
    res.json("could not delete account");
  }
});

app.listen(3001, () => {
  console.log("app is running");
});
