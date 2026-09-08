# 🧮 Mathe Mission 5

Eine mobile Web-App zum Mathe-Üben für die **5. Klasse (Gymnasium G9, Hessen)**.
Mischung aus ANTON, Duolingo und Klassenarbeits-Trainer: Kapitel-Lernpfad, XP, Level,
Lernserie, adaptive Schwächen-Erkennung, Probe-Klassenarbeiten und Elternbereich.

Gebaut für ein **Samsung Galaxy S7 mit Google Chrome**: reines HTML/CSS/JavaScript,
**keine Frameworks, keine externen Bibliotheken, kein Build-Prozess**, gesamte App
unter 200 KB. Läuft nach dem ersten Laden auch offline.

---

## Inhaltliche Grundlage — bitte lesen

* Bezugsbuch: **Fundamente der Mathematik 5, Hessen Gymnasium G9, Cornelsen, ISBN 978-3-06-009267-3**
* Die Kapitelstruktur folgt derzeit dem **offiziellen hessischen Lehrplan Mathematik G9,
  Jahrgangsstufe 5** (Themenfelder Zahlbereiche, Größen, Geometrie), weil das
  Inhaltsverzeichnis des Schulbuchs noch nicht vorliegt.
* **Es wurden keine Texte, Aufgaben oder Abbildungen aus dem Schulbuch übernommen.**
  Alle Erklärungen und Beispiele sind eigenständig formuliert, alle Übungsaufgaben
  werden zur Laufzeit neu erzeugt.
* Sobald das echte Inhaltsverzeichnis vorliegt, wird ausschließlich `js/data.js`
  angepasst — siehe Abschnitt „Neue Kapitel hinzufügen".

---

## 1. Installation

Es ist **keine Installation und kein Build** nötig. Die App besteht nur aus statischen
Dateien.

```
mathe-mission-5/
├── index.html
├── manifest.json          PWA-Manifest (Homescreen-Installation)
├── sw.js                  Service Worker (Offline-Betrieb)
├── css/app.css
├── icons/icon-192.png, icon-512.png
└── js/
    ├── data.js            KAPITEL & THEMEN  ← hier wird Inhalt gepflegt
    ├── gen.js             Aufgaben-Generatoren
    ├── state.js           Fortschritt, XP, Level, localStorage
    ├── ui.js              Oberfläche, Lernmodus, Auswertung
    ├── exam.js            Klassenarbeits-Modus, Lernplan, Probe-Arbeit
    ├── games.js           Rechen-Rennen, Zahlen-Jagd, Mathe-Puzzle
    └── app.js             Start
```

Voraussetzung nur für den lokalen Start: Python 3 **oder** Node.js (beides optional).

## 2. Lokaler Start

Die App muss über einen kleinen Webserver laufen (wegen Service Worker); ein
Doppelklick auf `index.html` funktioniert grundsätzlich auch, dann aber ohne Offline-Cache.

**Windows / PowerShell im Projektordner:**

```powershell
python -m http.server 8000
```

Alternativ mit Node.js:

```powershell
npx serve .
```

Dann im Browser öffnen: <http://localhost:8000>

Tipp zum Testen im Handy-Format: Chrome → F12 → Symbol „Toggle device toolbar" → Gerät
`Galaxy S5/S7` bzw. Breite 360 px.

## 3. GitHub Repository

```powershell
cd "C:\Users\mintc\OneDrive\Dokumente\Mathe Lern App"
git init
git add .
git commit -m "Mathe Mission 5 – erste Version"
git branch -M main
gh repo create mathe-mission-5 --public --source=. --remote=origin --push
```

Falls das Repository lieber privat sein soll: `--private` statt `--public`.
**Achtung:** GitHub Pages funktioniert bei privaten Repositories nur mit einem
bezahlten Plan — für diese App ist `--public` der einfachere Weg (sie enthält
keinerlei persönliche Daten).

Wenn das Repository schon existiert:

```powershell
git remote add origin https://github.com/mintchevmilen/mathe-mission-5.git
git push -u origin main
```

## 4. GitHub Pages

1. Repository auf github.com öffnen
2. **Settings → Pages**
3. *Source*: **Deploy from a branch**
4. *Branch*: `main`, Ordner `/ (root)` → **Save**
5. Nach ein bis zwei Minuten ist die App erreichbar unter:
   `https://mintchevmilen.github.io/mathe-mission-5/`

## 5. Veröffentlichung / Änderungen hochladen

```powershell
git add .
git commit -m "Kapitel 3 ergänzt"
git push
```

GitHub Pages baut automatisch neu. Damit das Handy die neue Version sicher bekommt,
in `sw.js` die Zeile `var CACHE = 'mathe-mission-5-v1';` bei jeder Veröffentlichung
hochzählen (`v2`, `v3`, …).

## 6. Nutzung auf Android

1. Chrome auf dem Galaxy S7 öffnen
2. `https://mintchevmilen.github.io/mathe-mission-5/` aufrufen
3. Die App lädt und speichert sich selbst — ab dem zweiten Aufruf funktioniert sie
   auch **ohne Internet**
4. Der Lernfortschritt liegt ausschließlich im Browser des Geräts (localStorage).
   Kein Login, kein Konto, keine Cloud, keine Werbung.

Hinweis: Wird in Chrome „Browserdaten löschen" ausgeführt, ist auch der Lernstand weg.
Im Elternbereich lässt sich der Lernstand über **„Lernstand als Datei sichern"**
als JSON-Datei exportieren.

