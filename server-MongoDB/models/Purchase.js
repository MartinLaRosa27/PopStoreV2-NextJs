const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema({
  prodcutsId: {
    type: Array,
    require: true,
  },

  transactionDay: {
    type: Date,
    require: true,
    default: Date.now(),
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = Purchase = mongoose.model("Purchase", PurchaseSchema);
