/** Importing Dependencies */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/** Load environment variables from .env  */
dotenv.config(); 

/**
 * Loads environment variables from a file using the 'dotenv' library.
 *
 * @throws {Error} If an error occurs during the environment variable loading process.
 */
const result = dotenv.config();


// Check if there was an error while loading environment variables
if (result.error) {
  // If an error occurred, throw an exception with the error details
  throw result.error;
}
else{
  // If no error occurred, log a success message indicating that environment variables are successfully imported
  console.log("Successfully imported environment variables...");
}

// Initializing variables
const app = express(); // creating instance of express app
const port = process.env.PORT || 5000;

/** using CORS to connect to port 3000 on which Frontend is running */
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});