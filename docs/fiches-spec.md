# Spécification des fiches FilRouge

FilRouge est une encyclopédie manga et anime en français. Pour chaque œuvre qui t'est attribuée, écris UN fichier JSON :
`/tmp/claude-0/-home-claude-filrouge/41597333-0102-591f-b511-9c59b74fa8e4/scratchpad/fiches2/<id>.json`
Le fichier contient un seul objet JSON valide en UTF-8, sans commentaire.

## Méthode
- Vérifie chaque information avec WebSearch puis WebFetch sur des pages réelles : Wikipédia FR/EN/JA, MyAnimeList, AniList, Nautiljon, AlloCiné, site officiel. Lance plusieurs recherches dans le même tour.
- N'invente rien. Mets null ou "" quand tu n'es pas sûr.
- Nous sommes le 8 octobre 2026. Les saisons diffusées jusqu'à cette date comptent. Celles qui sont seulement annoncées vont dans "ss" sans "eps", avec la mention « Annoncée ».

## Règle d'or : une fiche par œuvre distincte
- Les saisons d'une même série vont DANS une seule fiche, détaillées dans "ss". Cela vaut même si une saison a un sous-titre : « 2nd season », « Aragoto », « & BEYOND », « New », « BorN », « Imashime no Fukkatsu »…
- Une nouvelle série au titre vraiment distinct est une fiche à part, à citer dans "relx". Exemples : Durarara!!×2 face à Durarara!! ; Dragon Ball Super face à Dragon Ball Z.
- Un film est toujours une fiche à part.
- Un épisode spécial unique de type « TV special » ou OVA est une fiche à part, avec fmt "OAV".

## Champs (fiche de série animée ou de film)
```json
{
 "id": "r16-1",
 "req": 16,
 "reqq": "<requête exacte fournie>",
 "ai": true,
 "t": "anime",
 "ti": "titre français usuel (titre d'exploitation en France s'il existe, sinon titre international usuel)",
 "ro": "titre romaji",
 "jp": "titre japonais",
 "y": 2021, "e": 2022,
 "st": "terminé" | "en cours" | "en pause" | "annulé",
 "d": "Shōnen" | "Seinen" | "Shōjo" | "Josei" | "Kodomo" | "",
 "g": ["2 à 5 genres en français"],
 "staff": [["Réalisation","Nom"],["Scénario","Nom"],["Character design","Nom"],["Musique","Nom"],["Œuvre originale","Nom (light novel / manga…)"]],
 "studio": "Studio (ou « A puis B » si le studio change)",
 "fmt": "Série TV" | "ONA" | "OAV" | "Film",
 "eps": 23,
 "dur": "24 min",
 "ss": [{"n":"Saison 1","y":2021,"e":null,"eps":11,"studio":"…","note":"une phrase : partie de l'histoire couverte, ou titre de la saison"}],
 "syn": "synopsis en français de 3 phrases, sans révéler la fin, entièrement avec tes propres mots",
 "crit": "2 phrases neutres sur l'accueil critique et public, sans citation ni note chiffrée",
 "prix": ["prix réellement obtenus, s'il y en a"],
 "ps": [["Nom du personnage","P","description en une phrase sans spoiler"]],
 "rel": [{"id":"<id d'une autre fiche FilRouge>","r":"Suite"}],
 "relx": [{"ti":"titre","t":"manga"|"serie"|"film","r":"Manga d'origine"|"Suite"|"Préquelle"|"Film"|"Spin-off"|"Adaptation"…,"y":2017}],
 "src": [{"url":"…","title":"…"}],
 "pal": ["#rrggbb","#rrggbb","#rrggbb"],
 "pat": "speed"
}
```

Précisions sur les champs :
- "d" : la démographie de l'œuvre d'origine. Mets "" pour un light novel ou une création originale.
- "eps" : le total d'épisodes diffusés à ce jour. Pour un film, mets 1.
- "dur" : la durée d'un épisode, ou celle du film (« 105 min »).
- "ss" : une entrée par saison ou partie, y compris les saisons annoncées sans "eps". Omets ce champ pour un film.
- "ps" : 4 à 8 personnages. Rôles : "P" protagoniste, "M" principal, "S" secondaire, "A" antagoniste.
- "rel" : uniquement les ids FilRouge qu'on te donne.
- "relx" : 0 à 6 œuvres liées importantes absentes de FilRouge, comme le manga d'origine, une suite au titre distinct ou des films. Les light novels ne vont pas ici : cite le romancier dans "staff".
- "src" : 3 à 6 pages consultées.
- "pal" : 3 couleurs évoquant l'œuvre, sombres ou contrastées.
- "pat" : un motif parmi speed, rings, split, grid, hatch, dots ou sun.

## Droits d'auteur (obligatoire)
- Ne recopie jamais un synopsis officiel ni un texte de Wikipédia : reformule entièrement.
- Aucune citation d'article.
- N'invente aucun avis.

## Fin de mission
Valide chaque fichier, par exemple avec `python3 -c "import json,sys;json.load(open(sys.argv[1]))" fichier`. Termine par une ligne par fiche : id, titre, saisons et épisodes.

## Fiches MANGA (y compris manhwa / webtoon coréens et manhua chinois)
Mêmes champs communs (id, req, reqq, ai, t, ti, ro, jp, y, e, st, d, g, staff, syn, crit, prix, ps, rel, relx, src, pal, pat), avec t = "manga", SANS studio/fmt/eps/dur, et AVEC :
- "staff" : [["Auteur","Nom"]] ou [["Scénario","Nom"],["Dessin","Nom"]], plus ["Œuvre originale","Nom"] si c'est l'adaptation d'un roman / light novel.
- "mag" : magazine de prépublication (ou plateforme : Naver Webtoon, KakaoPage…), "ed" : éditeur d'origine (japonais, coréen…), "fr" : éditeur français (vérifie-le, sinon ""), "v" : nombre de tomes parus (au Japon / en Corée), "ch" : nombre de chapitres si terminé, sinon null.
- "jp" : titre original (japonais, coréen ou chinois). "d" : démographie pour un manga japonais ; "" pour un manhwa/webtoon.
- Pour un manhwa ou webtoon, ajoute "Manhwa" (ou "Webtoon") dans "g".
- "ss" : seulement si l'œuvre est publiée en parties/saisons nettes (ex. webtoon en saisons, Partie 1/2).
- "st" : statut de PUBLICATION de l'œuvre (en cours / terminé / en pause / annulé).

## Type demandé inexistant
Si la demande est de type "serie" mais qu'il n'existe AUCUNE série animée (ex. l'œuvre n'existe qu'en manga/webtoon, ou seulement en drama live), crée quand même la fiche de l'œuvre d'origine (t "manga") et ajoute en tête de "crit" la phrase : « Pas d'adaptation en série animée à ce jour. » (ou « Adaptée en série live-action, pas en anime. »). Si une adaptation animée est annoncée mais pas diffusée, crée la fiche anime avec "st":"en cours", "eps":null et une saison « Annoncée ».
Si l'œuvre est introuvable, écris <id>.json contenant {"notfound":true,"req":N,"reqq":"…","why":"…"}.
