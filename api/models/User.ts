import mongoose from 'mongoose'

const  userSchema = new mongoose.Schema({
name: {type :String,required :  true},
email: {type: String, required :true},
whatsappNumber: String,
profileImage:  String,
},{timestamps : true});

export default  mongoose.model('User', userSchema);

