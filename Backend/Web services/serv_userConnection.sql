CREATE SERVICE "serv_userConnection"
TYPE 'JSON'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call proc_userConnection();
