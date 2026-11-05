let vsichniHadi = [];
let aktualniJazyk = localStorage.getItem('lang') || 'cs';
let aktualniFiltr = 'Vše';
let otevreneIdHada = null;

// 1. Slovník všech textů na stránce (CZ a EN)
const preklady = {
  cs: {
    navHome: "Úvod",
    navOffer: "Nabídka odchovů",
    navBreeding: "Náš chov",
    navContact: "Kontakt",
    heroBadge: "Sezóna 2026 / 2027",
    heroTitle: "Vlastní odchovy",
    heroDesc: "Zaměřujeme se na selektivní chov barevných a kresebných forem heterodonů. Všechna mláďata odchází perfektně rozkrmená na rozmrazená holátka, s kompletním přehledem genetiky a doživotním chovatelským servisem.",
    heroBtnOffer: "Zobrazit aktuální nabídku",
    heroBtnBreeding: "Prohlédnout chovné skupiny",
    feat1Title: "Ověřená genetika",
    feat1Desc: "Kombinace linií Toffee, Arctic, Axanthic, Sable, Conda a dalších s jasným původem rodičů.",
    feat2Title: "100% zdravotní stav",
    feat2Desc: "Zvířata jsou krmena hlodavci z vlastního čistého chovu a odchází až po minimálně 5 samostatných krmeních.",
    feat3Title: "Osobní předání",
    feat3Desc: "Možnost vyzvednutí osobně (Plzeňsko / Kdyně) nebo po domluvě na terarijních burzách Živá Exotika v Praze.",
    offerTitle: "Aktuální nabídka mláďat",
    offerSubtitle: "Kliknutím na tlačítka níže si můžeš vyfiltrovat dostupná zvířata.",
    filterAll: "Všechna zvířata",
    filterAvailable: "Jen volní",
    filterMales: "Samci (1.0)",
    filterFemales: "Samice (0.1)",
    backToOffer: "Zpět na přehled nabídky",
    breedingTitle: "O našem chovu a projektech",
    breedingDesc: "Tady můžeš představit své chovné samce a samice, podmínky, ve kterých hady držíš, zimování a plány páření na nadcházející sezónu.",
    breedingProjectsTitle: "Plánované projekty",
    breedingProjectsDesc: "Sem můžeme v dalším kroku přidat fotogalerii chovných zvířat nebo tabulku chystaných spojení.",
    contactTitle: "Kontakt a rezervace",
    contactDesc: "Máš-li zájem o konkrétní mládě nebo dotaz k chovu, ozvi se nám přes sociální sítě nebo e-mail.",
    contactEmailBtn: "Napsat e-mail",
    footerRights: "Všechna práva vyhrazena",
    weightLabel: "Váha",
    moreDetails: "Více detailů",
    maleLabel: "1.0 (Samec)",
    femaleLabel: "0.1 (Samice)",
    photoBaby: "Fotka mláděte",
    parentsTitle: "Rodiče mláděte (kliknutím zvětšíš)",
    backToBabyPhoto: "Zpět na fotku mláděte",
    fatherBadge: "♂ OTEC (1.0)",
    motherBadge: "♀ MATKA (0.1)",
    idLabel: "ID jedince",
    sexLabel: "Pohlaví",
    currentWeightLabel: "Aktuální váha",
    hatchDateLabel: "Datum líhnutí",
    feedingLabel: "Potrava",
    detailsHeading: "Podrobné informace",
    priceLabel: "Cena mláděte",
    interestedBtn: "Mám zájem o toto mládě",
    inquiryBanner: "Poptáváš mládě:",
    inquirySub: "Napiš nám přes libovolný kontakt níže a uveď toto ID."
  },
  en: {
    navHome: "Home",
    navOffer: "Available",
    navBreeding: "Our Collection",
    navContact: "Contact",
    heroBadge: "Season 2026 / 2027",
    heroTitle: "Captive Bred",
    heroDesc: "We specialize in selective breeding of Western Hognose (Heterodon nasicus) morphs. All hatchlings leave well-started on frozen/thawed pinkies, with full genetic background and lifetime support.",
    heroBtnOffer: "View Available Snakes",
    heroBtnBreeding: "Explore Breeding Projects",
    feat1Title: "Proven Genetics",
    feat1Desc: "Combinations of Toffee, Arctic, Axanthic, Sable, Conda and more with documented parent lineages.",
    feat2Title: "100% Health Guarantee",
    feat2Desc: "Fed exclusively on rodents from our own clean facility and released only after at least 5 consecutive meals.",
    feat3Title: "Personal Pickup & Expos",
    feat3Desc: "Personal pickup available in Czechia (Pilsen region / Kdyně) or handover at Živá Exotika reptile expos in Prague.",
    offerTitle: "Available Offspring",
    offerSubtitle: "Use the filter buttons below to browse available animals.",
    filterAll: "All Animals",
    filterAvailable: "Available Only",
    filterMales: "Males (1.0)",
    filterFemales: "Females (0.1)",
    backToOffer: "Back to available list",
    breedingTitle: "About Our Collection & Projects",
    breedingDesc: "Here you can showcase your adult breeders, husbandry conditions, brumation setup and pairing plans for the upcoming season.",
    breedingProjectsTitle: "Planned Pairings",
    breedingProjectsDesc: "We can add a photo gallery of your breeders or a pairing schedule table here.",
    contactTitle: "Contact & Reservations",
    contactDesc: "If you are interested in a specific snake or have any questions, reach out via social media or email.",
    contactEmailBtn: "Send an Email",
    footerRights: "All rights reserved",
    weightLabel: "Weight",
    moreDetails: "More details",
    maleLabel: "1.0 (Male)",
    femaleLabel: "0.1 (Female)",
    photoBaby: "Offspring photo",
    parentsTitle: "Parents (click to enlarge)",
    backToBabyPhoto: "Back to offspring photo",
    fatherBadge: "♂ SIRE (1.0)",
    motherBadge: "♀ DAM (0.1)",
    idLabel: "Animal ID",
    sexLabel: "Sex",
    currentWeightLabel: "Current Weight",
    hatchDateLabel: "Hatch Date",
    feedingLabel: "Diet",
    detailsHeading: "Detailed Information",
    priceLabel: "Price",
    interestedBtn: "Inquire about this snake",
    inquiryBanner: "Inquiring about:",
    inquirySub: "Contact us via any channel below and mention this ID."
  }
};

