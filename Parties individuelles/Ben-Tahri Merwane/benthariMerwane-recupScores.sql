/*La Procédure*/

ALTER PROCEDURE "dba"."proc_getScores" ( )
Result(pseudo varchar(50), score tinyint)
BEGIN
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    call sa_set_http_header('content-type', 'text/html');
    select  util.NomUtilisateur as pseudo,  max(sco.Score) as score
    from dba.Utilisateurs as util
        join dba.scores as sco on util.IdUtilisateur = sco.IdUtilisateur
    GROUP BY pseudo
    ORDER BY score DESC;
END

/*Le Webservice*/

CREATE SERVICE "serv_getScores"
TYPE 'JSON'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_getScores();
