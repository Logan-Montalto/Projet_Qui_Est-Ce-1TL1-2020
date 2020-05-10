Projet_Qui_Est-Ce-1TL1-2020
======


Louis Bauchau, Merwane Ben-tahri, Miguel Antoons, Logan Montalto

# Présentation du projet

Nous avons comme idée de concept de concevoir un jeu se rapprochant fortement de “Qui est ce ?”. Celui-ci sera composé de plusieurs niveaux et d’indices pour faciliter la découverte de la solution (indice 1 et indice 2). Cependant, si un indice est utilisé, alors le joueur perdra un certain nombre de points. Pour deviner qui est-ce, des photos de plusieurs personnages connus issus du monde réel et fictif seront présentées au joueur. De plus, la présentation du jeu sera sous forme de tableaux de jeux (photos de personnages).

# Aspects implémentés 


# Les aspects Backend


- Une base de données permettant de mémoriser les personnages liés avec une photo , un énoncé et 2 indices.
- Un serveur web capable de fournir les pages html, js, css, ainsi que de proposer des webservices.
- Des Webservices avec les procédures associées : 
- Un webservice capable d'initialiser / réinitialiser le jeu
- Un webservice pour récupérer les informations du jeu
- Un webservice qui permet de sélectionner un personnage ainsi que son énoncé 
- Un webservice pour les indices
- Un webservice pour les points  
...


# Les aspects Frontend


Une page web (html, js, css) permettant d'appeler les webservices et de traiter les réponses, qui propose une interface utilisateur pour :
- Rafraîchir le jeu
- Afficher le jeu
- Comptage de points
- Affichage des indices
- Affichage du résultat
- Permettre un structure CSS
- Calculer le temps passé par niveau 
...


# Détail Api Rest 

Webservice pour ajouter les scores

Auteur : commun
Paramètres : user (utilisateur à qui on va ajouter le score) et score (qui est le score que l'on va ajouter)
Format de réponse : Procédure pour ajouter des données dans la bases de données
Endpoint : http://localhost:80/serv_ajoutScores 


Webservice pour obtenir les CSS

Auteur : commun
Paramètre : name (nom du fichier CSS)
Format de réponse : RAW
Endpoint : http://localhost:80/serv_getCSS


Webservice pour obtenir l'HTML

Auteur : commun
Paramètre : name (nom du fichier HTML)
Format de réponse : RAW
Endpoint : http://localhost:80/serv_getHTML


Webservice pour obtenir des images JPEG

Auteur : commun
Paramètre : name (nom de l'image)
Format de réponse : RAW
Endpoint : http://localhost:80/serv_getImage

Webservice pour obtenir un indice

Auteur : Logan Montalto
Paramètres : persoChoisi (l'ID du personnage dont on a besoin un indice) numeroIndice (le numéro de l'indice, 1er ou 2ème)
Format de réponse : JSON
Endpoint : http://localhost:80/serv_getIndices


Webservice pour obtenir le Javascript

Auteur : commun
Paramètres : name (le nom du fichier Javascript)
Format de réponse : RAW
Endpoint : http://localhost:80/serv_getJS


Webservice pour obtenir les personnages choisi par le joueur

Auteur : Miguel Antoons
Paramètre : genre (personnages fictifs, personnages réels, ou tous)
Format de réponse : JSON
Endpoint : http://localhost:80/serv_getPersonnages


Webservice pour obtenir une image PNG

Auteur : commun
Paramètre : name (le nom de l'image PNG)
Format de réponse : RAW
Endpoint : http://localhost:80/serv_getPNG


Webservice pour obtenir les scores maximales de tous les utilisateurs

Auteur : Merwane Ben-Tahri
Paramètre : aucun
Format de réponse : JSON
Endpoint : http://localhost:80/serv_getScores


Webservice pour inscrire un utilisateur dans la base de données

Auteur : Louis Bauchau
Paramètres : user (le pseudo de l'utilisateur), mdp (le mot de passe de l'utilisateur), nom (le nom de l'utilisateur) et prenom (le prénom de l'utilisateur)
Format de réponse : RAW (fontion qui insert des données dans la base de données)
Endpoint : http://localhost:80/serv_insertUser


Webservice pour la connexion d'un utilisateur

Auteur : commun
Paramètre : aucun
Format de réponse : JSON
Endpoint : http://localhost:80/serv_userConnection