// 2. Inicializace motivu a jazyka při startu
document.addEventListener("DOMContentLoaded", () => {
  const ulozenyRezim = localStorage.getItem('theme');
  if (ulozenyRezim === 'light') {
    document.documentElement.classList.remove('dark');
    document.getElementById('ikona-rezimu').className = "fa-solid fa-sun";
  } else {
    document.documentElement.classList.add('dark');
    document.getElementById('ikona-rezimu').className = "fa-solid fa-moon";
  }
  aplikujJazyk();
});
// === NASTAVENÍ GOOGLE SHEETS A VRHŮ ===

// 1. Sem vlož zkopírovaný CSV odkaz ze své Google Tabulky:
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLsFYVml5E7FnanvuMo_l4s_jkre2nU3WFZm_rY-kQDTJOPW6n-Zi5dVg7rSb0nH3uxeKmdcEnyh_3/pub?gid=0&single=true&output=csv";

// 2. Kurz pro automatický přepočet Kč na EUR v anglické verzi:
const KURZ_EUR = 25;

// 3. Databáze vrhů (rodiče a datum líhnutí zadáš jen jednou pro celou snůšku):
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

// 3. Načtení dat přímo z Google Tabulky (s fallbackem na hadi.json, dokud nevložíš odkaz)
const zdrojDat = GOOGLE_SHEET_CSV_URL.startsWith("http") ? GOOGLE_SHEET_CSV_URL : 'hadi.json';

