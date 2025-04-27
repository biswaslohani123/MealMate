import React, { useEffect, useState, useContext } from "react";
import { Bell } from "lucide-react";
import "./Notification.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Notification = () => {
  const { token, url } = useContext(StoreContext);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${url}/api/notification/get`, {
        headers: { token },
      });
      if (res.data.success) {
        setNotifications(res.data.data);
        console.log(res.data)
      }
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  return (
    <div className="notification-wrapper">
      <Bell
        className="notification-icon"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {notifications.length > 0 && <span className="notification-dot"></span>}

      {showDropdown && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p className="no-notification">No notifications</p>
          ) : (
            notifications.map((note, index) => (
              <div key={index} className="notification-item">
                <p>{note.message}</p>
                <span>{new Date(note.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
