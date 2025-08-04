const Notification = ({ message }) => {
  if (!message) return null;
  return <div style={{ color: "red", padding: "4px", border: "2px"}}>{message}</div>;
};

export default Notification;
