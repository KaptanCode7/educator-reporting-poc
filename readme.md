# Eductor Reporting Fastify POC

A POC to build a modular fastify App

## Table of Contents

- [Project Title](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Introduction

Provide a brief introduction to your project. Explain its purpose, key features, and any important details.

## Features

List key features of your Fastify app.

## Getting Started

### Prerequisites

List any prerequisites or dependencies that need to be installed before running your app.

### Installation

Provide step-by-step instructions on how to install and set up your Fastify app.

```bash
# Clone the repository
git clone git@github.com:KaptanCode7/educator-reporting-poc.git

# Navigate to the project directory
cd educator-reporting-poc

# Install dependencies
npm install

# Run App
npm run dev


## Project Structure

project-root
|-- types
|   |-- user.ts
|   |-- product.ts
|
|-- modules
|   |-- user
|   |   |-- controller.ts
|   |   |-- route.ts
|   |   |-- service.ts
|   |
|   |-- product
|       |-- controller.ts
|       |-- route.ts
|       |-- service.ts
|
|-- services
|   |-- mongodb.ts
|
|-- plugins
|   |-- mongodb.plugin.ts
|
|-- graphql
|   |-- schema.ts
|   |-- resolvers.ts
|
|-- app.ts
|-- package.json


## Important Links
 - https://khalilstemmler.com/blogs/tooling/prettier/