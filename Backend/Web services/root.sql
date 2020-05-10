CREATE SERVICE "root"
TYPE 'RAW'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_getHTML('connexion.html');
