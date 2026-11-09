// === GLOBÁLNÍ STAV APLIKACE ===
let vsichniHadi = [];
let aktualniJazyk = localStorage.getItem('lang') || 'cs';
let aktualniFiltr = 'Vše';
let otevreneIdHada = null;

// === NASTAVENÍ GOOGLE SHEETS A MĚNY ===
// Sem vlož svůj CSV odkaz z Google Sheets:
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLsFYVml5E7FnanvuMo_l4s_jkre2nU3WFZm_rY-kQDTJOPW6n-Zi5dVg7rSb0nH3uxeKmdcEnyh_3/pub?gid=0&single=true&output=csv";

const KURZ_EUR = 25;

// === DATABÁZE VRHŮ (Rodiče a datum líhnutí pro celou snůšku) ===
const databazeVrhu = {
  "A": {
    hatchDate: "18. 05. 2026",
    fatherName: "1.0 Arctic Toffeeconda",
    fatherImage: "img/otec-a.jpg",
    motherName: "0.1 Superarctic het Toffee",
    motherImage: "img/matka-a.jpg"
  },
  "B": {
    hatchDate: "02. 06. 2026",
    fatherName: "1.0 Sable het Toffee",
    fatherImage: "img/otec-b.jpg",
    motherName: "0.1 Toffeeconda het Sable",
    motherImage: "img/matka-b.jpg"
  }
};