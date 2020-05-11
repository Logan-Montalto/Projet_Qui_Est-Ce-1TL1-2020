"use strict";

/**
 * @author Antoons Miguel
 * @author Bauchau Louis
 * @author Ben-Tahri Merwane
 * @author Montalto Logan
 *
 * @date 04-MAY-2020
 */

/**
 * PARTIE CHANGEMENT DE PAGE
 */

/**
 * Fonction qui va changer le contenu du main dans la page index.html vers la page indiqué dans la variable path en paramètre
 *
 * @param path [Nom de la page à charger]
 */
function switchPage(path){
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/serv_getHTML?name=' + path, true);
    xhr.onload = loadMainContent;
    xhr.send();
}

/**
 * Fonction qui va charger la page reçue dans le main de la page index.html
 */
function loadMainContent(){
    document.getElementById('mainContent').innerHTML = this.response;
}

/**
 * PARTIE CONNECTION
 */

/**
 * Fonction qui va envoyer les données entrées par l'utilisateur vers la base de données pour inscrire l'utilisateur dans la base
 *
 * @returns {boolean} evite de recharger la page
 */
function inscription() {
    localStorage.clear();
    document.getElementById('erreurInscription').innerHTML = "";
    let L1i = document.getElementById("inom").value;
    let L2i = document.getElementById("iprenom").value;
    let L3i = document.getElementById("ipseudo").value;
    let L4i = document.getElementById("icode").value;

    let xhr = new XMLHttpRequest();
    xhr.open('get', "/serv_insertUser?user=" + L3i + "&mdp="+ L4i + "&nom="+ L1i + "&prenom="+ L2i, true);
    xhr.onload = traitementInscription;
    xhr.send();
    localStorage.setItem('ligne1c', L3i);
    return false;
}

/**
 * Fonction qui vérifie si le nom d'utilisateur ou le mot de passe n'est pas deja utilisé et enfonction du résultat, va ou bien
 * afficher un message d'erreur, ou bien lancer la page principale du jeu: index.html
 */
function traitementInscription(){
    let response = this.response;

    if(Number(response)){
        document.getElementById('erreurInscription').innerHTML = "<br>Nom d'utilisateur ou mot de passe déjà utilisé<br>";
    }
    else{
        window.open('/serv_getHTML?name=index.html', '_self');
    }
}

/**
 * Fonction qui reçoit les données du formulaire de connexion pour l'utilisateur
 * et qui appelle un webservice qui renvoie la liste des utilisateurs présents dans la base de données pour
 * vérifier si l'utilisateur et le mot de passe sont correctes.
 * Cette fonction enregistre également les données entrées dans le localeStorage.
 *
 * @returns {boolean}
 */
function connexion() {
    localStorage.clear();
    let L1 = document.getElementById("cpseudo").value;
    let L2 = document.getElementById("ccode").value;

    let xhr = new XMLHttpRequest();
    xhr.open('get', "/serv_userConnection", true);
    xhr.onload = traiterConnexion;
    xhr.send();
    localStorage.setItem('ligne1c', L1);
    localStorage.setItem('ligne2c', L2);

    return false;
}

/**
 * Fonction qui va vérifier si le pseudo et le mot de passe sont correctes, en fonction du test
 * la fonction va ou bien lancer la page principale index.html, ou bien elle va afficher un message d'erreur.
 */
function traiterConnexion() {
    let response = JSON.parse(this.responseText);
    let lectureUser = localStorage.getItem('ligne1c');
    let lectureMdp = localStorage.getItem('ligne2c');

    for(let e of response) {
        if (e.NomUtilisateur === lectureUser && e.MDP === lectureMdp) {
            window.open('/serv_getHTML?name=index.html', '_self');
            break;
        }
        else{
            document.getElementById('erreurConnection').innerHTML = "<p>Le mot de passe ou le pseudo est erroné<\p>";
        }
    }
}

/**
 * PARTIE JEU
 */

let personnages = [];       //tableau qui va contenir l'ensemble des personnages mélangés aléatoirement
let pictures = [];          //tableau qui va contenir les id des personnages et les nom de fichiers de leurs photos, ordonnées par leur id
let compteurNiveau = 0;     //variable qui va contenir le niveau dans lequel on joue
let attemptNumber = 0;      //variable qui va contenir le nombre de tentatives qu'on a fait pour arriver à la bonne réponse...ou pas
let score = 0;              //variable qui va contenir le score de l'utilisateur
let pasTrouve = true;       //varaible indique si l'utilisateur a trouvé ou non le bon personnage (true : l'utilisateur n'a pas trouvé, false : l'utilisateur a trouvé)

