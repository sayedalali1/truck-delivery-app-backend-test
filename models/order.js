const OrderSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['accepted', 'rejected'],
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['delivered', 'onWay', 'preparing'],
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
