# Use a imagem base do Node
FROM node:18.16

# Instale o Docker Compose
RUN apt-get update && \
    apt-get -y install docker-compose

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos necessários
COPY . .

# Exponha as portas
EXPOSE 3000
EXPOSE 3001
EXPOSE 5432

# Comando de inicialização (substitua pelos comandos específicos do seu aplicativo)
CMD ["docker-compose", "up"]
USER root