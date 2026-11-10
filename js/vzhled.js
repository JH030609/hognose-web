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
  nactiData();
});

window.addEventListener('popstate', () => {
  zpracujHashUrl();
});

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
    aktivniTlacitko.className = 'nav-btn px-3 py-2 rounded-lg text-sm font-semibold text-orange-600 dark:text-orange-400 bg-zinc-100 dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 shadow-sm transition';
  }

  if (zapsatDoHistorie) {
    history.pushState({ zalozka: nazevZalozky }, "", "#" + nazevZalozky);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
      : 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30';

    mrizka.innerHTML += `
      <div class="bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm dark:shadow-lg hover:border-orange-500/50 dark:hover:border-orange-500/50 transition flex flex-col">
        <img onclick="otevriDetail('${had.id}', true)" src="${had.image}" alt="${had.name}" class="w-full aspect-square object-cover cursor-pointer hover:opacity-90 transition">
        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-mono text-zinc-500 dark:text-zinc-400">${had.id} • ${had.sex}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full border ${barvaStavu}">${stavText}</span>
            </div>
            <h2 onclick="otevriDetail('${had.id}', true)" class="text-xl font-bold text-zinc-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition">${had.name}</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">${had.hets} • ${t.weightLabel}: ${had.weight}</p>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-stone-800">
            <span class="text-lg font-bold text-orange-600 dark:text-orange-500">${cenaText}</span>
            <button onclick="otevriDetail('${had.id}', true)" class="text-sm bg-zinc-200 dark:bg-stone-800 hover:bg-orange-600 hover:text-white font-semibold px-3.5 py-1.5 rounded-lg transition">
              ${t.moreDetails} <i class="fa-solid fa-chevron-right text-xs ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

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
    : 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30';

  const kontejner = document.getElementById('detail-obsah');
  kontejner.innerHTML = `
    <div class="bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
      
      <div class="bg-zinc-100 dark:bg-stone-950 flex flex-col justify-between p-4 sm:p-6">
        <div class="relative rounded-xl overflow-hidden bg-stone-900 border border-zinc-200 dark:border-stone-800">
          <span id="detail-popisek-fotky" class="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold bg-stone-950/80 text-orange-400 backdrop-blur-sm border border-stone-800">
            ${t.photoBaby} (${had.id})
          </span>
          <img id="detail-hlavni-fotka" src="${had.image}" alt="${had.name}" class="w-full aspect-square object-cover transition-all duration-300">
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-zinc-500">${t.parentsTitle}</span>
            <button onclick="vymenFotkuDetailu('${had.image}', '${t.photoBaby} (${had.id})')" class="text-xs text-orange-600 dark:text-orange-400 hover:underline font-semibold">
              ${t.backToBabyPhoto}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div onclick="vymenFotkuDetailu('${had.fatherImage || had.image}', '${t.fatherBadge}: ${had.fatherName || ''}')" 
                 class="group cursor-pointer bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl p-2 flex items-center gap-3 transition">
              <img src="${had.fatherImage || had.image}" alt="Sire" class="w-14 h-14 aspect-square rounded-lg object-cover flex-shrink-0 group-hover:opacity-90">
              <div class="overflow-hidden">
                <span class="text-[11px] font-bold text-blue-500 dark:text-blue-400 block">${t.fatherBadge}</span>
                <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate block">${had.fatherName || '-'}</span>
              </div>
            </div>

            <div onclick="vymenFotkuDetailu('${had.motherImage || had.image}', '${t.motherBadge}: ${had.motherName || ''}')" 
                 class="group cursor-pointer bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl p-2 flex items-center gap-3 transition">
              <img src="${had.motherImage || had.image}" alt="Dam" class="w-14 h-14 aspect-square rounded-lg object-cover flex-shrink-0 group-hover:opacity-90">
              <div class="overflow-hidden">
                <span class="text-[11px] font-bold text-pink-500 dark:text-pink-400 block">${t.motherBadge}</span>
                <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate block">${had.motherName || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm font-mono text-zinc-500 dark:text-zinc-400">${t.idLabel}: ${had.id}</span>
            <span class="text-xs font-semibold px-3 py-1 rounded-full border ${barvaStavu}">${stavText}</span>
          </div>

          <h1 class="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">${had.name}</h1>
          <p class="text-orange-600 dark:text-orange-400 font-semibold mb-6">${had.hets}</p>

          <div class="grid grid-cols-2 gap-4 bg-slate-100 dark:bg-stone-950/60 p-4 rounded-xl border border-zinc-200 dark:border-stone-800/80 mb-6 text-sm">
            <div>
              <span class="text-zinc-500 block text-xs">${t.sexLabel}</span>
              <span class="font-semibold">${had.sex}</span>
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

        <div class="pt-6 border-t border-zinc-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="text-xs text-zinc-500 block">${t.priceLabel}</span>
            <span class="text-3xl font-extrabold text-orange-600 dark:text-orange-500">${cenaText}</span>
          </div>
          <button onclick="mamZajem('${had.id}', '${had.name}')" class="px-6 py-3.5 rounded-xl bg-orange-700 hover:bg-orange-600 text-white font-bold transition shadow-lg shadow-orange-700/20 flex items-center gap-2">
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

// --- POMOCNÉ FUNKCE PRO FILTROVÁNÍ POHLAVÍ ---
function jeSamec(pohlaviText) {
  const s = (pohlaviText || '').toString().toLowerCase().trim();
  return s.includes('1.0') || s.includes('1,0') || s.includes('samec') || s === 'm' || s === 'male' || s.includes('♂');
}

function jeSamice(pohlaviText) {
  const s = (pohlaviText || '').toString().toLowerCase().trim();
  return s.includes('0.1') || s.includes('0,1') || s.includes('samice') || s === 'f' || s === 'female' || s.includes('♀');
}

let aktualniGenFiltr = 'Vše';
let aktualniHledani = '';

function filtruj(kriterium) {
  aktualniFiltr = kriterium;

  document.querySelectorAll('.filtr-zakladni').forEach(btn => {
    btn.className = 'filtr-zakladni px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-200 dark:bg-stone-800 hover:bg-orange-600 hover:text-white transition';
  });
  const aktivniBtn = document.getElementById('filtr-btn-' + kriterium);
  if (aktivniBtn) {
    aktivniBtn.className = 'filtr-zakladni px-4 py-2 rounded-xl text-sm font-semibold bg-orange-600 text-white transition';
  }

  aplikujVsechnyFiltry();
}

function filtrujGen(gen) {
  aktualniGenFiltr = (aktualniGenFiltr === gen && gen !== 'Vše') ? 'Vše' : gen;

  document.querySelectorAll('.filtr-gen').forEach(btn => {
    btn.className = 'filtr-gen px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-stone-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-stone-800 hover:border-orange-500/50 transition';
  });
  const aktivniGenBtn = document.getElementById('gen-btn-' + aktualniGenFiltr);
  if (aktivniGenBtn) {
    aktivniGenBtn.className = 'filtr-gen px-3 py-1 rounded-lg text-xs font-semibold bg-orange-500/20 text-orange-500 border border-orange-500/40 transition';
  }

  aplikujVsechnyFiltry();
}

function hledatMutaci(text) {
  aktualniHledani = text.toLowerCase().trim();
  aplikujVsechnyFiltry();
}

function aplikujVsechnyFiltry() {
  const vysledek = vsichniHadi.filter(had => {
    if (aktualniFiltr === 'Volný' && (had.status || '').trim().toLowerCase() !== 'volný') return false;
    if (aktualniFiltr === '1.0' && !jeSamec(had.sex)) return false;
    if (aktualniFiltr === '0.1' && !jeSamice(had.sex)) return false;

    const genetikaText = `${had.id || ''} ${had.name || ''} ${had.hets || ''} ${had.description || ''}`.toLowerCase();

    if (aktualniGenFiltr !== 'Vše' && !genetikaText.includes(aktualniGenFiltr.toLowerCase())) {
      return false;
    }

    if (aktualniHledani !== '' && !genetikaText.includes(aktualniHledani)) {
      return false;
    }

    return true;
  });

  const mrizka = document.getElementById('katalog-mrizka');
  if (vysledek.length === 0 && mrizka) {
    mrizka.innerHTML = `
      <div class="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400 bg-zinc-100/50 dark:bg-stone-900/40 rounded-2xl border border-zinc-200 dark:border-stone-800">
        <i class="fa-solid fa-magnifying-glass text-2xl mb-2 text-orange-500 block"></i>
        Žádné mládě neodpovídá zvolené kombinaci filtrů.
      </div>
    `;
  } else {
    vykresliKarty(vysledek);
  }
}

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
function prepniPodsekciChovu(podsekce) {
  const obsahProjekty = document.getElementById('chov-obsah-projekty');
  const obsahPodminky = document.getElementById('chov-obsah-podminky');
  const btnProjekty = document.getElementById('btn-chov-projekty');
  const btnPodminky = document.getElementById('btn-chov-podminky');

  if (!obsahProjekty || !obsahPodminky) return;

  const aktivniStyl = 'px-5 py-3 rounded-xl text-sm font-bold bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10 transition flex items-center gap-2';
  const neaktivniStyl = 'px-5 py-3 rounded-xl text-sm font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500 hover:text-zinc-950 transition flex items-center gap-2';

  if (podsekce === 'podminky') {
    obsahProjekty.classList.add('hidden');
    obsahPodminky.classList.remove('hidden');
    btnPodminky.className = aktivniStyl;
    btnProjekty.className = neaktivniStyl;
  } else {
    obsahPodminky.classList.add('hidden');
    obsahProjekty.classList.remove('hidden');
    btnProjekty.className = aktivniStyl;
    btnPodminky.className = neaktivniStyl;
  }
}