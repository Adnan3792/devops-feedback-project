const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
	    "mongodb://mongodb:27017/feedbackdb"
)
.then(() => {
	    console.log("MongoDB Connected");
})
.catch((err) => {
	    console.log(err);
});

const FeedbackSchema = new mongoose.Schema({
	    name: String,
	    message: String
});

const Feedback = mongoose.model(
	    "Feedback",
	    FeedbackSchema
);

app.get("/feedback", async (req, res) => {

	    const feedback = await Feedback.find();

	    res.json(feedback);
});

app.post("/feedback", async (req, res) => {

	    const newFeedback = new Feedback({
		            name: req.body.name,
		            message: req.body.message
		        });

	    await newFeedback.save();

	    res.json({
		            status: "success"
		        });
});

app.listen(3000, () => {
	    console.log("Server running on port 3000");
});
