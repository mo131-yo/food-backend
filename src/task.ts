// import cors from "cors";
// import { configDotenv } from "dotenv";
// import express, { Application , Request, Response} from "express";

// configDotenv();

// const app: Application= express()

// app.use(express.json());
// app.use(cors());

// app.post("/discover", async ( req: Request, res: Response)=>{
//     res.status(200).send(req.body);
// })

// 1.  write user create api // post request

// app.post("/post_req", async ( req: Request, res:Response)=>{
//     const newUser= req.body;
//     console.log(newUser);
//     const user={
//         cnsjvsj:"1",
//           ha : "1",
//          vhsbsd: "1",
//          nbv:"1"
//         }
//         const updateUser = {
//             ...newUser,
//             ...user,
//         }
//         res.send(updateUser)
//     })
//         app.listen(8000, ()=>console.log("http://localhost:8000"));

    // 2.  write user update api // put request
    // 3.  write user delete api // delete request
    // 4. write user list api // get request
    
    // user model
    // {
    //     name: string;
    //     email: string;
    //     password: string;
    // }