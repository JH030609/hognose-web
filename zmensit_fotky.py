import os
from PIL import Image

SLOZKA_IMG = "img"
MAX_SIRKA = 1400
KVALITA = 85
LIMIT_VELIKOSTI_KB = 400  # Fotky menší než 400 kB (které už jsou v .jpg) skript přeskočí

def optimalizuj_fotky():
    if not os.path.exists(SLOZKA_IMG):
        print(f"Složka '{SLOZKA_IMG}' nebyla nalezena.")
        return

    pocet_upravenych = 0

    for nazev_souboru in os.listdir(SLOZKA_IMG):
        cesta_puvodni = os.path.join(SLOZKA_IMG, nazev_souboru)
        
        if not os.path.isfile(cesta_puvodni):
            continue

        zaklad_jmena, pripona = os.path.splitext(nazev_souboru)
        if pripona.lower() not in ['.jpg', '.jpeg', '.png', '.webp']:
            continue

        velikost_kb = os.path.getsize(cesta_puvodni) / 1024
        cesta_nova = os.path.join(SLOZKA_IMG, f"{zaklad_jmena}.jpg")

        # Přeskočíme fotky, které už mají malou příponu .jpg a jsou pod limitem
        if pripona == '.jpg' and velikost_kb <= LIMIT_VELIKOSTI_KB:
            continue

        try:
            with Image.open(cesta_puvodni) as img:
                # Převod na RGB (nutné pro PNG s průhledností nebo specifické barevné profily)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                # Zmenšení rozlišení při zachování poměru stran
                if img.width > MAX_SIRKA or img.height > MAX_SIRKA:
                    img.thumbnail((MAX_SIRKA, MAX_SIRKA), Image.Resampling.LANCZOS)

                # Uložení zkomprimované fotky jako .jpg
                img.save(cesta_nova, "JPEG", quality=KVALITA, optimize=True)

            # Pokud se původní soubor jmenoval jinak (např. .PNG nebo .JPG), smažeme ho
            if cesta_puvodni != cesta_nova and os.path.exists(cesta_puvodni):
                os.remove(cesta_puvodni)

            nova_velikost_kb = os.path.getsize(cesta_nova) / 1024
            print(f"✔ {nazev_souboru} -> {zaklad_jmena}.jpg ({velikost_kb:.0f} kB -> {nova_velikost_kb:.0f} kB)")
            pocet_upravenych += 1

        except Exception as e:
            print(f"❌ Chyba u souboru {nazev_souboru}: {e}")

    if pocet_upravenych == 0:
        print("Všechny fotky už jsou zmenšené a připravené!")
    else:
        print(f"\nHotovo! Zoptimalizováno fotek: {pocet_upravenych}")

if __name__ == "__main__":
    optimalizuj_fotky()