// import cors from "cors";
// import { configDotenv } from "dotenv";
// import express, { Application , Request, Response, Router} from "express";
// import connectToMongoDB from "./mongoDb";
// import { Schema } from "mongoose";
// import { foodCardRouter, foodRouter, userRouter } from "./router";
// import { UserModel } from "./schema/user.schema";
// // import { foodRouter } from "./router/food.router";

// configDotenv();

// const app: Application= express()

// app.use(express.json());
// app.use(cors());

// app.post("/discover", async ( req: Request, res: Response)=>{
//     res.status(200).send(req.body);
// })

// 1.
// app.put("/update", async ( req: Request, res:Response)=>{
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


// 2.
//         app.get("/discover1", async (req: Request, res: Response) => {
//   const list = [
//     { id: 1, name: "Movie 1" },
//     { id: 2, name: "Movie 2" },
//     { id: 3, name: "Movie 3" },
//   ];

//   res.status(200).json(list);
// });



//    3.
    // app.get("/up", async (req: Request, res: Response)=>{
    //     const user= req.body
    //     const LastUser={
    //         firstname: "dog",
    //         lastName: "cat",
    //         age: "546378290",
    //     }
    //     const LastPerson= {
    //         ...LastUser,
    //         ...user
    //     }
    //     res.send(LastPerson)
    // })




    // 4.
//         app.get("/list", async (req: Request, res: Response)=>{
//         const listPerson=[
//             {
//                 id : 2,
//                 firstName: "DC",
//             },
//             {
//                 id: 1,
//                 lastName: "dindon"
//             },
//              {
//                 id: 4,
//                 lastName: "ax",
//                 firstName: "Dandan"
//             }
//         ]
// const name = req.body.id;

//     const person = listPerson.find((age) => age.id === Number(name));
//     // const person = listPerson.find((age) => age.id === name);

//     if(!person) return res.send({zurvas: "messege alga sda mini"});

//     res.send(person)
//     })


//   From MongoDB  

// const port = 11000
//     app.listen( port, async()=>{
//         await connectToMongoDB()
//         console.log(`server is running ${port}`);
//     });

    // app.listen(8000, ()=>console.log("http://localhost:8000"));



//    --------------


// app.post("/create-user", async(req:Request, res:Response)=>{
//     const {name, email}= req.body
//     const user = await UserModel.create({name, email})
//     res.status(200).send({message:"user created successfully", data: user})
// })

// app.get("/get-user", async(req:Request, res:Response)=>{
//     const users = await UserModel.find({})
//     res.status(200).send({message:"user fetched successfully", data: users})
// })

// app.listen(port, async()=>{
//     await connectToMongoDB()
//     console.log(`server is running on port ${port}`);
// })

// app.delete("/delete-user", async (req:Request, res:Response)=>{
//  const user = await UserModel.findByIdAndDelete(req.body.id)
//  res.status(200).send({message:"user deleted successfully", data: user})
// })

// app.put("/put-user", async (req:Request, res:Response)=>{
//     const {id, name} = req.body
//  const user = await UserModel.findByIdAndUpdate(id, {name: req.body.name})
//  res.status(200).send({message:"user update successfully", data: user})
// })

// --------------------

// app.use("./users", userRouter)

//  app.listen(8000, ()=>console.log("http://localhost:8000"));



// app.use("/cards", cardRouter);
 
// // app.listen(8000, () => console.log("http://localhost:8000"));
 
// app.listen(port, async () => {
//   await connectToMongoDB();
//   console.log(`Server is running on port ${port}`);
// });



// app.use("/cards", cardRouter);
 
// // app.listen(8000, () => console.log("http://localhost:8000"));
 
// app.listen(port, async () => {
//   await connectToMongoDB();
//   console.log(`Server is running on port ${port}`);
// });

import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application , Request, Response, Router} from "express";
import connectToMongoDB from "./mongoDb";
import { Schema } from "mongoose";
import { foodCardRouter, foodCategoryRouter, foodRouter, userRouter } from "./router";
import { UserModel } from "./schema/user.schema";
import bcrypt from "bcrypt";
import { ResetPasswordVerificationEmail } from "./utils/reset-password";
import { orderRouter } from "./router/order.router";

configDotenv();

const app: Application= express()

app.use(express.json());
app.use(cors());


app.post("/create-user", async (req: Request, res: Response)=>{
    const {name, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create();

    res.status(200).send({message: "user amjilttai uuslee", data: newUser});
});

const prompt = process.env.PORT || 8000;
app.get("/get-users", async (req: Request, res: Response)=>{
    const users = await UserModel.find;
    res.status(200).send({message:"users avlaa", data: users});
})

app.use('/users', userRouter);

app.use("/foods", foodRouter);
app.use("/foods-card", foodCardRouter);
app.use("/foods-category", foodCategoryRouter); 
app.use("/foods-order", orderRouter );


app.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User oldsongui" });

  user.resetPasswordOtp = otpCode;
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  const result = await ResetPasswordVerificationEmail(email, otpCode);

  if (result.success) {
    res.status(200).json({ message: "mail amjilttai ilgeelee" });
  } else {
    res.status(500).json({ message: "Aldaa garlaa", error: result.error });
  }
});
  
app.listen(prompt, async()=>{
    await connectToMongoDB()
    console.log(`server is running on port ${prompt}`);
})

// app.listen(8000, () => console.log("http://localhost:8000"));