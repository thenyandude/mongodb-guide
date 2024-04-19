import { useState, useEffect } from 'react';

export const useMongoDBGuide = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent([
      {
        "title": "Introduksjon til MongoDB",
        "description": "MongoDB er en NoSQL-database som tilbyr høy ytelse, høy tilgjengelighet, og enkel skalering. Den er ideell for webapplikasjoner som krever rask databehandling og fleksibel datahåndtering, slik som dynamiske blogging-plattformer eller sosiale medier apper hvor innholdet stadig endres og oppdateres.",
        "images": ["/imgs/MongoDB-Logo.png"]
      },      
      {
        title: 'Forutsetninger',
        description: 'Før du installerer MongoDB, sørg for at du gjør dette først.',
        images: ["/imgs/step1.png", "/imgs/step2.png"],
        codes: [
          { code: 'sudo apt update', description: 'Oppdater den lokale pakkedatabasen.' },
          { code: 'wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -', description: 'Legg til MongoDBs offentlige GPG-nøkkel' }
        ]
      },
      {
        title: 'Legge til MongoDB-repositoriet',
        description: 'Legg til MongoDB-repositoriet i systemets programvarelagerliste.',
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
        description: 'Konfigurer sikkerhetstiltak og opprett en administratorbruker for å administrere databasen.',
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
      }
    ]);
  }, []);

  return { content };
};