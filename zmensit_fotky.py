import os
import subprocess

SLOZKA_IMG = "img"
MAX_SIRKA = 1400
KVALITA = 80
LIMIT_VELIKOSTI_KB = 400

def optimalizuj_fotky():
    if not os.path.exists(SLOZKA_IMG):
        print(f"Složka '{SLOZKA_IMG}' nebyla nalezena.")
        return

    pocet = 0
    for nazev in os.listdir(SLOZKA_IMG):
        cesta_puvodni = os.path.join(SLOZKA_IMG, nazev)
        if not os.path.isfile(cesta_puvodni):
            continue

        zaklad, pripona = os.path.splitext(nazev)
        if pripona.lower() not in ['.jpg', '.jpeg', '.png', '.webp', '.heic']:
            continue

        velikost_kb = os.path.getsize(cesta_puvodni) / 1024
        cesta_nova = os.path.join(SLOZKA_IMG, f"{zaklad}.jpg")

        if pripona == '.jpg' and velikost_kb <= LIMIT_VELIKOSTI_KB:
            continue

        # Vestavěný nástroj macOS (sips) zmenší rozlišení, převede na .jpg a zkomprimuje
        prikaz = [
            "sips",
            "-Z", str(MAX_SIRKA),
            "-s", "format", "jpeg",
            "-s", "formatOptions", str(KVALITA),
            cesta_puvodni,
            "--out", cesta_nova
        ]
        subprocess.run(prikaz, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        if cesta_puvodni != cesta_nova and os.path.exists(cesta_puvodni):
            os.remove(cesta_puvodni)

        nova_kb = os.path.getsize(cesta_nova) / 1024
        print(f"✔ {nazev} -> {zaklad}.jpg ({velikost_kb:.0f} kB -> {nova_kb:.0f} kB)")
        pocet += 1

    if pocet == 0:
        print("Všechny fotky už jsou zmenšené!")
    else:
        print(f"\nHotovo! Zoptimalizováno fotek: {pocet}")

if __name__ == "__main__":
    optimalizuj_fotky()