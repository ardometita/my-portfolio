fetch("https://your-backend-url.onrender.com/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: name,
    email: email,
    message: message
  })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    alert("Message sent!");
  } else {
    alert("Failed to send message.");
  }
});