fetch(zdrojDat)
  .then(odpoved => odpoved.text())
  .then(surovaData => {
    if (zdrojDat.endsWith('.json')) {
      vsichniHadi = JSON.parse(surovaData);
    } else {
      vsichniHadi = zpracujCsvTabulku(surovaData);
    }
    filtruj(aktualniFiltr);
    zpracujHashUrl();
  });

// Převod řádků z Google Sheets (CSV) na chytré objekty hadů
function zpracujCsvTabulku(csvText) {
  const radky = parseCSV(csvText);
  if (radky.length < 2) return [];

  const hlavicka = radky[0].map(h => h.trim());
  const vysledek = [];

  for (let i = 1; i < radky.length; i++) {
    const radek = radky[i];
    if (!radek[0] || radek[0].trim() === "") continue; // Přeskočí prázdné řádky v tabulce

    let raw = {};
    hlavicka.forEach((klic, index) => {
      raw[klic] = radek[index] ? radek[index].trim() : "";
    });

    const vrh = databazeVrhu[raw.clutch] || {};
    const cistaCena = parseInt(raw.price.replace(/\s+/g, ''), 10) || 0;
    const kodStavu = (raw.status || 'V').toUpperCase();

    vysledek.push({
      id: raw.id,
      name: raw.name,
      hets: raw.hets,
      sex: raw.sex,
      weight: raw.weight.includes('g') ? raw.weight : `${raw.weight} g`,
      hatchDate: vrh.hatchDate || "-",
      fatherName: vrh.fatherName || "-",
      fatherImage: vrh.fatherImage || `img/${raw.id}.jpg`,
      motherName: vrh.motherName || "-",
      motherImage: vrh.motherImage || `img/${raw.id}.jpg`,
      feeding: "Rozmrazená myší holátka",
      feedingEn: "Frozen/thawed pinky mice",
      description: raw.description || "Zdravé, bezproblémově rozkrmené mládě z vlastního chovu. Samostatně přijímá rozmrazená holátka z pinzety.",
      descriptionEn: raw.descriptionEn || "Healthy, well-started hatchling from our own breeding. Feeding reliably on frozen/thawed pinkies off tongs.",
      price: cistaCena ? `${cistaCena.toLocaleString('cs-CZ')} Kč` : "Na dotaz",
      priceEn: cistaCena ? `${Math.round(cistaCena / KURZ_EUR)} €` : "Inquire",
      status: kodStavu === 'V' ? 'Volný' : (kodStavu === 'R' ? 'Rezervace' : 'Prodáno'),
      statusEn: kodStavu === 'V' ? 'Available' : (kodStavu === 'R' ? 'On Hold' : 'Sold'),
      // Pokud do sloupce K (image) nedáš jiný odkaz, fotka se vezme automaticky ze složky img/ podle ID:
      image: raw.image || `img/${raw.id}.jpg`
    });
  }
  return vysledek;
}

// Bezpečné rozsekání CSV (zvládá i čárky uvnitř vět v popiscích)
function parseCSV(text) {
  const radky = [];
  let radek = [], bunka = '', vUvozovkach = false;
  for (let i = 0; i < text.length; i++) {
    const znak = text[i], dalsi = text[i + 1];
    if (vUvozovkach) {
      if (znak === '"' && dalsi === '"') { bunka += '"'; i++; }
      else if (znak === '"') { vUvozovkach = false; }
      else { bunka += znak; }
    } else {
      if (znak === '"') { vUvozovkach = true; }
      else if (znak === ',') { radek.push(bunka); bunka = ''; }
      else if (znak === '\n' || (znak === '\r' && dalsi === '\n')) {
        if (znak === '\r') i++;
        radek.push(bunka); radky.push(radek); radek = []; bunka = '';
      } else { bunka += znak; }
    }
  }
  if (bunka || radek.length > 0) { radek.push(bunka); radky.push(radek); }
  return radky;
}
// 4. Přepínání jazyka (CZ <-> EN)
function prepnoutJazyk() {
  aktualniJazyk = aktualniJazyk === 'cs' ? 'en' : 'cs';
  localStorage.setItem('lang', aktualniJazyk);
  aplikujJazyk();
}

