import dotenv from 'dotenv';
import connectDB from './src/dbConfig/db.js'
import app from './src/app.js'


dotenv.config();
connectDB()


app.listen(3000 , () => {
  console.log("Server is running on port 3000")
})
