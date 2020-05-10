CREATE SERVICE "serv_insertUser"
TYPE 'RAW'
AUTHORIZATION OFF
USER "DBA"
URL ON
METHODS 'GET'
AS call dba.proc_insertUser(:user, :mdp, :nom, :prenom);