function aplikujJazyk() {
  const t = preklady[aktualniJazyk];
  document.documentElement.lang = aktualniJazyk;
  
  // Tlačítko ukazuje jazyk, do kterého se dá přepnout
  document.getElementById('tlacitko-jazyk').innerText = aktualniJazyk === 'cs' ? 'EN' : 'CZ';

  // Přeloží všechny HTML prvky s atributem data-i18n
  document.querySelectorAll('[data-i18n]').forEach(prvek => {
    const klic = prvek.getAttribute('data-i18n');
    if (t[klic]) prvek.innerText = t[klic];
  });

  // Překreslí katalog i případně otevřený detail hada do nového jazyka
  if (vsichniHadi.length > 0) {
    filtruj(aktualniFiltr);
    if (otevreneIdHada && !document.getElementById('sekce-detail').classList.contains('hidden')) {
      otevriDetail(otevreneIdHada, false);
    }
  }
}

// Pomocná funkce pro formátování pohlaví podle jazyka
function formatujPohlavi(sexKod) {
  const t = preklady[aktualniJazyk];
  return sexKod.includes('1.0') ? t.maleLabel : t.femaleLabel;
}

// 5. Rozpoznání URL adresy
function zpracujHashUrl() {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('detail-')) {
    const idHada = hash.replace('detail-', '');
    otevriDetail(idHada, false);
  } else if (hash && document.getElementById('sekce-' + hash)) {
    zmenZalozku(hash, false);
  } else {
    zmenZalozku('domu', false);
  }
}

