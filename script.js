// ================= CONFIG =================
const nomorWA = "6285725539184";
const linkGrup = "https://chat.whatsapp.com/BRpml1sr4DW82DLmyaLyXh?mode=gi_t";

// ================= INIT =================
document.getElementById("grupLink").href = linkGrup;

let botTerpilih = "Belum dipilih";
let popup = document.getElementById("popupFitur");

// ================= BOT SELECT =================
document.querySelectorAll(".bot-item").forEach(bot => {

  if (bot.classList.contains("coming-soon")) return;

  // 1x klik = pilih bot
  bot.addEventListener("click", function() {
    botTerpilih = this.dataset.nama;

    // efek aktif
    document.querySelectorAll(".bot-item").forEach(b => {
      b.style.border = "none";
    });

    this.style.border = "2px solid #22c55e";
  });

  // 2x klik = tampilkan fitur
  bot.addEventListener("dblclick", function() {
    popup.style.display = "block";
    popup.innerText =
      "Fitur " + this.dataset.nama + ":\n\n" + this.dataset.fitur;
  });

});

// klik luar popup = tutup
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("bot-item")) {
    popup.style.display = "none";
  }
});


// ================= TOMBOL ADMIN =================
document.getElementById("adminBtn").onclick = function() {
  let pesanAdmin = `Halo kakk, saya mau tanya tentang bot WhatsApp 🙏`;
  window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanAdmin)}`, '_blank');
};


// ================= STATISTIK ORDER =================
let totalOrder = localStorage.getItem("totalOrder");

if (!totalOrder) {
  totalOrder = 0;
  localStorage.setItem("totalOrder", 0);
}

document.getElementById("totalOrder").innerText = totalOrder;

function tambahOrder() {
  totalOrder++;
  localStorage.setItem("totalOrder", totalOrder);
  document.getElementById("totalOrder").innerText = totalOrder;
}


// ================= BELI NORMAL =================
function beli(paket) {

  if (botTerpilih === "Belum dipilih") {
    alert("Silahkan pilih jenis bot dulu ya 🙏");
    return;
  }

  tambahOrder();

  let pesan = `Halo kak saya mau order:

🤖 Bot: ${botTerpilih}
📦 Paket: ${paket}

Silahkan tunggu chat dibalas dan akan diproses setelahnya 🙏`;

  window.open(
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );
}


// ================= BELI DISKON =================
function beliDiskon(element, namaPaket) {

  if (botTerpilih === "Belum dipilih") {
    alert("Silahkan pilih jenis bot dulu ya 🙏");
    return;
  }

  tambahOrder();

  let price = parseInt(element.dataset.price);
  let discount = parseInt(element.dataset.discount);
  let durasi = element.dataset.durasi || "-";

  let finalPrice = price - (price * discount / 100);

  let pesan = `Halo kak saya mau order:

🤖 Bot: ${botTerpilih}
📦 Paket: ${namaPaket}
⏳ Durasi: ${durasi}
💰 Harga Diskon: Rp${finalPrice.toLocaleString("id-ID")} (${discount}% OFF)

Silahkan tunggu chat dibalas dan akan diproses setelahnya 🙏`;

  window.open(
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );
}


// ================= AUTO HITUNG DISKON =================
document.querySelectorAll(".discount").forEach(btn => {

  let price = parseInt(btn.dataset.price);
  let discount = parseInt(btn.dataset.discount);
  let finalPrice = price - (price * discount / 100);

  let newPriceEl = btn.querySelector(".new-price");

  if (newPriceEl) {
    newPriceEl.innerText =
      "Rp" + finalPrice.toLocaleString("id-ID");
  }

});


// ================= FLASH SALE COUNTDOWN KE TANGGAL 22 =================

function getNextEndDate() {

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  // jika masih sebelum tanggal 22 → target bulan ini
  if (today < 22) {
    return new Date(year, month, 22, 0, 0, 0);
  } 
  // jika sudah tanggal 22 atau lewat → target bulan depan
  else {
    return new Date(year, month + 1, 22, 0, 0, 0);
  }
}

function matikanFlashSale() {

  document.querySelectorAll(".discount").forEach(btn => {

    let price = parseInt(btn.dataset.price);
    let durasi = btn.dataset.durasi || "-";
    let namaPaket = "Premium 1 Bulan";

    let newPriceEl = btn.querySelector(".new-price");
    let oldPriceEl = btn.querySelector(".old-price");
    let badgeEl = btn.querySelector(".badge");

    if (newPriceEl) {
      newPriceEl.innerText = "Rp" + price.toLocaleString("id-ID");
    }

    if (oldPriceEl) oldPriceEl.style.display = "none";
    if (badgeEl) badgeEl.style.display = "none";

    btn.classList.remove("discount");

    btn.onclick = function() {

      if (botTerpilih === "Belum dipilih") {
        alert("Silahkan pilih jenis bot dulu ya 🙏");
        return;
      }

      tambahOrder();

      let pesan = `Halo kak saya mau order:

🤖 Bot: ${botTerpilih}
📦 Paket: ${namaPaket}
⏳ Durasi: ${durasi}
💰 Harga: Rp${price.toLocaleString("id-ID")}

Silahkan tunggu chat dibalas dan akan diproses setelahnya 🙏`;

      window.open(
        `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
        '_blank'
      );
    };

  });

}

function mulaiCountdown() {

  const endDate = getNextEndDate();

  const timerInterval = setInterval(() => {

    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    if (distance <= 0) {

      clearInterval(timerInterval);

      document.getElementById("timer").innerText = "FLASH SALE BERAKHIR ❌";

      matikanFlashSale();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerText =
      `${days}h ${hours}j ${minutes}m ${seconds}d`;

  }, 1000);
}

mulaiCountdown();


// ================= pp zomm =================
const logo = document.getElementById("logoPP");
const overlay = document.getElementById("zoomOverlay");

logo.addEventListener("click", () => {
  overlay.style.display = "flex";
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

// ================= BELI MURSUN NORMAL =================
function beliMursun(paket) {
  
  tambahOrder();
  
  let pesan = `Halo kak saya mau order:

🚀 Produk: Suntik Followers (Mursun)
📦 Paket: ${paket}

Mohon segera di proses yah kak 🙏

_NB : Silahkan tunggu chat dibalas! _`;
  
  window.open(
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );
}


// ================= BELI MURSUN DISKON =================
function beliDiskonMursun(element, namaPaket) {
  
  tambahOrder();
  
  let price = parseInt(element.dataset.price);
  let discount = parseInt(element.dataset.discount);
  let durasi = element.dataset.durasi;
  
  let finalPrice = price - (price * discount / 100);
  
  let pesan = `Halo kak saya mau order:

🚀 Produk: Suntik Followers (Mursun)
📦 Paket: ${namaPaket}
📘 Detail: ${durasi}
💰 Harga Diskon: Rp${finalPrice.toLocaleString("id-ID")} (${discount}% OFF)

Mohon segera di proses yah kak 🙏

_NB : Silahkan tunggu chat dibalas!_`;
  
  window.open(
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`,
    '_blank'
  );
                                   }
