<!-- https://strapi.io/blog/how-to-set-up-amazon-s3-upload-provider-plugin-for-our-strapi-app -->

# 🚀 Getting started

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

## 🥦 Requirements

To start working with the Strapi CM template you have to

- Node V18
- NPM
- MySQL
- Docker

## 💨 Running Strapi locally

You can use this strapi template locally in two different ways for development:

- running locally with the `develop`, `start` or `build` commands list below
- Using `docker-compose` to create

### 1. Create `.env` file

Create a `.env` file taking into consideration the `.env.example` structure.
In the terminal you can run the following command to avoid misspelling and data lost:

```
cp .env.example .env
```

Then, fill all the required variables before starting the server.
[Learn more about .env files](https://medium.com/@sujathamudadla1213/what-is-the-use-of-env-8d6b3eb94843)

### 2. Run strapi

#### BEST ONE -> Docker

When using Docker, you only need to set the required variables in `.env` file and then, run the following command:

```
docker-compose -f docker-compose.dev.yml up
```

Once you do this, two containers are gonna be created:

1. cms-strapi-development
2. mysql-strapi-development

## 🚧 Important: for the following options you need to create you own DB and set the different variables to connect to it (check the `.env` file). A MySQL DB is required.

#### Good for development: `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
```

#### Good for production : `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
```

#### Admin panel: `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
```

## ⚙️ Deployment


## Strapi resources

### 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

### ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---
