# Sismics_WebApp

## Chamadas de API

### Última Hora (Past Hour):

Todos os terremotos na última hora: 
```GET
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
```
### Último Dia (Past Day):
Todos os terremotos no último dia:
```GET
 https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```
### Últimos 7 Dias (Past 7 Days):
Todos os terremotos nos últimos 7 dias:
```GET
 https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

```
## Todos os terremotos nos últimos 30 dias:
```GET
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
```
## Consultar terremoto por id:
```GET
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=ID
```

## Clonando o Repositório

Para clonar este repositório para a sua máquina local, utilize o seguinte comando:

```bash
git clone https://github.com/BrenoOrtiz/Sismics_WebApp.git
cd Sismics_WebApp
```

## Rodando a Aplicação

Siga os passos abaixo para configurar e rodar tanto o backend quanto o frontend da aplicação.

### Backend

1.  **Navegue até o diretório do backend:**

    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    _(Assumindo que você está usando Node.js com npm ou yarn. Ajuste conforme necessário para outras tecnologias, como Python com pip, Java com Maven/Gradle, etc.)_

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**

    -   Pode ser necessário criar um arquivo `.env` na raiz do diretório do backend com as configurações necessárias (ex: strings de conexão com banco de dados, chaves de API, etc.). Consulte a documentação específica do backend para mais detalhes.

4.  **Inicie o servidor backend:**
    ```bash
    npm start
    # ou o comando específico para iniciar seu servidor backend
    ```
    O servidor backend deverá estar rodando na porta especificada nas configurações (ex: `http://localhost:3000`).

### Frontend

1.  **Navegue até o diretório do frontend:**

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    _(Assumindo que você está usando Node.js com npm ou yarn para um framework como React, Angular, Vue, etc.)_

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente (se necessário):**

    -   Alguns projetos frontend podem necessitar de um arquivo `.env` para configurar, por exemplo, a URL da API do backend. Verifique a documentação do frontend.

4.  **Inicie o servidor de desenvolvimento do frontend:**
    ```bash
    npm run dev
    ```
    A aplicação frontend deverá estar acessível no seu navegador, geralmente em `http://localhost:3000` ou outra porta similar.
