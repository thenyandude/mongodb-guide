import { useState, useEffect } from 'react';
import Tooltip from '../components/ToolTip'; // Kontroller at importbanen er riktig

const termsDefinitions = {
  "NoSQL": 'NoSQL-databaser tillater lagring og gjenfinning av data som er modellert på andre måter enn de tabulære relasjonene som brukes i relasjonsdatabaser.',
  "Admin":'En administratorbruker er en type brukerkonto på en datamaskin eller et nettverk som har tillatelse til å gjøre endringer som kan påvirke andre brukere av systemet. Denne brukeren kan installere programvare, endre sikkerhetsinnstillinger, og har tilgang til alle filer på systemet. Tenk på det som å være "sjefen" over datamaskinen, som kan bestemme over alt og alle.',
  "Repo":'Et repositorium er et lagringssted hvor data, ofte knyttet til programvareutvikling, blir holdt og vedlikeholdt. I IT-verdenen brukes dette ordet ofte om steder hvor kode for programvare oppbevares og administreres. Dette kan være lokalt på en datamaskin eller på internett. For eksempel, nettsteder som GitHub eller Bitbucket hvor utviklere lagrer og håndterer sine kodingsprosjekter.',
  "DB": 'En database er en samling av informasjon som er organisert på en måte som gjør det mulig å enkelt finne, hente og oppdatere data. I en skolekontekst kan du tenke på det som et digitalt skap hvor all elevinformasjon (som navn, alder, og karakterer) lagres systematisk. Databaser brukes i nesten alle applikasjoner du bruker, fra spill til sosiale medier, for å lagre forskjellige typer data.',
  "Schema": 'Et skjema i MongoDB via Mongoose definerer strukturen av dataene i en samling, inkludert typer felter, valideringsregler og standardverdier. Det fungerer som et rammeverk for MongoDB-dokumenter, og sikrer at dataene følger en spesifisert struktur og møter alle nødvendige krav før de lagres i databasen.',
  "Mongoose": 'Mongoose er et objektdatamodelleringsbibliotek for MongoDB og Node.js. Det tilbyr et skjemabasert løsningsmodell som forenkler datahåndtering ved å tilby innebygd typevalidering, spørringsbygging, og dokumentlivssyklushåndtering. Dette gjør det enklere for utviklere å arbeide med data i MongoDB.'

};

