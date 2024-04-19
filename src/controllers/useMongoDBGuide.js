import { useState, useEffect } from 'react';
import Tooltip from '../components/ToolTip'; // Kontroller at importbanen er riktig

const termsDefinitions = {
  "NoSQL": 'NoSQL-databaser tillater lagring og gjenfinning av data som er modellert på andre måter enn de tabulære relasjonene som brukes i relasjonsdatabaser.',
  "Admin":'En administratorbruker er en type brukerkonto på en datamaskin eller et nettverk som har tillatelse til å gjøre endringer som kan påvirke andre brukere av systemet. Denne brukeren kan installere programvare, endre sikkerhetsinnstillinger, og har tilgang til alle filer på systemet. Tenk på det som å være "sjefen" over datamaskinen, som kan bestemme over alt og alle.',
  "Repo":'Et repositorium er et lagringssted hvor data, ofte knyttet til programvareutvikling, blir holdt og vedlikeholdt. I IT-verdenen brukes dette ordet ofte om steder hvor kode for programvare oppbevares og administreres. Dette kan være lokalt på en datamaskin eller på internett. For eksempel, nettsteder som GitHub eller Bitbucket hvor utviklere lagrer og håndterer sine kodingsprosjekter.',
  "DB": 'En database er en samling av informasjon som er organisert på en måte som gjør det mulig å enkelt finne, hente og oppdatere data. I en skolekontekst kan du tenke på det som et digitalt skap hvor all elevinformasjon (som navn, alder, og karakterer) lagres systematisk. Databaser brukes i nesten alle applikasjoner du bruker, fra spill til sosiale medier, for å lagre forskjellige typer data.'
};

export const useMongoDBGuide = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent([
      {
        "title": "Introduksjon til MongoDB",
        "description": (
          <span>
            <Tooltip text={termsDefinitions["NoSQL"]}>MongoDB</Tooltip> er en <Tooltip text={termsDefinitions["DB"]}>NoSQL-database</Tooltip> som tilbyr høy ytelse, høy tilgjengelighet, og enkel skalering. Den er ideell for webapplikasjoner som krever rask databehandling og fleksibel datahåndtering, slik som dynamiske blogging-plattformer eller sosiale medier apper hvor innholdet stadig endres og oppdateres.
          </span>
        ),
        "images": ["/imgs/MongoDB-Logo.png"]
      },
      {
        title: 'Forutsetninger',
        description:'Før du installerer MongoDB, sørg for at du gjør dette først. Ha en VM klar.',
        images: ["/imgs/step1.png", "/imgs/step2.png"],
        codes: [
          { code: 'sudo apt update', description: 'Oppdater den lokale pakkedatabasen.' },
          { code: 'wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -', description: 'Legg til MongoDBs offentlige GPG-nøkkel' }
        ]
      },
      {
        title: 'Legge til MongoDB-repositoriet',
        description: (
          <span>
            Legg til <Tooltip text={termsDefinitions["Repo"]}>MongoDB-repositoriet</Tooltip> i systemets programvarelagerliste.
          </span>
        ),
        codes: [
          { code: `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list`, description: 'Legg til repositoriet' },
          { code: 'sudo apt update', description: 'Oppdater den lokale pakkedatabasen igjen, for å bruke mongoDB' }
        ]
      },
      {
        title: 'Installere MongoDB',
        description: 'Installer MongoDB-pakker på systemet ditt, og deretter start og verifiser MongoDB-tjenesten',
        videos:["/vids/install_and_test.webm"],
        codes: [
          { code: 'sudo apt install -y mongodb-org', description: 'Installer alle MongoDB-pakkene' },
          { code: 'sudo systemctl start mongod', description: 'Start MongoDB' },
          { code: 'sudo systemctl status mongod', description: 'Sjekk status for MongoDB, se etter "active"' },
          { code: 'mongosh', description: 'Åpne MongoDB Shellet' }
        ]
      },
      {
        title: 'Aktivere automatisk oppstart av MongoDB',
        description: 'Aktiver MongoDB til å starte automatisk ved systemoppstart.',
        codes: [
          { code: 'sudo systemctl enable mongod', description: 'Aktiver automatisk oppstart' }
        ]
      },
      {
        title: 'Sikre din MongoDB-server',
        description: (
          <span>
            Konfigurer sikkerhetstiltak og opprett en <Tooltip text={termsDefinitions["Admin"]}>administratorbruker</Tooltip> for å administrere databasen.
          </span>
        ),
        codes: [
          { code: 'mongosh', description: 'Start MongoDB shell' },
          { code: 'use admin', description: 'Bytt til admin-databasen' },
          { code: `db.createUser({
            user: "admin",
            pwd: passwordPrompt(),
            roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
          })`, description: 'Opprett en administratorbruker med tilgang til alle databaser' }
        ]
      },
      {
        title: 'Aktivere autentisering i MongoDB',
        description: 'For å sikre at kun autoriserte brukere har tilgang til databasene, må autentisering aktiveres i MongoDBs konfigurasjonsfil.',
        codes: [
          { 
            code: `security:\n  authorization: "enabled"`, 
            description: 'Legg til eller endre denne linjen under security-seksjonen i mongod.conf for å aktivere autentisering.' 
          }
        ]
      },
      {
        title: 'Koble til MongoDB fra din applikasjon',
        description: 'Nå som MongoDB er satt opp og sikret, kan du koble til databasen din fra applikasjonen ved å bruke en tilkoblingsstreng. Denne strengen vil avhenge av din applikasjons miljø og de bibliotekene du bruker.',
        codes: [
          {
            code: `const mongoose = require('mongoose');\nmongoose.connect('mongodb://admin:yourSecurePassword@yourServerIP:27017/admin', {\n    useNewUrlParser: true,\n    useUnifiedTopology: true\n});`,
            description: 'Erstatt "yourServerIP" med IP-adressen eller vertsnavnet til din MongoDB-server, og tilpass brukernavn og passord som du har konfigurert.'
          }
        ]
      },
      {
        title: 'Konklusjon',
        description: (
          <span>
            Denne guiden har tatt deg gjennom de nødvendige trinnene for å installere, konfigurere og sikre en <Tooltip text={termsDefinitions["DB"]}>MongoDB-database</Tooltip>. Viktigheten av sikkerhetsaspekter som autentisering og korrekt administrasjon gjennom en <Tooltip text={termsDefinitions["Admin"]}>administratorbruker</Tooltip> kan ikke understrekes nok. Å ha et solid <Tooltip text={termsDefinitions["Repo"]}>repositorium</Tooltip> for backup og versjonskontroll er også essensielt for vedlikehold og skalerbarhet. Til slutt, sikre deg at du alltid tester databasetilkoblingen grundig før du går live med en applikasjon.
          </span>
        ),
        images: [],
        codes: []
      }
    ]);
  }, []);

  return { content };
};