// 6. Přepínání hlavních záložek
function zmenZalozku(nazevZalozky, zapsatDoHistorie = true) {
  document.querySelectorAll('.zalozka').forEach(sekce => {
    sekce.classList.add('hidden');
  });

  const cilovaSekce = document.getElementById('sekce-' + nazevZalozky);
  if (cilovaSekce) cilovaSekce.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(tlacitko => {
    tlacitko.className = 'nav-btn px-3 py-2 rounded-lg text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition';
  });
  const idAktivnihoMenu = nazevZalozky === 'detail' ? 'nabidka' : nazevZalozky;
  const aktivniTlacitko = document.getElementById('nav-' + idAktivnihoMenu);
  if (aktivniTlacitko) {
    aktivniTlacitko.className = 'nav-btn px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 dark:text-amber-500 bg-zinc-200 dark:bg-zinc-900 transition';
  }

  if (zapsatDoHistorie) {
    history.pushState({ zalozka: nazevZalozky }, "", "#" + nazevZalozky);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 7. Vykreslení karet v katalogu
function vykresliKarty(poleHadu) {
  const mrizka = document.getElementById('katalog-mrizka');
  if (!mrizka) return;
  mrizka.innerHTML = '';
  const t = preklady[aktualniJazyk];

  poleHadu.forEach(had => {
    const stavText = aktualniJazyk === 'en' ? (had.statusEn || had.status) : had.status;
    const cenaText = aktualniJazyk === 'en' ? (had.priceEn || had.price) : had.price;
    const barvaStavu = had.status === 'Volný' 
      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30';

    mrizka.innerHTML += `
      <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm dark:shadow-lg hover:border-amber-500/50 dark:hover:border-amber-500/50 transition flex flex-col">
        <img onclick="otevriDetail('${had.id}', true)" src="${had.image}" alt="${had.name}" class="w-full h-56 object-cover cursor-pointer hover:opacity-90 transition">
        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-mono text-zinc-500 dark:text-zinc-400">${had.id} • ${formatujPohlavi(had.sex)}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full border ${barvaStavu}">${stavText}</span>
            </div>
            <h2 onclick="otevriDetail('${had.id}', true)" class="text-xl font-bold text-zinc-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition">${had.name}</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">${had.hets} • ${t.weightLabel}: ${had.weight}</p>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <span class="text-lg font-bold text-amber-600 dark:text-amber-400">${cenaText}</span>
            <button onclick="otevriDetail('${had.id}', true)" class="text-sm bg-zinc-200 dark:bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 font-semibold px-3.5 py-1.5 rounded-lg transition">
              ${t.moreDetails} <i class="fa-solid fa-chevron-right text-xs ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// 8. Otevření podstránky s detailem mláděte a rodiči
function otevriDetail(idHada, zapsatDoHistorie = true) {
  const had = vsichniHadi.find(h => h.id === idHada);
  if (!had) {
    zmenZalozku('nabidka', false);
    return;
  }
  otevreneIdHada = idHada;
  const t = preklady[aktualniJazyk];

  const stavText = aktualniJazyk === 'en' ? (had.statusEn || had.status) : had.status;
  const cenaText = aktualniJazyk === 'en' ? (had.priceEn || had.price) : had.price;
  const potravaText = aktualniJazyk === 'en' ? (had.feedingEn || had.feeding) : had.feeding;
  const popisText = aktualniJazyk === 'en' ? (had.descriptionEn || had.description) : had.description;

  const barvaStavu = had.status === 'Volný' 
    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30';

  const kontejner = document.getElementById('detail-obsah');
  kontejner.innerHTML = `
    <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
      
      <!-- Levá část: Velká fotka + rodiče -->
      <div class="bg-zinc-100 dark:bg-zinc-950 flex flex-col justify-between p-4 sm:p-6">
        <div class="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <span id="detail-popisek-fotky" class="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold bg-zinc-950/80 text-amber-400 backdrop-blur-sm border border-zinc-800">
            ${t.photoBaby} (${had.id})
          </span>
          <img id="detail-hlavni-fotka" src="${had.image}" alt="${had.name}" class="w-full h-[380px] sm:h-[440px] object-cover transition-all duration-300">
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-zinc-500">${t.parentsTitle}</span>
            <button onclick="vymenFotkuDetailu('${had.image}', '${t.photoBaby} (${had.id})')" class="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold">
              ${t.backToBabyPhoto}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div onclick="vymenFotkuDetailu('${had.fatherImage || had.image}', '${t.fatherBadge}: ${had.fatherName || ''}')" 
                 class="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-xl p-2 flex items-center gap-3 transition">
              <img src="${had.fatherImage || had.image}" alt="Sire" class="w-14 h-14 rounded-lg object-cover flex-shrink-0 group-hover:opacity-90">
              <div class="overflow-hidden">
                <span class="text-[11px] font-bold text-blue-500 dark:text-blue-400 block">${t.fatherBadge}</span>
                <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate block">${had.fatherName || '-'}</span>
              </div>
            </div>

            <div onclick="vymenFotkuDetailu('${had.motherImage || had.image}', '${t.motherBadge}: ${had.motherName || ''}')" 
                 class="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-xl p-2 flex items-center gap-3 transition">
              <img src="${had.motherImage || had.image}" alt="Dam" class="w-14 h-14 rounded-lg object-cover flex-shrink-0 group-hover:opacity-90">
              <div class="overflow-hidden">
                <span class="text-[11px] font-bold text-pink-500 dark:text-pink-400 block">${t.motherBadge}</span>
                <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate block">${had.motherName || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pravá část: Parametry -->
      <div class="p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm font-mono text-zinc-500 dark:text-zinc-400">${t.idLabel}: ${had.id}</span>
            <span class="text-xs font-semibold px-3 py-1 rounded-full border ${barvaStavu}">${stavText}</span>
          </div>

          <h1 class="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">${had.name}</h1>
          <p class="text-amber-600 dark:text-amber-400 font-semibold mb-6">${had.hets}</p>

          <div class="grid grid-cols-2 gap-4 bg-slate-100 dark:bg-zinc-950/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 mb-6 text-sm">
            <div>
              <span class="text-zinc-500 block text-xs">${t.sexLabel}</span>
              <span class="font-semibold">${formatujPohlavi(had.sex)}</span>
            </div>
            <div>
              <span class="text-zinc-500 block text-xs">${t.currentWeightLabel}</span>
              <span class="font-semibold">${had.weight}</span>
            </div>
            <div>
              <span class="text-zinc-500 block text-xs">${t.hatchDateLabel}</span>
              <span class="font-semibold">${had.hatchDate || '-'}</span>
            </div>
            <div>
              <span class="text-zinc-500 block text-xs">${t.feedingLabel}</span>
              <span class="font-semibold">${potravaText || '-'}</span>
            </div>
          </div>

          <h3 class="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-2">${t.detailsHeading}</h3>
          <p class="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-8">${popisText || ''}</p>
        </div>

        <div class="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="text-xs text-zinc-500 block">${t.priceLabel}</span>
            <span class="text-3xl font-extrabold text-amber-600 dark:text-amber-400">${cenaText}</span>
          </div>
          <button onclick="mamZajem('${had.id}', '${had.name}')" class="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition shadow-lg shadow-amber-500/20 flex items-center gap-2">
            <i class="fa-solid fa-paper-plane"></i> ${t.interestedBtn}
          </button>
        </div>
      </div>

    </div>
  `;

  zmenZalozku('detail', false);
  if (zapsatDoHistorie) {
    history.pushState({ zalozka: 'detail', id: idHada }, "", "#detail-" + idHada);
  }
}

function vymenFotkuDetailu(novaCesta, novyPopisek) {
  document.getElementById('detail-hlavni-fotka').src = novaCesta;
  document.getElementById('detail-popisek-fotky').innerText = novyPopisek;
}

// 9. Kliknutí na "Mám zájem"
function mamZajem(idHada, jmenoHada) {
  const t = preklady[aktualniJazyk];
  const infoBox = document.getElementById('kontakt-predvyplneno');
  infoBox.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> ${t.inquiryBanner} <strong>${idHada} – ${jmenoHada}</strong>. ${t.inquirySub}`;
  infoBox.classList.remove('hidden');

  const emailBtn = document.getElementById('kontakt-email-tlacitko');
  const predmet = aktualniJazyk === 'en' ? `Inquiry about ${idHada} (${jmenoHada})` : `Zájem o mládě ${idHada} (${jmenoHada})`;
  emailBtn.href = `mailto:tvuj@email.cz?subject=${encodeURIComponent(predmet)}`;

  zmenZalozku('kontakt', true);
}

// 10. Filtrování katalogu
function filtruj(kriterium) {
  aktualniFiltr = kriterium;
  if (kriterium === 'Vše') {
    vykresliKarty(vsichniHadi);
  } else if (kriterium === 'Volný') {
    vykresliKarty(vsichniHadi.filter(h => h.status === 'Volný'));
  } else {
    vykresliKarty(vsichniHadi.filter(h => h.sex.includes(kriterium)));
  }
}

// 11. Přepínání tmavého a světlého režimu
function prepnoutRezim() {
  const isDark = document.documentElement.classList.toggle('dark');
  const ikona = document.getElementById('ikona-rezimu');
  if (isDark) {
    localStorage.setItem('theme', 'dark');
    ikona.className = "fa-solid fa-moon";
  } else {
    localStorage.setItem('theme', 'light');
    ikona.className = "fa-solid fa-sun";
  }
}