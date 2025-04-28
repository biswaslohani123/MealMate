import notificationModel from "../models/NotificationModel.js";

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
    try {
      console.log(req.body.userId)
      const notifications = await notificationModel.find({ userId: req.body.userId }).sort({ createdAt: -1 });
   
      res.json({ success: true, data: notifications });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Failed to fetch notifications." });
    }
  };
  // Mark notification as read
const markAsRead = async (req, res) => {
    try {
      await notificationModel.findByIdAndUpdate(req.body.notificationId, { isRead: true });
      res.json({ success: true, message: "Notification marked as read." });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Failed to update notification." });
    }
  };
  export { getUserNotifications , markAsRead}