const authorization=(roles)=>{
    return (req,res,next)=>{
    const  user_role=req.body.role;
        // console.log(user_role);
        if(roles.includes(user_role)){
            next()
        }else{
            res.status(401).json({msg:"You are not authorized"})
        }
    }
   
}

module.exports={authorization}