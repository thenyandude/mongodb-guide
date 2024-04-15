import { useState, useEffect } from 'react';

export const useMongoDBGuide = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent([
      {
        title: 'Introduksjon til MongoDB',
        description: 'MongoDB er en NoSQL-database som tilbyr høy ytelse, høy tilgjengelighet, og enkel skalering.',
      },
      {
        title: 'Forutsetninger',
        description: 'Før du installerer MongoDB, sørg for at systemet ditt møter disse forutsetningene.',
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
          { code: 'sudo apt-get install -y mongodb-org', description: 'Installer alle MongoDB-pakkene' },
          { code: 'sudo systemctl start mongod', description: 'Start MongoDB' },
          { code: 'sudo systemctl status mongod', description: 'Sjekk status for MongoDB, se etter "active"' }
        ]
      },
      {
        title: 'Aktivere automatisk oppstart av MongoDB',
        description: 'Aktiver MongoDB til å starte automatisk ved systemoppstart.',
        codes: [
          { code: 'sudo systemctl enable mongod', description: 'Aktiver automatisk oppstart' }
        ]
      },

    ]);
  }, []);

  return { content };
};
