let vsichniHadi = [];

// 1. Načtení dat ze souboru hadi.json
fetch('hadi.json')
  .then(odpoved => odpoved.json())
  .then(data => {
    vsichniHadi = data;
    vykresliKarty(vsichniHadi);
  });

// 2. Přepínání záložek v horním menu (SPA logika)
function prepniZalozku(nazevZalozky) {
  // Skryje úplně všechny sekce
  document.querySelectorAll('.zalozka').forEach(sekce => {
    sekce.classList.add('hidden');
  });

  // Zobrazí jen vybranou sekci
  document.getElementById('sekce-' + nazevZalozky).classList.remove('hidden');

  // Aktualizuje barvu aktivního tlačítka v horním panelu
  document.querySelectorAll('.nav-btn').forEach(tlacitko => {
    tlacitko.className = 'nav-btn px-3 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white transition';
  });
  const aktivniTlacitko = document.getElementById('nav-' + nazevZalozky);
  aktivniTlacitko.className = 'nav-btn px-3 py-2 rounded-lg text-sm font-semibold text-amber-500 bg-zinc-900 transition';

  // Automaticky vyroluje na začátek stránky při přepnutí záložky
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Vykreslení karet hadů
function vykresliKarty(poleHadu) {
  const mrizka = document.getElementById('katalog-mrizka');
  mrizka.innerHTML = '';

  poleHadu.forEach(had => {
    const barvaStavu = had.status === 'Volný' 
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
      : 'bg-amber-500/20 text-amber-400 border-amber-500/30';

    mrizka.innerHTML += `
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg hover:border-zinc-700 transition">
        <img src="${had.image}" alt="${had.name}" class="w-full h-56 object-cover">
        <div class="p-5">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-mono text-zinc-400">${had.id} • Pohlaví: ${had.sex}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full border ${barvaStavu}">${had.status}</span>
          </div>
          <h2 class="text-xl font-bold text-white">${had.name}</h2>
          <p class="text-sm text-zinc-400 mb-4">${had.hets} • Váha: ${had.weight}</p>
          <div class="flex justify-between items-center pt-4 border-t border-zinc-800">
            <span class="text-lg font-bold text-amber-400">${had.price}</span>
            <button onclick="prepniZalozku('kontakt')" class="text-sm bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 font-medium px-3 py-1.5 rounded-lg transition">
              Mám zájem
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// 4. Filtrování katalogu
function filtruj(kriterium) {
  if (kriterium === 'Vše') {
    vykresliKarty(vsichniHadi);
  } else if (kriterium === 'Volný') {
    vykresliKarty(vsichniHadi.filter(h => h.status === 'Volný'));
  } else {
    vykresliKarty(vsichniHadi.filter(h => h.sex === kriterium));
  }
}