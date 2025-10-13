require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { Dropbox } = require("dropbox");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/prepare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

// Dropbox setup
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

// Multer setup
const upload = multer({ dest: "uploads/" });

// Feedback schema
const FeedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  fileName: String,
  dropboxPath: String,
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model("Feedback", FeedbackSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Prepare.com API running");
});

app.post("/feedback", upload.single("file"), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.json({ success: false, message: "Feedback cannot be empty" });

    let fileName = null;
    let dropboxPath = null;

    if (req.file) {
      const fileContent = fs.readFileSync(req.file.path);
      fileName = req.file.originalname;
      dropboxPath = "/feedback_uploads/" + fileName;

      try {
        await dbx.filesUpload({
          path: dropboxPath,
          contents: fileContent,
          mode: "overwrite"
        });
      } catch (dropboxErr) {
        console.error("Dropbox upload error:", dropboxErr);
        return res.json({ success: false, message: "Dropbox upload failed" });
      }

      fs.unlinkSync(req.file.path);
    }

    const feedback = new Feedback({ text, fileName, dropboxPath });
    await feedback.save();
    res.json({ success: true, message: "Thank you for your feedback!", feedback });

  } catch (err) {
    console.error("Feedback Error:", err);
    res.json({ success: false, message: "Error saving feedback" });
  }
});

app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    console.error("Fetch Feedback Error:", err);
    res.json({ success: false, message: "Error fetching feedbacks" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