/**
 * Fonction qui va récupérer le choix du mode de jeux indiqué par l'utilisateur et en fonction du choix va appeler la fonction getPersonnages
 * qui va à son tour demander les personnages ayant les genres correpondants dans le paramètre 'genre' de la fonction.
 * Ensuite la fonction lance la page jeu.html
 *
 * @returns {boolean} empêche la page de se recharger
 */
function categoryChoice(){
    let choice = document.querySelector("input[name='choix']:checked").value;
    personnages = [];
    pictures = [];
    if(choice === "reel"){
        getPersonnages('G03,G04,G05');
    }
    else if(choice === "fictif"){
        getPersonnages('G01,G02');
    }
    else if(choice === 'mixte'){
        getPersonnages('G01,G02,G03,G04,G05');
    }
    switchPage('jeu.html');

    return false;
}

/**
 * Fonction qui va appeler le webService qui va amener les personnages en fonction du genre qu'on donne en paramètre.
 *
 * @param genres [ce sont les genres de personnage qu'on a besoin]
 */
function getPersonnages(genres){
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/serv_getPersonnages?genre=' + genres, true);
    xhr.onload = recupPersonnages;
    xhr.send();
}

/**
 * Fonction qui va charger les données reçues du service dans un array local.
 * Les données entrées sont reçues dans un ordre aléatoire, on place donc dans un array supplémentaire les id et les
 * noms d'images des personnages et on va trier cet array en fonction des id des personnages.
 */
