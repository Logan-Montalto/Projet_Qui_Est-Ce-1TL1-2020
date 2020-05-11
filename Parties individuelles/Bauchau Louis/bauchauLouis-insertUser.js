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
