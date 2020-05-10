ALTER PROCEDURE "dba"."proc_Personnages"( in genres long varchar)

BEGIN
	call sa_set_http_header('Access-Control-Allow-Origin', '*');
    call dba.proc_getPersonnages(genres);
END