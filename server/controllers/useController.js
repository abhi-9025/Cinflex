const User=require("../models/userModel")
module.exports.addToLikedMovies=async(req,res)=>{
    try {
          const {email,data}=req.body
          const user=await User.findOne({email})
          if(user){
            const {likedMovies}=user
            const movieAlreadyLiked=likedMovies.find(({id})=>id===data.id)
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {
                       likedMovies:[...user.likedMovies,data]   
                    },
                    {new:true}
                );
            }
            else{
                return res.json({msg:"movie alredy added to the list"})
            }
          }
          else{
            await User.create({email,likedMovies:[data]})
            return res.json({msg:"Movie added to the list"})
          }
    } catch (error) {
      return res.json({msg:"Error in adding movie"})
    }  
}

module.exports.getLikedMovies=async(req,res)=>{
    try {
        const {email}=req.params
        const user=await User.findOne({email})
       if(user){
        return res.json({msg:"Success",movies:user.likedMovies})
       }
       else{
        return res.json({msg:"user not found"})
       }

    } catch (error) {
        return res.json({msg:"Error in fetching movies"})
    }
}