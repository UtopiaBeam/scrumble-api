# Scrumble API

Scrumble is my personal project to manage a scrum powered by [NestJS](https://nestjs.com/) + [MongoDB](https://www.mongodb.com/) + [GraphQL](https://graphql.org/). It is heavily inspired by [Trello](https://trello.com/) and [Jira](https://www.atlassian.com/software/jira). The main purpose of this project is to create an easy-to-use scrum management tool for myself, but contribution is very welcomed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

- [Adding dependencies](#adding-dependencies)
- [Running tests](#running-the-tests)
- [Formatting Code](#formatting-code)

### Prerequisites

You need the following softwares to run this project:
* [NestJS](https://nestjs.com/)
* [`yarn`](https://yarnpkg.com/en/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)

### Installing

A step by step series of examples that tell you how to get a development env running

1. Fork this repository

2. Clone forked repository to your machine

```
git clone https://github.com/<your-github-user>/scrumble-api.git
```

3. Create file named `.env`, then copy `example.env` and fill the details

4. Run the project using docker

```
docker-compose up
// or
docker-compose up -d
```

5. Now you can access the swagger at `http://localhost:3000/api`. For GraphQL playground, access `http://localhost:3000/graphql`.

## Adding dependencies

To add dependencies, run the following command:
```
yarn add <package-name>
```
Some dependencies should be added in `devDependencies`. To do that, run the following command:
```
yarn add -D <package-name>
```

## Running tests

To run tests only once, run:
```
yarn test
```
To run tests automatically while editing codes, run:
```
yarn test:watch
```

## Formatting code

To format codes, run:
```
yarn format
```

# Contributing guideline
As a contributor, here are guidelines we would like you to follow:
- [Branches](#branches)
- [Workflow](#workflow)
- [Commit Message Convention](#commit-message-convention)
- [Code review guideline](#code-review-guideline)

## Branches
There are mainly 3 branches in this project:
- `master` - This branch is **only** for production. You must not push to this branch.
- `staging` - This branch is for staging, which is used for QA. You should not push to this branch.
- `dev` - This branch stores the code in development. This is the branch to open pull request.

## Workflow
Please follow this workflow when working on an issue
1. Assign yourself for the issue.
2. Write code.
3. Commit and push to your `origin` repository.
4. Create a pull request to `upstream/dev` (template provided).
5. Wait for code review.
6. If change requested, fix it and push again.
7. If approved, just wait for PR to be merged.

## Commit Message Convention
In this repository, we use [gitmoji](https://gitmoji.carloscuesta.me/) for commit message. Please use **only one** gitmoji for each commit. For example:

```
✨ Add user resolver
```

## Code review guideline
Please make sure your PR follow this guideline or **it will be immediately rejected or requested to change**

* The code is formatted (run `yarn format` before commit).
* Write appropriate tests when adding or updating features.
* The commit message is in the correct format.
* Each endpoint has a proper documentation in swagger. In case of a GraphQL resolver, it will be automatically documented in GraphQL playground.