## 7. Installation auf dem Homescreen

1. App in Chrome öffnen
2. Menü (drei Punkte) → **„Zum Startbildschirm hinzufügen"** bzw. **„App installieren"**
3. Bestätigen — die App startet danach im Vollbild ohne Browserleiste, wie eine
   normale Android-App

## 8. Neue Kapitel hinzufügen

Alle Inhalte stehen in **`js/data.js`**. Ein Thema sieht so aus:

```js
{ id:'t207', titel:'Rechengesetze',
  ziel:'Ich kann Rechengesetze zum geschickten Rechnen nutzen.',
  erklaerung:'Kurze Erklärung. **Fett** geht, \n macht einen Zeilenumbruch.',
  beispiel:{
    frage:'Rechne geschickt: 25 · 17 · 4',
    schritte:['Vertauschen: 25 · 4 · 17','25 · 4 = 100','100 · 17 = 1 700'],
    ergebnis:'1 700'
  }
}
```

So gehst du vor, um die Struktur an das echte Schulbuch anzupassen:

1. In `js/data.js` die Kapitel (`titel`, `nr`, `icon`, `farbe`) an das
   Inhaltsverzeichnis anpassen — Reihenfolge und Anzahl sind frei.
2. Themen ergänzen, umbenennen oder entfernen. **Die `id` muss eindeutig bleiben**,
   denn daran hängen Fortschritt und Generator.
3. Für jede neue `id` in `js/gen.js` einen Generator `GEN.<id> = function(l){…}`
   ergänzen (siehe nächster Abschnitt).
4. Ohne Generator zeigt die App bewusst den Hinweis
   *„Für dieses Thema benötige ich noch Informationen aus dem Schulbuch."* —
   es wird nichts erfunden.

Wichtig: Bereits gespeicherter Fortschritt bezieht sich auf die alten `id`s. Wenn du
`id`s umbenennst, im Elternbereich einmal „Fortschritt zurücksetzen" nutzen.

## 9. Neue Aufgabentypen hinzufügen

Ein Generator bekommt die Schwierigkeitsstufe `l` (1 = einfach, 2 = mittel, 3 = schwer)
und gibt ein Aufgaben-Objekt zurück. Fertige Bausteine in `js/gen.js`:

| Funktion | Aufgabentyp |
|---|---|
| `num(frage, loesung, erklaerung, extra)` | Zahl / Ergebnis eintippen |
| `mc(frage, richtig, [falsch…], erklaerung)` | Multiple Choice |
| `tf(frage, richtigJaNein, erklaerung)` | Richtig / Falsch |
| `gap(frage, loesung, erklaerung)` | Lückentext |
| `order(frage, [items in richtiger Reihenfolge], erkl.)` | Reihenfolge |
| `match(frage, [[links, rechts], …], erklaerung)` | Zuordnung |
| `steps(frage, [{frage, loesung, tipp}, …], erklaerung)` | **Rechenweg Schritt für Schritt** |
| `fehler(frage, [zeilen], indexDerFalschenZeile, erkl.)` | Fehler im Rechenweg finden |

`extra` kann enthalten: `{ einheit:'cm', grafik: svgRechteck(…), tipp:'…' }`.
Fertige Grafik-Bausteine (reines SVG, keine Bibliothek): `svgZahlenstrahl`,
`svgKoord`, `svgRechteck`, `svgLFigur`, `svgSaeulen`.

Beispiel:

```js
GEN.t999 = function(l){
  var a = R(2,9), b = R(2,9);
  if(l === 1) return num('Berechne: '+a+' · '+b, a*b, a+' · '+b+' = '+(a*b)+'.');
  return steps('Berechne: ('+a+' + '+b+') · 2',
    [{frage:'Klammer zuerst: '+a+' + '+b+' = ?', loesung:String(a+b), tipp:'Klammern haben Vorrang.'},
     {frage:'Ergebnis · 2 = ?', loesung:String((a+b)*2), tipp:'Jetzt verdoppeln.'}],
    'Klammer → Punkt → Strich.');
};
```

Für einen komplett neuen Interaktionstyp sind drei Stellen in `js/ui.js` zu ergänzen:
`eingabeHTML()` (Darstellung), `bindeEingabe()` (Tippen/Auswahl) und `pruefeJetzt()`
(Auswertung).

---

## Mathematische Darstellung

Ohne MathJax — eine sehr leichte eigene Formatierung reicht und spart Ladezeit:

* `^{2}` → hochgestellt (cm²)
* `\f{1}{2}` → echter Bruch (übereinander mit Bruchstrich)
* `**Text**` → fett, `\n` → Zeilenumbruch

## Funktionsumfang der ersten Version

Kapitel-Lernpfad · 5-Schritt-Lernmodus (Verstehen → Beispiel → Üben → Anwenden →
Challenge) · 13 Aufgabentypen · schrittweiser Rechenweg mit Fehlererklärung ·
„Ähnliche Aufgabe noch einmal" · adaptive Schwierigkeit · Schwächen-Erkennung
(🟢 sicher / 🟡 üben / 🔴 schwach) · XP, 8 Level, Lernserie, Tagesmission ·
10 Erfolge · Quiz, Challenge, Abschlusstest je Kapitel · Klassenarbeits-Modus mit
Lernplan nach echtem Termin · Probe-Klassenarbeit mit Punkten, Countdown und
Fehleranalyse · 3 Spiele · Elternbereich mit Prognose (ausdrücklich **keine**
Notenprognose) · Offline-Betrieb · Export des Lernstands.
