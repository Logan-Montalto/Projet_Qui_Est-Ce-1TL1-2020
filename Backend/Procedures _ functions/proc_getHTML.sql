ALTER PROCEDURE "dba"."proc_getHTML"(in name char(100))
result(HTML long varchar)
begin
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    call sa_set_http_header('Content-Type', 'text/html');
    select xp_read_file(dba.Fct_getPath() || name);
end