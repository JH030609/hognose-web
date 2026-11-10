async function nactiData() {
  try {
    let načteníÚspěšné = false;

    if (typeof GOOGLE_SHEET_CSV_URL !== 'undefined' && GOOGLE_SHEET_CSV_URL.startsWith('http')) {
      const urlBezCache = GOOGLE_SHEET_CSV_URL + (GOOGLE_SHEET_CSV_URL.includes('?') ? '&' : '?') + 't=' + Date.now();
      const odpoved = await fetch(urlBezCache);
      if (odpoved.ok) {
        const csvText = await odpoved.text();
        const zTabulky = zpracujCsvTabulku(csvText);
        if (zTabulky.length > 0) {
          vsichniHadi = zTabulky;
          načteníÚspěšné = true;
        }
      }
    }

    if (!načteníÚspěšné) {
      const odpovedJson = await fetch('hadi.json');
      if (odpovedJson.ok) {
        vsichniHadi = await odpovedJson.json();
      }
    }

    zpracujHashUrl();
    if (typeof aplikujVsechnyFiltry === 'function') {
      aplikujVsechnyFiltry();
    } else {
      vykresliKarty(vsichniHadi);
    }
  } catch (chyba) {
    console.error("Chyba při načítání dat:", chyba);
    zpracujHashUrl();
  }
}

function zpracujCsvTabulku(csvText) {
  const radky = parseCSV(csvText);
  if (radky.length < 2) return [];

  const hlavicka = radky[0].map(h => h.trim().toLowerCase());
  const vysledek = [];

  for (let i = 1; i < radky.length; i++) {
    const radek = radky[i];
    if (!radek[0] || radek[0].trim() === "") continue;

    let raw = {};
    hlavicka.forEach((klic, index) => {
      raw[klic] = radek[index] ? radek[index].trim() : "";
    });

    const kodVrhu = raw.clutch || (raw.id ? raw.id.charAt(0).toUpperCase() : "");
    const vrh = (typeof databazeVrhu !== 'undefined' && databazeVrhu[kodVrhu]) ? databazeVrhu[kodVrhu] : {};
    const cistaCena = parseInt((raw.price || "").replace(/\s+/g, ''), 10) || 0;
    const kodStavu = (raw.status || 'V').toUpperCase();

    vysledek.push({
      id: raw.id,
      name: raw.name,
      hets: raw.hets,
      sex: raw.sex || raw.pohlavi || "-",
      weight: (raw.weight && raw.weight.includes('g')) ? raw.weight : `${raw.weight} g`,
      hatchDate: raw.hatchdate || vrh.hatchDate || "-",
      fatherName: raw.fathername || vrh.fatherName || "-",
      fatherImage: raw.fatherimage || vrh.fatherImage || `img/${raw.id}.jpg`,
      motherName: raw.mothername || vrh.motherName || "-",
      motherImage: raw.motherimage || vrh.motherImage || `img/${raw.id}.jpg`,
      feeding: raw.feeding || "Rozmrazená myší holátka",
      feedingEn: raw.feedingen || "Frozen/thawed pinky mice",
      description: raw.description || "Zdravé, bezproblémově rozkrmené mládě z vlastního chovu.",
      descriptionEn: raw.descriptionen || "Healthy, well-started hatchling from our own breeding.",
      price: cistaCena ? `${cistaCena.toLocaleString('cs-CZ')} Kč` : (raw.price || "Na dotaz"),
      priceEn: cistaCena ? `${Math.round(cistaCena / KURZ_EUR)} €` : (raw.priceen || "Inquire"),
      status: (kodStavu === 'V' || kodStavu === 'VOLNÝ') ? 'Volný' : ((kodStavu === 'R' || kodStavu === 'REZERVACE') ? 'Rezervace' : 'Prodáno'),
      statusEn: (kodStavu === 'V' || kodStavu === 'VOLNÝ') ? 'Available' : ((kodStavu === 'R' || kodStavu === 'REZERVACE') ? 'On Hold' : 'Sold'),
      image: raw.image || `img/${raw.id}.jpg`
    });
  }
  return vysledek;
}

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