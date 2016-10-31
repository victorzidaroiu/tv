import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	locationID: String,
	basket: {}
});

export default mongoose.model('Customers', schema);
