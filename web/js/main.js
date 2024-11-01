function sendMessage() {
    var message = document.getElementById("messageInput").value;
    eel.receive_message(message);
}