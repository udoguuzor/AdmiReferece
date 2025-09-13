import express, {Express} from "express"
import "dotenv/config"

import connectDB from "./config/dataBase";
import { userRouter } from "./Routes/userRoutes";
import { bookRouter } from "./Routes/BookRoutes";
import { AdminRouter } from "./Routes/AdminRoutes";

const app:Express = express()
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/admin", AdminRouter)
const PORT = process.env.PORT;
connectDB()




app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})