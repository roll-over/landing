const widgetButton = document.createElement("button");
widgetButton.innerText = localisation.widgetButton;
widgetButton.style.position = "fixed";
widgetButton.style.bottom = "10px";
widgetButton.style.right = "10px";
widgetButton.style.zIndex = "9999";
widgetButton.style.padding = "10px";
widgetButton.style.borderRadius = "15px";
widgetButton.style.backgroundColor = "#3ca3cb";

const widget = document.createElement("div");
widget.style.position = "fixed";
widget.style.bottom = "10px";
widget.style.right = "10px";
widget.style.zIndex = "9999";
widget.style.padding = "10px";
widget.style.borderRadius = "15px";
widget.style.backgroundColor = "#2b89c8";
widget.style.color = "white";
widget.style.display = "none";
widget.style.width = "320px";
widget.style.height = "400px";

const widgetTitle = document.createElement("h2");
widgetTitle.innerText = localisation.title + ": " + project;

const widgetClose = document.createElement("button");
widgetClose.innerText = "x";
widgetClose.style.position = "absolute";
widgetClose.style.top = "5px";
widgetClose.style.right = "5px";
widgetClose.style.width = "30px";
widgetClose.style.height = "30px";
widgetClose.style.borderRadius = "15px";
widgetClose.style.backgroundColor = "#55555555";
widgetClose.style.color = "white";

const widgetContent = document.createElement("div");
widgetContent.style.position = "absolute";
widgetContent.style.top = "50px";
widgetContent.style.left = "5px";
widgetContent.style.right = "5px";
widgetContent.style.bottom = "50px";
widgetContent.style.padding = "10px";
widgetContent.style.borderRadius = "15px";
widgetContent.style.backgroundColor = "#3ca3cb";
widgetContent.style.color = "black";
widgetContent.style.overflow = "auto";

const widgetFooter = document.createElement("div");
widgetFooter.style.position = "absolute";
widgetFooter.style.bottom = "0px";
widgetFooter.style.right = "0px";
widgetFooter.style.left = "0px";
widgetFooter.style.display = "flex";
widgetFooter.style.padding = "5px";
widgetFooter.style.gap = "5px";
widgetFooter.style.maxWidth = "100%";
widgetFooter.style.height = "50px";

const newMessage = document.createElement("input");
newMessage.placeholder = localisation.newMessagePlaceholder;
newMessage.style.padding = "10px";
newMessage.style.borderRadius = "15px";
newMessage.style.backgroundColor = "white";
newMessage.style.color = "black";

const sendMessageButton = document.createElement("button");
sendMessageButton.innerText = localisation.sendMessageButton;
sendMessageButton.style.borderRadius = "15px";
sendMessageButton.style.backgroundColor = "#3ca3cb";
sendMessageButton.style.color = "white";

const getMessageBlock = (message) => {
  const messageElement = document.createElement("div");
  messageElement.style.padding = "10px";
  messageElement.style.borderRadius = "15px";
  messageElement.style.backgroundColor = "white";
  messageElement.style.color = "black";
  messageElement.style.marginBottom = "10px";
  messageElement.innerText = message;
  return messageElement;
};

const sendMessage = async () => {
  if (!newMessage.value) {
    return;
  }

  await fetch(`/embed/messages?project=${project}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        type: "text",
        text: newMessage.value,
        lang: lang,
      },
    }),
  });

  await loadMessages();

  newMessage.value = "";
};

const loadMessages = async () => {
  widgetContent.innerHTML = "";
  const messages = await fetch(`/embed/messages?lang=${lang}&project=${project}`).then((res) =>
    res.json(),
  );

  for (const message of messages) {
    let messageElement;
    if (message.type === "text") {
      messageElement = getMessageBlock(message.text);
    } else {
      throw new Error("Unknown message type: " + message.type);
    }
    if (message.author === "user") {
      messageElement.style.backgroundColor = "#8ed0dc";
      messageElement.style.color = "black";
      messageElement.style.alignSelf = "flex-end";
      messageElement.style.marginLeft = "50px";
    } else if (message.author === "bot" || message.author === "support") {
      messageElement.style.backgroundColor = "#c1e8e8";
      messageElement.style.color = "black";
      messageElement.style.alignSelf = "flex-start";
      messageElement.style.marginRight = "50px";
    }

    const messageTime = document.createElement("div");
    messageTime.style.fontSize = "12px";
    messageTime.style.color = "gray";
    messageTime.innerText = message.date ? new Date(message.date).toLocaleString() : "";

    const authors = {
      user: "Вы",
      bot: "Бот 🤖",
      support: "Оператор",
    };

    const messageAuthor = document.createElement("div");
    messageAuthor.style.fontSize = "12px";
    messageAuthor.style.color = "gray";
    messageAuthor.innerText = authors[message.author];

    const subInfoElement = document.createElement("div");
    subInfoElement.style.fontSize = "12px";
    subInfoElement.style.display = "flex";
    subInfoElement.style.justifyContent = "space-between";

    subInfoElement.appendChild(messageTime);
    subInfoElement.appendChild(messageAuthor);

    messageElement.appendChild(subInfoElement);

    widgetContent.appendChild(messageElement);
    widgetContent.scrollTo(0, widgetContent.scrollHeight);
  }
};

widgetClose.addEventListener("click", () => {
  widget.style.display = "none";
  widgetButton.style.display = "block";
});

widgetButton.addEventListener("click", () => {
  widget.style.display = "block";
  widgetButton.style.display = "none";
});

sendMessageButton.addEventListener("click", sendMessage);

newMessage.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

loadMessages();
widgetFooter.appendChild(newMessage);
widgetFooter.appendChild(sendMessageButton);
widget.appendChild(widgetTitle);
widget.appendChild(widgetClose);
widget.appendChild(widgetContent);

widget.appendChild(widgetFooter);

document.body.appendChild(widgetButton);
document.body.appendChild(widget);
