ALTER PROCEDURE "dba"."proc_getJS"(in name char(100))
result(js long varchar)
begin
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    call sa_set_http_header('Content-Type', 'application/js');
    select xp_read_file(dba.Fct_getPath() || 'js\' || name);
end