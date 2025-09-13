import  Jwt  from "jsonwebtoken";


interface payload{
    role: string,
    id:string
}


 const generateToken = (id:string, role: string):string =>{
    const payload:payload = {id, role};
    return Jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1d"})
}


export default generateToken


