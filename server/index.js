const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./Routes/authRoutes');
const blogRoutes = require('./Routes/blogRoutes');
const commentRoutes = require('./Routes/commentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error(err));


module.exports = app;