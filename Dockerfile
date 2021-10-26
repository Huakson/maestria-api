FROM node:14.18.1

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . . 
CMD ["npx","prisma","generate"]
CMD ["npx","prisma","migrate","deploy","--preview-feature"]

EXPOSE 4000

CMD ["npm","run","dev"] 