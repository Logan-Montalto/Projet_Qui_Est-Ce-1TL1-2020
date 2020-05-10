/**
 * Fonction qui, à l'aide d'une requête, demande tous les scores de tous les utilisateurs
 * afin de pouvoir créer un classement.
 */
function afficherClassement(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:80/serv_getScores', true);
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