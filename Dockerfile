## Comando obrigatório
## Baixa a imagem do node com versão alpine (versão mais simplificada e leve)
FROM node:16-alpine

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que você quiser
WORKDIR /usr/app

## Adiciona a configuração NODE_OPTIONS ao ambiente
ENV NODE_OPTIONS="--max-old-space-size=4096"

## Copia tudo que começa com package e termina com .json para dentro da pasta /usr/app
COPY package*.json ./

## Executa npm install para adicionar as dependências e criar a pasta node_modules

RUN npm config set registry https://registry.npmjs.org/


RUN npm install --legacy-peer-deps

## Copia tudo que está no diretório onde o arquivo Dockerfile
COPY . .

## Container ficará ouvindo os acessos na porta 5173
EXPOSE 5173

## Não se repete no Dockerfile
## Executa o comando npm start para iniciar o script que está no package.json
CMD ["npm", "run", "dev"]
