ALTER PROCEDURE "dba"."proc_insertUser" (@user varchar(50), @mdp varchar(50), @nom varchar(40), @prenom varchar(40))
BEGIN
call sa_set_http_header('Content-Type', 'text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*');
if not EXISTS(select 1 from dba.Utilisateurs where nomUtilisateur = @user or mdp = @mdp) then
    INSERT INTO dba.Utilisateurs (NomUtilisateur, MDP, Nom, Prenom)
    VALUES (@user, @mdp, @nom, @prenom);
    select 0;
else
    select 1;
end if
END