const Listing = require("../models/listing");
const cloudinary = require("../cloudConfig.js");



module.exports.index = async (req, res) => {
    const allListing = await Listing.find({})
    res.json(allListing)
};


module.exports.showlisting = async (req, res) => {
    try {
       let {id} = req.params;
       let listing = await Listing.findById(id)
          .populate( { path : "reviews", populate : {  path: "author" }}) //nesting
          .populate("owner");
       console.log(listing)
       res.json(listing);
      }catch (error) {
          return res.status(500).send("Internal server error")
      }
};



module.exports.createListing = async (req, res ) => {
    
    const { title, description, price, image, location, country  } = req.body;

    try {
        const result = await cloudinary.uploader.upload(image , {
            folder : "wanderlustDev"
        })   
        const createListing = new Listing({ 
            title, 
            description, 
            price, 
            image:{
                url: result.secure_url
            },
            location, 
            country 
        })
        createListing.owner = req.user.id   ////associate a user to the listing
        console.log(createListing.owner) 
        await createListing.save();
        res.send(createListing);
    }catch (error) {
        return res.status(500).send("Internal server error")
    }
};



module.exports.updateListing = async (req, res) => {
    try {
       let { title, description, image, price, location, country } = req.body;
       let { id } = req.params;

       //create new listing
       const newList = {};
       if (title) { newList.title = title;  }
       if (description) { newList.description = description;  }
       if (image) { newList.image = image;  }
       if (price) { newList.price = price;  }
       if (location) { newList.location = location; }
       if (country) { newList.country = country; }

       //find the list to be updated and update it----Authorization part
       let list = await Listing.findById(id);
       if(!list){
           return res.status(404).send("Not Found")
       }
       if(list.owner.toString() !== req.user.id){
           return res.status(401).send("Not Found")
       }

       let updateListing = await Listing.findByIdAndUpdate(id, { $set: newList }, { new: true });  

       const result = await cloudinary.uploader.upload(image , {
        folder : "wanderlustDev"
       })  

       if(result){
        updateListing.image = {
            url: result.secure_url
       }
       await updateListing.save();
       }
       
       res.json( updateListing )
   }catch (error) {
       return res.status(500).send("Internal server error")
   }
};



module.exports.destroyListing =async (req,res) =>{
    try {
    let {id} = req.params;

    //find the list to be updated and update it----Authorization part
    let list = await Listing.findById(id);
    if(!list){
        return res.status(404).send("Not Found")
    }
    if(list.owner.toString() !== req.user.id){
        return res.status(401).send("Not Found")
    }

    await Listing.findByIdAndDelete(id)
    res.json({"success ": "deleted successfully" })
    }catch (error) {
        return res.status(500).send("Internal server error")
    }
}

module.exports.searchListing = async(req,res) => {
   try {
      const {keyword} = req.params;
      const results =  await Listing.find({
        $or:[
            {location :{ $regex : keyword , $options : "i"}},
            {country :{ $regex : keyword , $options : "i"}}
        ]
      });
      res.json(results);
   } catch (error) {
      return res.status(500).send("Internal server error")
   }
}