export const useMongoDBGuide = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent([
      {
        title: "Introduksjon til MongoDB",
        description: (
          <span>
            <Tooltip text={termsDefinitions["NoSQL"]}>MongoDB</Tooltip> er en <Tooltip text={termsDefinitions["DB"]}>NoSQL-database</Tooltip> som tilbyr høy ytelse, høy tilgjengelighet, og enkel skalering. Den er ideell for webapplikasjoner som krever rask databehandling og fleksibel datahåndtering, slik som dynamiske blogging-plattformer eller sosiale medier apper hvor innholdet stadig endres og oppdateres.
          </span>
        ),
        images: ["/imgs/MongoDB-Logo.png"],
      },
      {
        title: 'Forutsetninger',
        description: 'Før du installerer MongoDB, sørg for at du gjør dette først. Ha en VM klar.',
        images: ["/imgs/step1.png", "/imgs/step2.png"],
        codes: [
          { code: 'sudo apt update', description: 'Oppdater den lokale pakkedatabasen.' },
          { code: 'wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -', description: 'Legg til MongoDBs offentlige GPG-nøkkel' }
        ],
        additionalNotes: 'Forsikre deg om at din VM eller servermiljø er sikkert og oppdatert før du fortsetter installasjonen.'
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
        ],
        additionalNotes: 'Kontroller at kilde-lister er konfigurert korrekt for å unngå problemer under installasjon.'
      },
      {
        title: 'Installere MongoDB',
        description: 'Installer MongoDB-pakker på systemet ditt, og deretter start og verifiser MongoDB-tjenesten',
        videos: ["/vids/install_and_test.webm"],
        codes: [
          { code: 'sudo apt install -y mongodb-org', description: 'Installer alle MongoDB-pakkene' },
          { code: 'sudo systemctl start mongod', description: 'Start MongoDB' },
          { code: 'sudo systemctl status mongod', description: 'Sjekk status for MongoDB, se etter "active"' },
          { code: 'mongosh', description: 'Åpne MongoDB Shellet' }
        ],
        additionalNotes: 'Pass på at du har riktige rettigheter for å installere og starte tjenester på din maskin. Det kan hende du trenger administratorrettigheter eller sudo.'
      },
      {
        title: 'Aktivere automatisk oppstart av MongoDB',
        description: 'Aktiver MongoDB til å starte automatisk ved systemoppstart.',
        codes: [
          { code: 'sudo systemctl enable mongod', description: 'Aktiver automatisk oppstart' }
        ],
        additionalNotes: 'Ved å aktivere automatisk oppstart, sikrer du at MongoDB-tjenesten alltid kjører, selv etter serveren restartes.'
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
        ],
        additionalNotes: 'Sørg for å bruke sterke passord og endre standardinnstillinger for å forbedre sikkerheten.'
      },
      {
        title: 'Aktivere autentisering i MongoDB',
        description: 'For å sikre at kun autoriserte brukere har tilgang til databasene, må autentisering aktiveres i MongoDBs konfigurasjonsfil.',
        codes: [
          { 
            code: `security:\n  authorization: "enabled"`, 
            description: 'Legg til eller endre denne linjen under security-seksjonen i mongod.conf for å aktivere autentisering.' 
          }
        ],
        additionalNotes: 'Autentisering er en kritisk sikkerhetsfunksjon som hindrer uautorisert tilgang til databasen.'
      },
      {
        title: 'Koble til MongoDB fra din applikasjon',
        description: 'Nå som MongoDB er satt opp og sikret, kan du koble til databasen din fra applikasjonen ved å bruke en tilkoblingsstreng. Denne strengen vil avhenge av din applikasjons miljø og de bibliotekene du bruker.',
        codes: [
          {
            code: `const mongoose = require('mongoose');\nmongoose.connect('mongodb://admin:yourSecurePassword@yourServerIP:27017/admin', {\n    useNewUrlParser: true,\n    useUnifiedTopology: true\n});`,
            description: 'Erstatt "yourServerIP" med IP-adressen eller vertsnavnet til din MongoDB-server, og tilpass brukernavn og passord som du har konfigurert.'
          }
        ],
        additionalNotes: 'Sørg for at nettverkstilkoblingen til din MongoDB-server er sikker, spesielt hvis du kobler til over internett.'
      },
      {
        title: 'Definere Modeller i Mongoose',
        description: (
          <span>
            I Mongoose, representerer en <strong>modell</strong> en MongoDB-samling og fungerer som et <Tooltip text={termsDefinitions["Schema"]}>skjema</Tooltip> for å definere formatet og strukturen på dokumentene innen denne samlingen. For å definere en modell, starter du med å opprette et skjema, som detaljerer feltene (og deres datatyper) som hvert dokument kan ha. Her er et enkelt eksempel på hvordan man definerer et skjema og en modell for å håndtere brukerdata:
          </span>
        ),
        codes: [
          {
            code: `const mongoose = require('mongoose');\nconst { Schema } = mongoose;\nconst userSchema = new Schema({\n  name: { type: String, required: true },\n  password: { type: String, required: true },\n  role: { type: String, required: true }\n});\nconst User = mongoose.model('User', userSchema);\nmodule.exports = User;`,
            description: 'Dette skjemaet definerer en modell for brukere, hvor hver bruker må ha et navn, et passord og en rolle, alle som strengeverdier og obligatoriske felt.'
          }
        ],
        additionalNotes: 'God praksis er å validere inndata både på klient- og server-siden for å forebygge dataintegritetsproblemer.'
      },

      {
        title: 'Sette opp en Node.js server med MongoDB',
        description: (
          <span>
            For å håndtere data i MongoDB fra en webapplikasjon, trenger du en server. Denne seksjonen viser hvordan du kan sette opp en enkel Node.js server ved hjelp av <strong>Express</strong> og <strong>Mongoose</strong>. Først importerer vi nødvendige biblioteker, setter opp MongoDB-tilkoblingen, og deretter definerer vi ruter for å håndtere HTTP-forespørsler.
          </span>
        ),
        codes: [
          {
            code: `
            // Importerer nødvendige moduler
            const express = require('express');
            const mongoose = require('mongoose');
            const bodyParser = require('body-parser');
            const User = require('./User'); // Sørg for at stien til User-modellen er korrekt
      
            // Oppretter en ny Express applikasjon
            const app = express();
      
            // Body-parser middleware for å håndtere JSON data
            app.use(bodyParser.json());
      
            // MongoDB tilkoblingsstreng. Erstatt med dine egne detaljer
            const mongoURI = 'mongodb://admin:yourSecurePassword@yourServerIP:27017/admin';
            mongoose.connect(mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }).then(() => console.log('MongoDB tilkobling vellykket'))
              .catch(err => console.error('MongoDB tilkoblingsfeil:', err));
      
            // Definerer en enkel GET route
            app.get('/', (req, res) => {
              res.send('Velkommen til vår MongoDB server!');
            });
      
            // Definerer en POST route for å legge til brukere
            app.post('/users', (req, res) => {
              const newUser = new User(req.body);
              newUser.save()
                .then(user => res.status(201).send(user))
                .catch(err => res.status(400).send(err.message));
            });
      
            // Starter serveren på port 5000
            const port = process.env.PORT || 5000;
            app.listen(port, () => console.log(\`Server kjører på port \${port}\`));
            `,
            description: 'Dette scriptet setter opp en grunnleggende Express-server som kan motta og håndtere forespørsler for å legge til brukere i databasen. Det illustrerer også hvordan man starter serveren og kobler til MongoDB.'
          }
        ],
        images: [],
        additionalNotes: 'Sørg for å installere nødvendige NPM-pakker som express, mongoose, og body-parser før du kjører serveren. Tilpass også MongoDB-tilkoblingsstrengen etter din serverkonfigurasjon. Det er også viktig å sørge for korrekt håndtering av feil og sikkerhetsaspekter som HTTPS og autentiseringstiltak.'
      },
      
      {
        title: 'Eksempel',
        description: 'Her er et eksempel i VSCode om hvordan det burde se ut.',
        images: ["/imgs/Server.png", "/imgs/User.png"],
      },

      {
        title: 'Bruke API-en og kjøre serveren',
        description: (
          <span>
            Når du har konfigurert din Node.js server med MongoDB, er neste steg å teste at den fungerer som forventet. Dette inkluderer å starte serveren og gjøre HTTP-forespørsler til de definerte endepunktene for å se at alt fungerer korrekt.
          </span>
        ),
        codes: [
          {
            code: `
            node server.js
            `,
            description: 'Kommando for å starte serveren. Sørg for at du er i riktig mappe hvor din server.js fil ligger.'
          },
          {
            code: `
            curl http://localhost:5000/
            `,
            description: 'Bruk denne cURL-kommandoen for å teste GET-endepunktet og motta en velkomstmelding fra serveren.'
          },
          {
            code: `
            curl -X POST -H "Content-Type: application/json" -d '{"name": "Ny Bruker", "password": "sikkerPassord123", "role": "admin"}' http://localhost:5000/users
            `,
            description: 'Eksempel på en cURL-kommando for å legge til en bruker ved å bruke POST-endepunktet. Tilpass JSON-dataene etter behov.'
          }
        ],
        images: [],
        additionalNotes: 'Sørg for at alle miljøvariabler og konfigurasjoner er korrekt satt opp før du starter serveren. Det er også en god praksis å ha logging på plass for å fange opp og diagnostisere eventuelle feil som oppstår under kjøring. Husk å installere curl hvis det ikke allerede er tilgjengelig på systemet ditt.'
      },
      
      

      {
        title: 'Konklusjon',
        description: (
          <span>
            Gjennom denne guiden har du blitt ledet gjennom de viktige stegene for å sette opp, konfigurere og sikre en <Tooltip text={termsDefinitions["DB"]}>MongoDB-database</Tooltip>. Vi har dekket hvordan du installerer MongoDB, konfigurerer viktige sikkerhetstiltak og oppretter robuste databasemodeller med <Tooltip text={termsDefinitions["Mongoose"]}>Mongoose</Tooltip>. Vi har også sett på hvordan du kan integrere databasen med en Node.js-server for å skape en funksjonell API.
            <br/><br/>
            Det er viktig å merke seg at sikkerhet og vedlikehold spiller kritiske roller i håndteringen av en database. Implementering av autentisering, regelmessig oppdatering av programvare, og å ha et pålitelig <Tooltip text={termsDefinitions["Repo"]}>repositorium</Tooltip> for backup og versjonskontroll er avgjørende for både små og store applikasjoner. Til slutt, aldri undervurder verdien av grundig testing av din databasetilkobling og API-endepunkter før du setter applikasjonen i produksjon.
            <br/><br/>
            Ved å følge beste praksis og kontinuerlig oppdatering av din kunnskap om MongoDB og relaterte teknologier, kan du effektivt forbedre og sikre dine webapplikasjoner. Husk at læring er en pågående prosess, og det å holde seg oppdatert med de siste utviklingene i databaseteknologi vil hjelpe deg å bygge mer effektive og sikre systemer.
          </span>
        ),
        images: [],
        codes: []
      }
      
    ]);
  }, []);

  return { content };
};
