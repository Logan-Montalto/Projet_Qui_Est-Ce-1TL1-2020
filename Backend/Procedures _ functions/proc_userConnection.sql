ALTER PROCEDURE "dba"."proc_userConnection" ()
Result(NomUtilisateur varchar(50), MDP varchar(50))
BEGIN
call sa_set_http_header('Content-Type', 'text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select NomUtilisateur, MDP
    from dba.Utilisateurs as t1;
END