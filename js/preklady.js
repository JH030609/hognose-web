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

function prepnoutJazyk() {
  aktualniJazyk = aktualniJazyk === 'cs' ? 'en' : 'cs';
  localStorage.setItem('lang', aktualniJazyk);
  aplikujJazyk();
}

function aplikujJazyk() {
  const t = preklady[aktualniJazyk];
  document.documentElement.lang = aktualniJazyk;
  
  const btnJazyk = document.getElementById('tlacitko-jazyk');
  if (btnJazyk) btnJazyk.innerText = aktualniJazyk === 'cs' ? 'EN' : 'CZ';

  document.querySelectorAll('[data-i18n]').forEach(prvek => {
    const klic = prvek.getAttribute('data-i18n');
    if (t[klic]) prvek.innerText = t[klic];
  });

  if (vsichniHadi.length > 0) {
    filtruj(aktualniFiltr);
    if (otevreneIdHada && !document.getElementById('sekce-detail').classList.contains('hidden')) {
      otevriDetail(otevreneIdHada, false);
    }
  }
}

function formatujPohlavi(sexKod) {
  const t = preklady[aktualniJazyk];
  return (sexKod && sexKod.includes('1.0')) ? t.maleLabel : t.femaleLabel;
}