function recupPersonnages(){
    personnages = JSON.parse(this.responseText);
    for(let e of personnages){
        pictures.push([e.ID, e.image]);
    }
    pictures.sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * Fonction qui va premièrement préparer la page pour le jeu en divisant celle-ci en plusieurs parties.
 * Ensuite, on va cahrger les images sur la page dans un tableu qui compte 5 celulles de large.
 */
function afficherPersonnages(){
    document.getElementById('mainContent').innerHTML = "<div id='niveaux'></div><div id='score'>Votre score : " + score + "</div><div id='resultat'></div><table id='tablePhoto'><thead id='enoncerThead'><tr><th id='enonce' colspan='5'></th></tr></thead><tbody id='photoTbody'></tbody></table><br><button id='arretJeu' onclick='finDeJeu()'>Arrêter</button>";
    let stringPersonnages = "<tr>";
    for (let i in pictures) {
        if (i % 5 === 0) {
            stringPersonnages += "</tr>"
            if (Number(i) !== (pictures.length - 1)) {
                stringPersonnages += "<tr>";
            }
        }
        stringPersonnages += "<td class='photoPerso' id='" + pictures[i][0] + "' onclick='verificationReponse(this.id)'><img alt='" + pictures[i][1] + "' src='/serv_getImage?name=" + pictures[i][1] + "'></td>";
    }
    document.getElementById('photoTbody').innerHTML = stringPersonnages;
}

/**
 * Fonction qui va afficher la description du personnage à déviner et qui affiche le niveau auquel on joue
 * si le joueur n'as pas encore terminé les 15 niveaux, sinon on appelle la fonction 'finDeJeu' qui va
 * cloturer le jeu.
 */
function afficherEnonce(){
    if(compteurNiveau < 15) {
        pasTrouve = true;
        document.getElementById('resultat').innerHTML = "<br><br><br><br><br><br><br>";
        attemptNumber = 0;
        document.getElementById('enonce').innerHTML = "Enoncé : " + personnages[compteurNiveau].description;
        compteurNiveau++;
        document.getElementById('niveaux').innerHTML = "Niveau : " + compteurNiveau + "/15";
    }
    else{
        finDeJeu();
    }
}

/**
 * Fonction qui compare le personnage choisi par le joueur avec la réponse correcte et qui
 * fait varier le score en fonction des nombres de tentatives.
 * Si le joueur a raté et qu'il a encore des tentatives, la fonction 'getIndices' est appellé afin
 * de générer un indice supplémentaire.
 *
 * @param idPerso [l'id du personnage choisi par le joueur]
 */
function verificationReponse(idPerso){
    if(pasTrouve) {
        if (idPerso === personnages[compteurNiveau - 1].ID) {
            if (attemptNumber === 0) {
                score += 5;
                pasTrouve = false;
                let affiche;
                affiche = "<h1 id='bonneReponse'>Bonne Réponse</h1>";
                affiche += "<h2 id='points'>+5 points</h2>";
                affiche += "<button id='nextLevel' onclick='afficherEnonce()'>Prochain niveau</button>";
                document.getElementById('resultat').innerHTML = affiche;
            }
            else if (attemptNumber === 1) {
                score += 3;
                pasTrouve = false;
                let affiche;
                affiche = "<h1 id='bonneReponse'>Bonne Réponse</h1>";
                affiche += "<h2 id='points'>+2 points</h2>";
                affiche += "<button id='nextLevel' onclick='afficherEnonce()'>Prochain niveau</button>";
                document.getElementById('resultat').innerHTML = affiche;
            }
            else if (attemptNumber === 2) {
                score += 1;
                pasTrouve = false;
                let affiche;
                affiche = "<h1 id='bonneReponse'>Bonne Réponse</h1>";
                affiche += "<h2 id='points'>+1 points</h2>";
                affiche += "<button id='nextLevel' onclick='afficherEnonce()'>Prochain niveau</button>";
                document.getElementById('resultat').innerHTML = affiche;
            }
            document.getElementById('score').innerHTML = "Votre score : " + score;
        }
        else if (idPerso !== personnages[compteurNiveau - 1].ID) {
            if (attemptNumber === 0) {
                attemptNumber++;
                let affiche;
                affiche = "<h1 id='mauvaiseReponse'>Mauvaise réponse</h1><br><br><br><br>";
                document.getElementById('resultat').innerHTML = affiche;
                document.getElementById('mauvaiseReponse').style.animation = "shake 0.5s";
                getIndices(0, personnages[compteurNiveau - 1].ID);
            }
            else if (attemptNumber === 1) {
                attemptNumber++;
                let affiche;
                affiche = "<h1 id='mauvaiseReponse'>Mauvaise réponse</h1><br><br><br><br>";
                document.getElementById('resultat').innerHTML = affiche;
                document.getElementById('mauvaiseReponse').style.animation = "shake 0.5s";
                getIndices(1, personnages[compteurNiveau - 1].ID);
            }
            else if (attemptNumber === 2) {
                pasTrouve = false;
                let affiche;
                affiche = "<h1 id='mauvaiseReponse'>Mauvaise réponse</h1><br><br><br><br>";
                affiche += "<button id='nextLevel' onclick='afficherEnonce()'>Prochain niveau</button>";
                document.getElementById('resultat').innerHTML = affiche;
                document.getElementById('mauvaiseReponse').style.animation = "shake 0.5s";
            }
        }
    }
}

/**
 * Fonction qui va générer une requête pour obtenir l'indice première ou secondaire (en fonction du nombre de tentatives)
 * en fonction des paramètres reçus en entrée.
 *
 * @param n_indice [numéro d'indice (première ou secondaire)]
 * @param idPerso [id du personnage dont on a besoin l'indice]
 */
function getIndices(n_indice, idPerso){
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/serv_getIndices?persoChoisi=' + idPerso + '&numeroIndice=' + n_indice, true);
    xhr.onload = traitementIndices;
    xhr.send();
}

/**
 * Fonction qui va récupérer l'indice et qui va l'afficher dans la page.
 */
function traitementIndices(){
    let response = JSON.parse(this.responseText);
    document.getElementById('enonce').innerHTML = "Indice  : " + response[0].indice;
}

/**
 * Fonction executé à la fin du jeu, elle va enregistrer à l'aide d'une requête le score obtenu
 * par l'utilisateur.
 *
 * @param score [le score obtenu par l'utilisateur]
 * @param pseudoJoueur [le joueur à qui on doit ajouter le score]
 */
function enregistrerResultat(score, pseudoJoueur){
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/serv_ajoutScores?user=' + pseudoJoueur + '&score=' + score, true);
    xhr.send();
}

/**
 * Fonction qui, à l'aide d'une requête, demande tous les scores de tous les utilisateurs
 * afin de pouvoir créer un classement.
 */
function afficherClassement(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/serv_getScores', true);
    xhr.onload = traitementResultat;
    xhr.send();
}

/**
 * Fonction qui va générer un tableau et qui va remplir ce tableau avec
 * les scores et les pseudos des utilisateurs
 */
function traitementResultat(){
    let i = 0;
    let response = JSON.parse(this.responseText);
    let HTMLString = "";
    document.getElementById('mainContent').innerHTML = "<table id='tableprincipale'><thead id='entete'><tr><th class='titreClassement'>Position</th><th class='titreClassement'>Pseudo</th><th class='titreClassement'>score</th></tr></thead><tbody id='affichageClassemment'></tbody></table>";

    for(let e of response) {
        i++;
        HTMLString += "<tr><td class='caseClassement'>"+ i +"</td><td class='caseClassement'>" + e.pseudo + "</td><td class='caseClassement'>" + e.score + "</td></tr>";
    }
    document.getElementById('affichageClassemment').innerHTML = HTMLString;
}

/**
 * Fonction executé quand on arrête le jeu et qui appelle
 * les fonctions 'enregistrerResultat' et 'switchPage'
 */
function finDeJeu(){
    enregistrerResultat(score, localStorage.getItem('ligne1c'));
    switchPage('resultat.html');
}
