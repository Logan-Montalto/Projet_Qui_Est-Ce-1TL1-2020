CREATE SERVICE "serv_getImage"
TYPE 'RAW'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_getImage(:name);
