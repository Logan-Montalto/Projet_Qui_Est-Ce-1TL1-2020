CREATE SERVICE "serv_getPNG"
TYPE 'RAW'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_getPNG(:name);
