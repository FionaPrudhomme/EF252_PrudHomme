# Déplacement ITRF – le Client MapQuest  

## Contexte

Ce projet s'inscrit dans le cadre d'un cours à l'ENSG (Ecole Nationale des Sciences Géographiques). C'est un mini-projet de web mapping et données distantes.

L'objectif principal de ce projet est de représenter sur une carte les déplacements horizontaux et verticaux des stations ITRF (International Terrestrial Reference Frame).

## Objectifs

La carte devra représenter : 

- Les stations sous forme de cercle de taille réduite
- Les déplacements horizontaux sous forme de segments issus du centre du cercle
- Les déplacements verticaux, d'une couleurs plus ou moins intense selon la valeur absolue du déplacement (rouge pour les points descendants et bleu pour les points ascendants).

Les données seront disponibles sous la forme d’un web service qui renvoie les n déplacements les plus importants dans une boite englobante, selon le modèle des tremblements de terre vu lors de ce cours. Les données représentées sur ce projet seront des données fictives comme le service web fournissant les déplacements réelles n'est pas disponible (projet d'un autre étudiant).

## Visualiser la carte

   Afin de visualiser la carte, l'installation d'un serveur local est nécessaire (Wamp, Xampp, ...). Voici les étapes nécessaires pour visualiser la carte : 

1. Cloner le projet git sur votre ordinateur
2. Lancer votre serveur local sur le port de votre choix
3. Copier le projet dans le dossier de votre serveur local (souvent le dossier www)
4. Sur le navigateur de votre choix lancer votre serveur localhost (ex: localhost/EF252_PrudHomme)

## documents disponibles

- earthicon.png
- geo.js
- Index.html
- style.css
- donneesTest.json
- ReadMe.md
- carnetDeBord.pdf
- un dossier LeafletPolylineDecorator-master
- un dossier leaflet-sidebar-V2
- Documentation.pdf
  