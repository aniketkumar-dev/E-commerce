import mongoose from "mongoose";

const connectDB = async() => {
    mongoose.connection.on('connected', ()=>{
        console.log("DB Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);

//         console.log("DB Connected");
//     } catch (error) {
//         console.log("MongoDB Connection Error:");
//         console.log(error.message);
//     }
// };

// export default connectDB; 