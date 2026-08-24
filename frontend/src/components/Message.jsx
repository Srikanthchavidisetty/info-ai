function Message({ text, role }) {
  return (
    <div>
      <strong>{role}:</strong> {text}
    </div>
  );
}

export default Message;
