let chatInputs = document.querySelectorAll(".chatInput");

const fetchResponse = async (message) => {
  const response = await fetch("https://chatbot-665m.onrender.com/chatBot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data.message.content;
};

const sendMessage = async (e) => {
  const response = await fetchResponse(
    chatInputs[chatInputs.length - 1].textContent
  );

  const chatMessage = document.createElement("div");
  chatMessage.innerHTML = `
            <div class="messageContainer w-100 d-flex gap-4">
                <img
                    src="./assets/chatbot-avatar.jpg"
                    class="rounded-circle"
                    style="width: 48px; height: 48px"
                />
                <div
                    class=" fw-bold px-4 py-3 w-75 bg-light rounded-5"
                >${response}</div>
            </div>
            <div class=" messageContainer w-100 d-flex gap-4 ">
                <img
                    src="./assets/avatar.jpg"
                    class="rounded-circle"
                    style="width: 48px; height: 48px"
                />
                <div
                    class="chatInput fw-bold px-4 py-3 w-75 bg-light rounded-5" contenteditable="true"
                ></div>
            </div>
        `;

  document.querySelector(".chatContainer").appendChild(chatMessage);
  chatInputs[chatInputs.length - 1].contentEditable = false;
  chatInputs = document.querySelectorAll(".chatInput");
};

let count = 1;

document.addEventListener("keypress", async (e) => {
  if (e.charCode === 13) {
    e.preventDefault();
  }
  if (e.target.classList.contains("chatInput") && e.charCode === 13 && count) {
    count = 0;
    const loading = document.createElement("div");
    loading.classList.add("spinner-border");
    loading.classList.add("text-primary");

    loading.innerHTML = `
        <span class="visually-hidden">Loading...</span>
    `;

    document.querySelector(".chatContainer").appendChild(loading);
    await sendMessage(e);
    count = 1;
    document.querySelector(".chatContainer").removeChild(loading);
  }
});
