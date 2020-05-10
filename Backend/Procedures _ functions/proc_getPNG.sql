ALTER PROCEDURE "dba"."proc_getPNG"(in name char(100))
result(Image long binary)
begin
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    call sa_set_http_header('Content-Type', 'image/png');
    select xp_read_file(dba.Fct_getPath() || 'imagesStyle\' || name);
end