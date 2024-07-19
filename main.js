
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bot.png";
const PERSON_IMG = "user.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "Seseorang";
const prompts = [
  ["hi", "hai", "halo", "selamat pagi", "selamat siang"],
  ["apa kabar", "bagaimana hidup", "apa kabar"],
  ["Kamu lucuu", "apa yang terjadi", "ada apa"],
  ["Kok gitu?"],
  ["Yaudah deh love youu <3", "apakah kamu manusia", "apakah kamu bot", "apakah kamu manusia atau bot"],
  ["siapa yang menciptakanmu", "siapa yang membuatmu"],
  [
    "namamu tolong",
    "namamu",
    "Bolehkah aku tahu namamu",
    "siapa namamu",
    "sebutan apa dirimu"
  ],
  ["aku mencintaimu"],
  ["bahagia", "baik", "menyenangkan", "luar biasa", "fantastis", "keren"],
  ["buruk", "bosan", "lelah"],
  ["tolong saya", "ceritakan cerita", "ceritakan lelucon"],
  ["ah", "ya", "oke", "oke", "bagus"],
  ["selamat tinggal", "selamat tinggal", "selamat tinggal", "sampai jumpa"],
  ["saya harus makan apa hari ini"],
  ["kawan"],
  ["apa", "mengapa", "bagaimana", "di mana", "kapan"],
  ["tidak", "tidak yakin", "mungkin", "tidak, terima kasih"],
  [""],
  ["haha", "ha", "lol", "hehe", "lucu", "lelucon"]
]
const replies = [
  ["Gatauuuuu!", "Hai!", "Hei!", "Hai!", "Halo"],
  [
    "Baik, bagaimana kabarmu?",
    "Baiklah, bagaimana kabarmu?",
    "Fantastis, bagaimana kabarmu?"
  ],
  [
    "aku si gaaa;v",
    "Udah mau tidur",
    "Bisakah kamu menebak?",
    "Aku tidak tahu sebenarnya",
    "Kamu jangan kesal ya hehe"
  ],
  ["Ygpp"],
  ["Saya hanya bot", "Saya bot. Apa kamu?"],
  ["Satu-satunya Tuhan yang benar, JavaScript"],
  ["Saya tidak bernama", "Saya tidak punya nama"],
  ["Aku juga mencintaimu", "Aku juga"],
  ["Apakah Anda pernah merasa tidak enak?", "Senang mendengarnya"],
  ["Mengapa?", "Mengapa? Seharusnya tidak!", "Cobalah menonton TV"],
  ["Bagaimana dengan?", "Suatu saat..."],
  ["Ceritakan sebuah cerita", "Ceritakan lelucon", "Ceritakan tentang diri Anda"],
  ["Sampai jumpa", "Selamat tinggal", "Sampai jumpa"],
  ["Sushi", "Pizza"],
  ["Kawan!"],
  ["Pertanyaan bagus"],
  ["Tidak apa-apa", "Saya mengerti", "Apa yang ingin Anda bicarakan?"],
  ["Tolong katakan sesuatu :("],
  ["Haha!", "Bagus!"]
];
const alternative = [
  "Gatau aku",
  "Mengapa?",
  "Mengapa? Seharusnya tidak!", 
  "Cobalah menonton TV",
  "Kangennnnnn",
  "Baik, bagaimana kabarmu?",
  "Baiklah, bagaimana kabarmu?",
  "Fantastis, bagaimana kabarmu?",
  "Bisakah kamu menebak?",
  "aku si gaaa;v",
  "Aku juga mencintaimu",
  "Ceritakan sebuah cerita",
  "Ceritakan lelucon", 
  "Ceritakan tentang diri Anda",
  "Aku juga",
  "Yaudah love youu aja ",
  "HEHE",
  "Gatau males mau beli trekk ;[",
  "Kamu GEJELAS",
  "Yaudah sanaa pergi dari aku",
  "PERGI AJA DARI AKU SANAA HUSHH",
  "Nonton yuk?",
  "aku suka seseorang tau",
  "Jangan pergi dari aku",
  "Kamu buaya banget",
  "kamu mah ga gudluking",
  "baguss banget tauuu",
  "Udh makan belum"
  ]
const robot = ["How do you do, fellow human", "I am not a bot"];
msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  msgerInput.value = "";
  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
  output(msgText);
});
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")  
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");
  if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(robot|bot|robo)/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  const delay = input.split(" ").length * 100;
  setTimeout(() => {
    addChat(BOT_NAME, BOT_IMG, "left", product);
  }, delay);
}
function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}
function addChat(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
function get(selector, root = document) {
  return root.querySelector(selector);
}
function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
