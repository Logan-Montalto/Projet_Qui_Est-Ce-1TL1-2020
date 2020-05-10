Projet_Qui_Est-Ce-1TL1-2020
======

# Présentation de l'équipe

Louis Bauchau, Merwane Ben-tahri, Miguel Antoons, Logan Montalto

# Présentation du projet

Nous avons comme idée de concept de concevoir un jeu se rapprochant fortement de “Qui est ce ?”. Celui-ci sera composé de plusieurs niveaux et d’indices pour faciliter la découverte de la solution (indice 1 et indice 2). Cependant, si un indice est utilisé, alors le joueur perdra un certain nombre de points. Pour deviner qui est-ce, des photos de plusieurs personnages connus issus du monde réel et fictif seront présentées au joueur. De plus, la présentation du jeu sera sous forme de tableaux de jeux (photos de personnages).

# Aspects implémentés 


# Les aspects Backend


- Une base de données permettant de mémoriser les personnages du jeu liés avec une photo , un énoncé, 2 indices et aussi d'encoder et de connecter des utilisateurs au jeu.
- Un serveur web capable de fournir les pages html, js, css, ainsi que de proposer des webservices.
- Des Webservices avec les procédures associées : 
- Un webservice capable d'initialiser / réinitialiser le jeu
- Un webservice pour récupérer les informations du jeu
- Un webservice qui permet de sélectionner un personnage ainsi que son énoncé 
- Un webservice pour les indices
- Un webservice pour les points  



# Les aspects Frontend


Une page web (html, js, css) permettant d'appeler les webservices et de traiter les réponses, qui propose une interface utilisateur pour :

- Rafraîchir le jeu
- Afficher le jeu
- Comptage de points
- Affichage des indices
- Affichage des énoncés
- Affichage du résultat
- Affichage des personnages
- Permettre un structure CSS



# Détail Api Rest 

## Webservice pour ajouter les scores

__Auteur__ : commun  
__Paramètres__ : user (utilisateur à qui on va ajouter le score) et score (qui est le score que l'on va ajouter)  
__Format de réponse__ : Procédure pour ajouter des données dans la bases de données  
__Endpoint__ : http://localhost:80/serv_ajoutScores  


## Webservice pour obtenir les CSS

__Auteur__ : commun  
__Paramètre__ : name (nom du fichier CSS)  
__Format de réponse__ : RAW  
__Endpoint__ : http://localhost:80/serv_getCSS  


## Webservice pour obtenir l'HTML

__Auteur__ : commun  
__Paramètre__ : name (nom du fichier HTML)  
__Format de réponse__ : RAW  
__Endpoint__ : http://localhost:80/serv_getHTML  


## Webservice pour obtenir des images JPEG

__Auteur__ : commun  
__Paramètre__ : name (nom de l'image)  
__Format de réponse__ : RAW  
__Endpoint__ : http://localhost:80/serv_getImage  

## Webservice pour obtenir un indice

__Auteur__ : Logan Montalto  
__Paramètres__ : persoChoisi (l'ID du personnage dont on a besoin un indice) numeroIndice (le numéro de l'indice, 1er ou 2ème)  
__Format de réponse__ : JSON  
__Endpoint__ : http://localhost:80/serv_getIndices  


## Webservice pour obtenir le Javascript

__Auteur__ : commun  
__Paramètre__ : name (le nom du fichier Javascript)  
__Format de réponse__ : RAW  
__Endpoint__ : http://localhost:80/serv_getJS  


## Webservice pour obtenir les personnages choisi par le joueur

__Auteur__ : Miguel Antoons  
__Paramètre__ : genre (personnages fictifs, personnages réels, ou tous)  
__Format de réponse__ : JSON  
__Endpoint__ : http://localhost:80/serv_getPersonnages  


## Webservice pour obtenir une image PNG

__Auteur__ : commun  
__Paramètre__ : name (le nom de l'image PNG)  
__Format de réponse__ : RAW  
__Endpoint__ : http://localhost:80/serv_getPNG  


## Webservice pour obtenir les scores maximales de tous les utilisateurs

__Auteur__ : Merwane Ben-Tahri  
__Paramètre__ : aucun  
__Format de réponse__ : JSON  
__Endpoint__ : http://localhost:80/serv_getScores  


## Webservice pour inscrire un utilisateur dans la base de données

__Auteur__ : Louis Bauchau  
__Paramètres__ : user (le pseudo de l'utilisateur), mdp (le mot de passe de l'utilisateur), nom (le nom de l'utilisateur) et prenom (le prénom de l'utilisateur)  
__Format de réponse__ : RAW (fontion qui insert des données dans la base de données)  
__Endpoint__ : http://localhost:80/serv_insertUser  


## Webservice pour la connexion d'un utilisateur

__Auteur__ : commun  
__Paramètre__ : aucun  
__Format de réponse__ : JSON  
__Endpoint__ : http://localhost:80/serv_userConnection  


# Diagramme représentant les détails de la DataBase

.. image ::
