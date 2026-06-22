FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
# Asegúrate que el comando build coincida con tu package.json
RUN npm run build -- --ssr=false --prerender=false

# Etapa 2: Servir con Nginx (Servidor Web ligero)
FROM nginx:latest
# Copia el build desde la etapa anterior
# Nota: Ajusta 'tu-proyecto' al nombre definido en angular.json
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/help-with-teacch/browser /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]