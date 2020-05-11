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
