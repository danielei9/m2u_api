# myapp

m2u

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## How do I modify?

There are two key files that enable you to customize and describe your API:

1. `server/routes.js` - This references the implementation of all of your routes. Add as many routes as you like and point each route your express handler functions.
2. `server/common/api.yaml` - This file contains your [OpenAPI spec](https://swagger.io/specification/). Describe your API here. It's recommended that you to declare any and all validation logic in this YAML. `express-no-stress-typescript`  uses [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) to automatically handle all API validation based on what you've defined in the spec.

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It

### Run in *development* mode

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It

* Open your browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint

  ```shell.
  curl http://localhost:3000/api/v1/examples
  ```

## Debug It

### Debug the server

```bash
npm run dev:debug
```

#### Debug Tests

```bash
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Lint It

View prettier linter output

```bash
npm run lint
```

Fix all prettier linter errors

```bash
npm run lint
```

## Deploy It

### Deploy to CloudFoundry

```shell
cf push myapp
```

### Deploy to ovh debian

```shell
# install postgree
sudo apt install software-properties-common apt-transport-https wget -y

sudo wget -O- https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /usr/share/keyrings/postgresql.gpg

echo deb [arch=amd64,arm64,ppc64el signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt/ bullseye-pgdg main | sudo tee /etc/apt/sources.list.d/postgresql.list

echo deb [arch=amd64,arm64,ppc64el signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt/ bullseye-pgdg-testing main | sudo tee /etc/apt/sources.list.d/postgresql-testing.list

sudo apt-get update

sudo apt install postgresql-client postgresql -y

systemctl status postgresql
```

Configurar PostrgresSql

```bash
sudo su - postgres -c "createdb database_test"
sudo su - postgres -c "createdb database_production"
sudo su - postgres -c "createdb m2u"

```

Iniciar postgresql

```bash
sudo -i -u postgres
psql 
/password postgres
```

<https://es.linuxcapable.com/how-to-install-postgresql-on-debian-11-bullseye/>
