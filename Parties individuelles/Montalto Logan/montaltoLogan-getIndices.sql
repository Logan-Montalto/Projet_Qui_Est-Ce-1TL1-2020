/*La Procédure*/

ALTER PROCEDURE "dba"."proc_getIndices" (persoChoisi char(3), numeroIndice integer)
Result(indice long varchar)
BEGIN
call sa_set_http_header('Content-Type', 'text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*');
SELECT t2.Indice as indice
from dba.indices_personnages as t1
    join dba.Indices as t2
        on t1.IdIndice = t2.IdIndices
where t1.IdPersonnages = persoChoisi and t1.n_indice = numeroIndice;
END

/*Le Webservice*/

CREATE SERVICE "serv_getIndices"
TYPE 'JSON'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_getIndices(:persoChoisi, :numeroIndice);
