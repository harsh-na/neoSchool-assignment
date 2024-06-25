const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error in database connection", err));

const port = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const createContactRoutes = require('./routes/createContactRoutes');
const editContactRoutes = require('./routes/editContactRoutes');
const searchContactRoutes = require('./routes/searchContactRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/createContact', createContactRoutes);
app.use('/api/editContact', editContactRoutes);
app.use('/api/searchContact', searchContactRoutes);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
