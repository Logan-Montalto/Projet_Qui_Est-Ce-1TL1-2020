Create table Genres (
    IdGenre char(3) not null,
    Genre varchar(50) not null,
    Reel bit null,
    constraint pk_Genres primary key (IdGenre)
);

create table Personnages (
    IdPersonnage char(3) not null,
    Nom varchar(30) null,
    Prenom varchar(30) not null,
    Description long varchar not null,
    Image long varchar not null,
    IdGenre char(3) not null,
    constraint pk_Personnages primary key (IdPersonnage),
    constraint pk_Personnages_Genres Foreign key (IdGenre) references Genres (IdGenre)
);

create table Indices (
    IdIndices char(3) not null,
    Indice long varchar not null,
    constraint pk_Indices primary key (IdIndices)
);

create table indices_personnages (
    IdPersonnages char(3) not null,
    IdIndice char(3) not null,
    n_indice bit not null,
    constraint pk_indices_personnages primary key (IdPersonnages, IdIndice),
    constraint pk_indices_personnages_personnages foreign key (IdPersonnages) references Personnages (IdPersonnage),
    constraint pk_indices_personnages_indices foreign key (IdIndice) references Indices (IdIndices)
);

create table Utilisateurs (
    IdUtilisateur integer not null default AUTOINCREMENT,
    NomUtilisateur varchar(50) not null,
    MDP varchar(50) not null,
    Nom varchar(40) not null,
    Prenom varchar(40) not null,
    constraint pk_Utilisateurs primary key (IdUtilisateur)
);

create table Scores (
    ScoreDateTime timestamp not null default now(*),
    IdUtilisateur integer not null,
    Score tinyint not null,
    constraint pk_Scores primary key (ScoreDateTime, IdUtilisateur),
    constraint pk_Scores_Utilisateurs foreign key (IdUtilisateur) references Utilisateurs (IdUtilisateur)
);