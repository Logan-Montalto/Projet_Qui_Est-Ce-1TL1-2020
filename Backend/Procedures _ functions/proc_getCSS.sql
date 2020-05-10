ALTER PROCEDURE "dba"."proc_getCSS"(in name char(100))
result(css long varchar)
begin
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    call sa_set_http_header('Content-Type', 'text/css');
    select xp_read_file(dba.Fct_getPath() || 'css\' || name);
end