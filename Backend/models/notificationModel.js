import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "user",required: true,},
    message: {type: String,required: true, },
    isRead: {type: Boolean,default: false},
    type: {type: String,enum: ["orderPlaced", "orderStatusChanged"],required: true},
    relatedOrderId: {type: mongoose.Schema.Types.ObjectId,ref: "order", },
  },{ timestamps: true }
);

const notificationModel = mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default notificationModel;
