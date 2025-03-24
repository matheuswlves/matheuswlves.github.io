# Use uma imagem base do Node.js
FROM node:16

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para dentro do contêiner
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta do seu aplicativo
EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["npm", "start"]
