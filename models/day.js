const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    log: [{
            time: {
                type: String,
                required: true
            },
            activity: {
                type: String,
                required: true
            }
        }]
});

daySchema.methods.addEntry = function (item) {
    this.log.push({
        time: item.time,
        activity: item.activity
    });
    return this.save();
};

// userSchema.methods.removeFromCart = function(productId) {
//   const updatedCartItems = this.cart.items.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = updatedCartItems;
//   return this.save();
// };

// userSchema.methods.clearCart = function() {
//   this.cart = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model('Day', daySchema);