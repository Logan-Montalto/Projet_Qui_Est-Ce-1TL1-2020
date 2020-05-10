CREATE SERVICE "serv_getIndices"
TYPE 'JSON'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_getIndices(:persoChoisi, :numeroIndice);
