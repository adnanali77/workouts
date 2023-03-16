import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/user.js';

// express app
const app = express()

dotenv.config();

// middleware
app.use(express.json()) //any req that comes in it looks if it has body to req if it has
// then it passes it and attach to the req object.so we can acces it
// in req handler.

app.use((req, res, next) => {//this middleware gets fire on every request comes in.
    // function argument next which we have to run at the end of this middleware in
    // order to move on to the next piece of middleware.
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 