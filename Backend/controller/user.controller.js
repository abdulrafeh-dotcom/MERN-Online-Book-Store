import User from "../model/user.model.js";
// import bcryptjs from "bcryptjs";
export const signup = async (req, res)=>{
    try {
        const {fullname,email,passward}=req.body;
        const user=await user.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exist"})
        }
        const hashPassward= await bcryptjs.hash(passward, 10)
        const createdUser=new User({
            fullname: fullname,
            email: email,
            passward: hashPassward,
        });
        await createdUser.save()
        res.status(201).json({message:"user created successfully", user:{
            _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
        }})
    } catch (error) {
        console.log("Error:  " + error.message)
        res.status(500).jason({message: "internal server error"})
        
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}