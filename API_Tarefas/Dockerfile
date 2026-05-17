# 1. Imagem base: Node 22 no Alpine (leve)
FROM node:22-alpine

# 2. Diretorio de trabalho dentro do container
WORKDIR /app

# 3. Copiar arquivos de dependencia primeiro para aproveitar cache
COPY package*.json ./

# 4. Instalar dependencias
RUN npm ci

# 5. Copiar o restante do codigo
COPY . .

# 6. Gerar o Prisma Client com o projeto completo ja copiado
RUN npx prisma generate

# 7. Build do TypeScript
RUN npm run build

# 8. Porta que a aplicacao vai escutar
EXPOSE 3000

# 9. Comando para iniciar
CMD ["node", "dist/index.js"]
