# mihmih.pro

Static personal CV and portfolio website for Mikhail Skvortsov.

The project is plain HTML, CSS, and JavaScript without a build step. It includes the main portfolio page, separate case-study pages, a lightweight access-code screen for private cases, custom cursor behavior, image loading states, lightbox previews, sticky navigation, counters, and scroll-triggered visual effects.

## Pages

```text
index.html       # Main CV and portfolio page
union.html       # Union case study
devim.html       # AsianControl / Devim case study
internship.html  # NOTA design internship case study
enter.html       # Access-code screen for private case links
```

## Core Files

```text
styles.css          # Main layout, visual system, responsive styles, animations
portfolio.js        # Main interactions: cursor, lightbox, sticky nav, reveals
project-access.css  # Access screen styles
project-access.js   # Access code logic and private-case redirects
site.webmanifest    # PWA/web app metadata
assets/             # Images, SVG icons, WebP animation, MP4 media
```

## Local Development

The site can be opened directly from `index.html`, but a local server is better for testing links, media, and browser behavior:

```bash
python -m http.server 3000
```

Then open:

```text
http://127.0.0.1:3000/
```

## Notes

- There is no package manager, bundler, or build command.
- Text files are stored as UTF-8 with BOM for predictable Cyrillic rendering in Windows PowerShell and editors.
- Private-case navigation stores the target page in `sessionStorage` before opening `enter.html`, so the target is not exposed in the URL before a valid code is entered.
- Media assets have been cleaned and losslessly optimized where possible. The Union MP4 is visually compressed for web delivery.

## Repository

```text
https://github.com/Saartr/mihmih.pro
```
