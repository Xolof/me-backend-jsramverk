CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS reports (
    week INT NOT NULL,
    report TEXT NOT NULL,
    UNIQUE(week)
);

CREATE TABLE IF NOT EXISTS presentations (
	id INT NOT NULL,
	presentation TEXT NOT NULL,
	UNIQUE(id)
);

DELETE FROM users;
DELETE FROM reports;
DELETE FROM presentations;

INSERT INTO presentations (id, presentation)
VALUES
(1, "# Om mig
## Hej!

Jag heter Olof och jag bor i Åstorp i Skåne.

Just nu blir det mycket fokus på studierna, det finns mycket att lära sig om JavaScript-ramverk och virtualisering med Linux.

Innan pluggade jag på distans ifrån utlandet. Men jag tyckte inte att det var så roligt i Filippinerna den sista tiden, de överreagerar alldeles för mycket på Covid. Då är det bättre i Sverige för tillfället.

När jag inte sitter vid datorn försöker jag komma ut i naturen för att röra på mig lite. Söderåsen är närmast men jag funderar på en tur till Kullaberg snart.

Kaffe dricker jag en del, det blir oftast Zoegas Skånerost.

Jag ser fram emot en intressant kurs!

");

INSERT INTO reports (week, report)
VALUES
(1, "# GitHub

[Repo on GitHub](https://github.com/Xolof/me-app-jsramverk/)

# README.md for 'me-app'

## Install the necessary NPM modules:
```
npm install
```

### Start the application:
```
npm run serve
```
"),
(2, "# GitHub

[Repo on GitHub](https://github.com/Xolof/me-backend-jsramverk)

# README.md for 'me-backend'

## Installation
```
npm install
```

## Run the application

First, set an environment variable in your terminal to some long and random string.
This is needed for JSON Web Token.

```
export JWT_SECRET='ThisIsJustAnExampleItShouldBeLongAndRandom'
```

Then you can start the applicaton.

```
npm start
```")
;
