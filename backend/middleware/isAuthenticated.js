import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
       
        if (!token) {
            return res.status(401).json
                ({
                    message: "token is invalid"
                }) }
const decode = await jwt.verify(token,process.env.JWT_SECRET)

if (!decode){
    return res.status(401).json({message:"invalid token "})
}
req.id=decode?.userId



        next();
    } catch (error) {
        console.log("error", error)
    }
}
export default isAuthenticated;