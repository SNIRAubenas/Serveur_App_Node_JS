# Utilisation de l'image officielle de Node.js
FROM node:14

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie du package.json et du package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Exposition du port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]