CREATE SERVICE "serv_getPersonnages"
TYPE 'JSON'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_Personnages(:genre);
