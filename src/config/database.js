const mongoose=require("mongoose");

const connectionDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://milkabhau87:GleGiiEKvQj3GMfD@namastenode.e5moccv.mongodb.net/divInder"
    );
};

module.exports={connectionDB};