import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/AdminBookingConfig.css"; // Assuming you have a CSS file for styling

function AdminBookingConfig() {
  const [config, setConfig] = useState({
    cutOffTime: "17:00", // Default 5:00 PM
    blockedDates: [],
  });
  const [newBlockedDate, setNewBlockedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/safaridate/config");
      const data = await response.json();
      if (response.ok) {
        setConfig({
          cutOffTime: data.cutOffTime || "17:00",
          blockedDates: data.blockedDates ? data.blockedDates.map(date => new Date(date)) : [],
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching config:", error);
      setLoading(false);
    }
  };

  const handleTimeChange = (e) => {
    setConfig({ ...config, cutOffTime: e.target.value });
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    
    const dateStr = newBlockedDate.toISOString().split('T')[0];
    const alreadyExists = config.blockedDates.some(
      date => date.toISOString().split('T')[0] === dateStr
    );
    
    if (!alreadyExists) {
      setConfig({
        ...config,
        blockedDates: [...config.blockedDates, new Date(newBlockedDate)],
      });
    }
  };

  const handleRemoveBlockedDate = (index) => {
    const updatedDates = [...config.blockedDates];
    updatedDates.splice(index, 1);
    setConfig({ ...config, blockedDates: updatedDates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/safaridate/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          cutOffTime: config.cutOffTime,
          blockedDates: config.blockedDates.map(date => date.toISOString()),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Configuration updated successfully!");
      } else {
        setMessage(data.error || "Failed to update configuration");
      }
    } catch (error) {
      setMessage("Error updating configuration");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading configuration...</div>;
  }

  return (
    <div className="admin-booking-config">
      <h2>Safari Booking Configuration</h2>
      
      {message && <div className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cutOffTime">Daily Booking/Enquiry Cut-off Time:</label>
          <input
            type="time"
            id="cutOffTime"
            value={config.cutOffTime}
            onChange={handleTimeChange}
            required
          />
          <p className="help-text">
            After this time, users cannot book or enquire for same-day safaris
          </p>
        </div>

        <div className="form-group">
          <label>Block Safari Dates:</label>
          <div className="block-date-picker">
            <Calendar
              onChange={setNewBlockedDate}
              value={newBlockedDate}
              minDate={new Date()}
            />
            <button
              type="button"
              className="btn-add-date"
              onClick={handleAddBlockedDate}
            >
              Add Blocked Date
            </button>
          </div>
        </div>

        <div className="blocked-dates-list">
          <h4>Currently Blocked Dates:</h4>
          {config.blockedDates.length === 0 ? (
            <p>No dates currently blocked</p>
          ) : (
            <ul>
              {config.blockedDates.map((date, index) => (
                <li key={index}>
                  {date.toLocaleDateString()}
                  <button
                    type="button"
                    className="btn-remove-date"
                    onClick={() => handleRemoveBlockedDate(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </form>
    </div>
  );
}

export default AdminBookingConfig;