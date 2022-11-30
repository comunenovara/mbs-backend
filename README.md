## Description

This is MBS back end. And is the firs project developed in nestjs by [@stepobiz](https://github.com/stepobiz), in this file is writed all comand to maintan the project.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Update entity

Quando si aggiorna una entity nel file schema.prisma eseguire il seguente comando:

```bash
npx prisma migrate dev
```

Dopo aver aggiornato le entity come al punto precedente o altro modo eseguire il comando:
```bash
npx prisma generate
```
for read db 
```bash
npx prisma studio
```