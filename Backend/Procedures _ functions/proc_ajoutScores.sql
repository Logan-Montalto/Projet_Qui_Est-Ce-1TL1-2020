ALTER PROCEDURE "dba"."proc_ajoutScores" (@User varchar(100), @score tinyint)

BEGIN
if not EXISTS(select 1 from dba.Scores where dba.Scores.IdUtilisateur = (select IdUtilisateur from dba.Utilisateurs where NomUtilisateur = @user) and Score = @score) then
    INSERT INTO dba.Scores (IdUtilisateur, Score)
    VALUES ((select IdUtilisateur from dba.Utilisateurs where NomUtilisateur = @user), @score);
    select 0;
else
    update dba.Scores
    set ScoreDateTime = now()
    where dba.Scores.IdUtilisateur = (select IdUtilisateur from dba.Utilisateurs where NomUtilisateur = @user) and Score = @score;
    select 1;
end if
END