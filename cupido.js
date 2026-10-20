(function () {
  var WA = "https://wa.me/13055824136?text=" + encodeURIComponent(
    "Hola, vi Pega'o en pegaousa.com y quiero ser Fundador."
  );

  var KB = [
    {
      q: /edad|18|menor|años|years|old enough|underage/i,
      es: "Pega'o es solo para mayores de 18. Si no tienes 18, no puedes crear cuenta.",
      en: "Pega'o is 18+ only. If you're under 18, you can't create an account."
    },
    {
      q: /fund|premium|gratis|free|500|lanzamiento|launch|vip/i,
      es: "Los primeros 500 con perfil completo y verificado en tu ciudad llevan Premium de por vida e insignia de Fundador. Apúntate arriba en «Quiero ser Fundador».",
      en: "The first 500 with a complete, verified profile in your city get lifetime Premium and a Founder badge. Sign up above in “I want to be a Founder”."
    },
    {
      q: /cómo|como funciona|swipe|match|chat|like|nope|how (do|does)|work/i,
      es: "Deslizas perfiles (Like o Nope). Si hay Like mutuo, hay match y se abre el chat. Cupido te puede dar ideas para el primer mensaje.",
      en: "You swipe profiles (Like or Nope). Mutual Likes become a match and unlock chat. Cupid can suggest a first message."
    },
    {
      q: /miami|ciudad|city|dónde|donde|location|passport/i,
      es: "Nació en Miami. Configuras distancia y edad. El cambio de ciudad con Pega'o Passport todavía está en desarrollo.",
      en: "It was built in Miami. You set distance and age. City switching with Pega'o Passport is still in development."
    },
    {
      q: /verific|selfie|seguro|safety|fake|falso|identidad/i,
      es: "Habrá verificación con selfie. Tú bloqueas y reportas. Los perfiles del prototipo ahora son de demostración.",
      en: "Selfie verification is coming. You can block and report. Current prototype profiles are demo data."
    },
    {
      q: /privacidad|datos|borrar|delete|privacy|firebase/i,
      es: "No vendemos tus datos. Puedes borrar la cuenta desde el perfil. Privacidad: privacidad@pegaousa.com",
      en: "We don't sell your data. You can delete your account from your profile. Privacy: privacidad@pegaousa.com"
    },
    {
      q: /iphone|android|app store|play|descarg|download/i,
      es: "La app está en camino. Déjanos tu WhatsApp en Fundadores y te avisamos el día del lanzamiento.",
      en: "The app is on the way. Leave your WhatsApp in Founders and we'll ping you at launch."
    },
    {
      q: /super like|boost|passport/i,
      es: "Super Likes y Boost están diseñados en la interfaz; la promoción real del perfil aún se está conectando.",
      en: "Super Likes and Boost exist in the UI; real profile promotion is still being wired up."
    },
    {
      q: /hielo|opener|mensaje|message|convers|idea|piropo|hello|hi /i,
      es: "Prueba esto: «Vi que estás en Miami — ¿café en Wynwood o playa este finde?» Corto, concreto, sin presión.",
      en: "Try this: “You're in Miami — Wynwood coffee or the beach this weekend?” Short, specific, no pressure."
    },
    {
      q: /precio|cost|pag|card|tarjeta|plan/i,
      es: "Fundador: Premium gratis de por vida si entras en los primeros 500 verificados. El resto de planes se anuncian en el lanzamiento.",
      en: "Founders get lifetime Premium if they're in the first 500 verified. Other plans drop at launch."
    }
  ];

  function lang() {
    return document.documentElement.lang === "en" ? "en" : "es";
  }

  function t(es, en) {
    return lang() === "en" ? en : es;
  }

  function reply(text) {
    var s = (text || "").trim();
    if (!s) return t("Escríbeme algo 👇", "Type something 👇");
    for (var i = 0; i < KB.length; i++) {
      if (KB[i].q.test(s)) return KB[i][lang()];
    }
    return t(
      "Soy Cupido, el asistente de Pega'o. Pregúntame por Fundadores, cómo funciona, privacidad o un opener. Si quieres plaza ya: " + WA,
      "I'm Cupid, Pega'o's assistant. Ask about Founders, how it works, privacy, or an opener. To grab a spot: " + WA
    );
  }

  function bubble(box, who, text) {
    var el = document.createElement("div");
    el.className = "cupido-msg " + who;
    el.textContent = text;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  }

  var btn = document.getElementById("cupidoOpen");
  var panel = document.getElementById("cupidoBox");
  var msgs = document.getElementById("cupidoMsgs");
  var form = document.getElementById("cupidoForm");
  var input = document.getElementById("cupidoInput");
  var close = document.getElementById("cupidoClose");
  if (!btn || !panel || !form) return;

  var greeted = false;
  function closeBox() {
    panel.classList.remove("on");
  }
  function openBox() {
    if (shouldMinimize()) return;
    panel.classList.add("on");
    if (!greeted) {
      bubble(
        msgs,
        "bot",
        t(
          "Hola, soy Cupido 🧡 Solo 18+. ¿Quieres ser Fundador, saber cómo funciona o un opener para el chat?",
          "Hi, I'm Cupid 🧡 18+ only. Want Founders, how it works, or a chat opener?"
        )
      );
      greeted = true;
    }
    input.focus();
  }
  function shouldMinimize() {
    var h = (location.hash || "").toLowerCase();
    return h === "#privacidad" || h === "#reglas" || h === "#terminos";
  }
  function onHash() {
    if (shouldMinimize()) closeBox();
  }

  closeBox();
  window.addEventListener("hashchange", onHash);
  window.addEventListener("popstate", onHash);

  btn.addEventListener("click", function () {
    if (panel.classList.contains("on")) closeBox();
    else openBox();
  });
  close.addEventListener("click", closeBox);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    bubble(msgs, "me", q);
    input.value = "";
    setTimeout(function () {
      bubble(msgs, "bot", reply(q));
    }, 280);
  });
})();
