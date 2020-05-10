CREATE SERVICE "serv_ajoutScores"
TYPE 'RAW'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_ajoutScores(:user, :score);
