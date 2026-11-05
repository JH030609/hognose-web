let vsichniHadi = [];

// 1. Asynchronní načtení dat ze souboru hadi.json při startu stránky
fetch('hadi.json')
  .then(odpoved => odpoved.json())
  .then(data => {
    vsichniHadi = data;
    vykresliKarty(vsichniHadi);
  });

// 2. Funkce, která vezme pole hadů a vygeneruje pro každého HTML kartu
function vykresliKarty(poleHadu) {
  const mrizka = document.getElementById('katalog-mrizka');
  mrizka.innerHTML = ''; // Vyčištění mřížky před překreslením

  poleHadu.forEach(had => {
    // Barva štítku podle dostupnosti
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
            <a href="mailto:tvuj@email.cz?subject=Zájem o hada ${had.id}" class="text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition">
              Mám zájem
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

// 3. Funkce pro filtrování po kliknutí na tlačítko
function filtruj(kriterium) {
  if (kriterium === 'Vše') {
    vykresliKarty(vsichniHadi);
  } else if (kriterium === 'Volný') {
    vykresliKarty(vsichniHadi.filter(h => h.status === 'Volný'));
  } else {
    vykresliKarty(vsichniHadi.filter(h => h.sex === kriterium));
  }
}