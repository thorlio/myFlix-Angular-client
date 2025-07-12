require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const cors = require("cors");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 8080;
const Movies = Models.Movie;
const Users = Models.User;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));

const allowedOrigins = [
  "http://localhost:1234",
  "http://localhost:4200",
  "https://flixandchill-client.netlify.app",
  "https://flixandchill-0e85c940608d.herokuapp.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

let auth = require("./auth.js")(app);
require("./passport.js");

// Health check endpoint (to check if the API is live)
// app.get("/", (req, res) => {
//   res.send("Welcome to the myFlix API!");
// });

// User registration
app.post("/register", async (req, res) => {
  try {
    const { Username, Password, Email, Birthday } = req.body;

    if (!Username || !Password || !Email || !Birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await Users.findOne({ Username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new Users({
      Username,
      Password: hashedPassword,
      Email,
      Birthday,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const user = await Users.findOne({ Username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(Password, user.Password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      user: {
        Username: user.Username,
        Email: user.Email,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get user by username
app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOne({ Username: req.params.username });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Update user
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    try {
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
          $set: {
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          },
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    }
  }
);

// Get all movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const movies = await Movies.find();
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    }
  }
);

// Get movie by title
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const movie = await Movies.findOne({ title: req.params.title });
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Add a new movie
app.post("/movies", async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a movie by title
app.put(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedMovie = await Movies.findOneAndUpdate(
        { title: req.params.title },
        { $set: req.body },
        { new: true }
      );
      if (updatedMovie) {
        res.status(200).json(updatedMovie);
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Delete a movie by title
app.delete(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Movies.findOneAndRemove({ title: req.params.title });
      res.status(200).json({ message: "Movie deleted", result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
