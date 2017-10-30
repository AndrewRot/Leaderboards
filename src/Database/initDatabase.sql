

/* 1. 8***************/
drop table BoardAccountLink;
drop table Accounts;
drop table Boards;
drop table Scores;


/*   *********************************************/
create table Accounts(
	userID  int,
	firstName varchar(20),
	lastName varchar(20),
	username varchar(20),
	email varchar(30),
	password varchar(20),
	city varchar(20),
	state varchar(20),
	country varchar(20),
	token varchar(80),
	PRIMARY KEY (userID)
);
insert into Accounts values(1, 'Andrew', 'Rottier', 'acrottier', 'andrewrottier95@gmail.com', 'password', 'Worcester', 'MA', 'United States', '123');
insert into Accounts values(2, 'Harry', 'Kane', 'hkane', 'kane@gmail.com', 'password', 'Worcester', 'MA', 'United States', '123');
insert into Accounts values(3, 'Berny', 'Sanders', 'bsanders', 'sanders@gmail.com', 'password', 'Worcester', 'MA', 'United States', '123');
insert into Accounts values(4, 'Jim', 'Bo', 'jimbo', 'jbo@gmail.com', 'password', 'Montreal', 'CA', 'Canada', '123');


create table Boards(
	boardID int,
	name varchar(30),
	description varchar(100),
	imgURL varchar(50),
	PRIMARY KEY (boardID)
);
insert into Boards values(1, 'Fantasy Soccer', 'Fantasy soccer, goals, assists, other stats', '/images/fantasysoccer.png');
insert into Boards values(2, 'Netflix', 'Netflix movies watched', '/images/netflix.png');
insert into Boards values(3, 'Github', 'Lines of code committed', '/images/github.png');


create table BoardAccountLink(
	userID int ,
	boardID int ,
	PRIMARY KEY (userID, boardID),
	CONSTRAINT fk_A_userID FOREIGN KEY (userID) REFERENCES Accounts(userID),
	CONSTRAINT fk_B_boardID FOREIGN KEY (boardID) REFERENCES Boards(boardID)
);
/* Add all 3 users to the first board */
insert into BoardAccountLink values(1, 1);
insert into BoardAccountLink values(1, 2);
insert into BoardAccountLink values(1, 3); 

insert into BoardAccountLink values(2, 1);
insert into BoardAccountLink values(2, 2);
insert into BoardAccountLink values(3, 1);
insert into BoardAccountLink values(3, 2);




create table Scores(
	boardID int,
	userID int,
	scoreID int,
	score int,
	scoreName varchar(40),
	time date,
	PRIMARY KEY (boardID, userID, scoreID)
);
/*FANTASY SOCCER: Add games played */
insert into Scores values(1, 1, 1, 100, 'Games Played', '2017-10-29' );
insert into Scores values(1, 2, 1, 105, 'Games Played', '2017-10-20');
insert into Scores values(1, 3, 1, 95 , 'Games Played', '2017-10-21');
insert into Scores values(1, 4, 1, 10 , 'Games Played', '2017-10-21');

/*Add goals */
insert into Scores values(1, 1, 2, 1, 'Goals', '2017-08-31' );
insert into Scores values(1, 2, 2, 5, 'Goals', '2017-09-20');
insert into Scores values(1, 3, 2, 9, 'Goals', '2017-09-21');
insert into Scores values(1, 4, 2, 0 , 'Games Played', '2017-09-21');

/*Add assists */
insert into Scores values(1, 1, 3, 3, 'Assists', '2017-08-31' );
insert into Scores values(1, 2, 3, 4, 'Assists', '2017-09-20');
insert into Scores values(1, 3, 3, 2, 'Assists', '2017-09-21');

/*NETFLIX: Add movies watched */
insert into Scores values(2, 1, 1, 30, 'Movies Watched', '2017-08-31' );
insert into Scores values(2, 2, 1, 40, 'Movies Watched', '2017-10-26');
insert into Scores values(2, 3, 1, 20, 'Movies Watched', '2017-09-21');
/* Add tv shows watched */
insert into Scores values(2, 1, 2, 12, 'TV Shows Watched', '2017-08-31' );
insert into Scores values(2, 2, 2, 6, 'TV Shows Watched', '2017-09-20');
insert into Scores values(2, 3, 2, 15, 'TV Shows Watched', '2017-09-21');
insert into Scores values(2, 4, 2, 40, 'TV Shows Watched', '2017-09-21');






select * 
from Accounts;

select * 
from Boards;

select * 
from BoardAccountLink;

select * 
from Scores;


/*
create table ScoreBoardLink(
	boardID int ,
	scoreID int ,
	scoreName varchar(40),
	PRIMARY KEY (boardID, scoreID)
	
);
insert into ScoreBoardLink values(1, 1, 'Games Played');
insert into ScoreBoardLink values(1, 2, 'Goals');
insert into ScoreBoardLink values(1, 3, 'Assists');

insert into ScoreBoardLink values(2, 1, 'Movies Watched');
insert into ScoreBoardLink values(2, 2, 'TV Shows Watched');

insert into ScoreBoardLink values(3, 1, 'Lines Committed');

add FOREIGN keys */





/* Select the board info from a given user's boards*/
select * 
from  BoardAccountLink BAL, Boards B
where userID = 1
and B.boardID = BAL.boardID

/* Get all of the given high scores for a given boardID */
select * 
from ScoreBoardLink SBL
where SBL.boardID = 1;


/* Filter the data for the leaderboard. Get the user's location based on parameter, time from score, */
select * 
from Accounts A, Scores S
where S.scoreID = 1
and A.userID = S.userID;

/*
For authors who published science fiction but not non-fiction, list how many 
books each author published with each publishing company.
Write the relational algebra
Write the SQL code for the above, but sorted by publisher and then by author 
names

select WB.name, SF.publisherName, count(ISBN) as NumberPublished
from WrittenBy WB, NFBook NF, SFBook SF
Where WB.ISBN  = NF.ISBN
and WB.ISBN = SF.ISBN


/*
Report the names of unique publishers who published books that are priced between 
$50 and $75 but not $50 or $75, 
Write the relational algebra
Write the SQL code, but sorted by publisher name

select Distinct P.name
from SFBook SF, NFBook NF, Publisher P
where SF.price > 50
and SF.price < 75
and NF.price > 50
and NF.price < 75
and P.name = SF.publisherName
and P.name = NF.publisherName

/*
Report the warehouse code and phone number for warehouses that stock more
 than 500 copies of any book by the author ‘Isaac Asimov’.
Write the relational algebra
Write the SQL code

select W.code, W.phone
from Warehouse W, Stocks S, WrittenBy WB
where WB.name = 'Isaac Asimov'
and S.numberOfBooks > 500
and WB.ISBN = S.ISBN
and S.WH_code = W.code
*/











