# SDSU-Class-Cart-Visualizer

# Aztec Schedule Sync

Aztec Schedule Sync is a Chrome extension that helps SDSU students view class information and quickly open the correct Rate My Professors page for their instructor.

# Group Members
Finja Bruenen
Poulina Reipolska
Matthew Verhagen
Tarran Thomas

## Features

- Reads classes and professor names from the SDSU shopping cart
- Searches Rate My Professors automatically
- Opens the direct professor profile when a match is found

## Main Files

- `content.js` — scrapes class and professor information from SDSU
- `background.js` — searches and matches professors on Rate My Professors
- `popup.js` — displays class information and RMP links
- `popup.html` — popup layout
- `style.css` — popup styling
- `manifest.json` — Chrome extension configuration and permissions

## How It Works

The extension gets the professor name from the SDSU page, searches Rate My Professors for that professor at SDSU, and links directly to the matching profile when possible. If no safe match is found, it provides the Rate My Professors search page instead.

## How to Install

1. Download or clone the repository.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select the project folder.
6. Open the SDSU shopping cart and click the extension.

## Bugs/Improvements

- Sometimes when only the first initial of the professor is provided on the sdsu page, the search will fail in Rate My Professor.
- The extension only works for shopping cart not class search.
