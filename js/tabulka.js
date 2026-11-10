function nactiData() {
}

function zpracujCsvTabulku(csvText) {
  const radky = parseCSV(csvText);
  if (radky.length < 2) return [];

  const hlavicka = radky[0].map(h => h.trim());
  const vysledek = [];

  for (let i = 1; i < radky.length; i++) {
    const radek = radky[i];
    if (!radek[0] || radek[0].trim() === "") continue;

    let raw = {};
    hlavicka.forEach((klic, index) => {
      raw[klic] = radek[index] ? radek[index].trim() : "";
    });

    const vrh = databazeVrhu[raw.clutch] || {};
    const cistaCena = parseInt((raw.price || "").replace(/\s+/g, ''), 10) || 0;
    const kodStavu = (raw.status || 'V').toUpperCase();

    vysledek.push({
      id: raw.id,
      name: raw.name,
      hets: raw.hets,
      sex: raw.sex,
      weight: (raw.weight && raw.weight.includes('g')) ? raw.weight : `${raw.weight} g`,
      hatchDate: vrh.hatchDate || "-",
      fatherName: vrh.fatherName || "-",
      fatherImage: vrh.fatherImage || `img/${raw.id}.jpg`,
      motherName: vrh.motherName || "-",
      motherImage: vrh.motherImage || `img/${raw.id}.jpg`,
      feeding: "Rozmrazená myší holátka",
      feedingEn: "Frozen/thawed pinky mice",
      description: raw.description || "Zdravé, bezproblémově rozkrmené mládě z vlastního chovu.",
      descriptionEn: raw.descriptionEn || "Healthy, well-started hatchling from our own breeding.",
      price: cistaCena ? `${cistaCena.toLocaleString('cs-CZ')} Kč` : "Na dotaz",
      priceEn: cistaCena ? `${Math.round(cistaCena / KURZ_EUR)} €` : "Inquire",
      status: kodStavu === 'V' ? 'Volný' : (kodStavu === 'R' ? 'Rezervace' : 'Prodáno'),
      statusEn: kodStavu === 'V' ? 'Available' : (kodStavu === 'R' ? 'On Hold' : 'Sold'),
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