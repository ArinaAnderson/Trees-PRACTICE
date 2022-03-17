![example workflow](https://github.com/ArinaAnderson/Trees-PRACTICE/actions/workflows/build-and-test.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/f8ca39d1f4b7a92af6b8/maintainability)](https://codeclimate.com/github/ArinaAnderson/Trees-PRACTICE/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f8ca39d1f4b7a92af6b8/test_coverage)](https://codeclimate.com/github/ArinaAnderson/Trees-PRACTICE/test_coverage)


# My steps:

## Locally (on my local machine)

```sh
git init
```

```sh
npm init
```

Install eslint:
```sh
sudo npm install -g eslint
npm install --save-dev eslint
sudo npm install -g eslint-config-airbnb-base eslint-plugin-import
sudo npm install -g eslint-plugin-jest
npm install eslint-plugin-jest@latest --save-dev
```

Configure eslint:
```sh
npx eslint --init
```

See the final version of .eslintrc.yml in the repository.

Install jest:
```sh
npm i --save-dev jest
```

Install lodash:
```sh
npm i --save lodash
```

Install module **js-immutable-fs-trees**:
```sh
npm install @hexlet/immutable-fs-trees
```

Add Makefile.

Add code and tests for it.

Add .gitignore (!coverage and node modules from).

## Remotely (on github)

Create a github repository, assign the local repository to the remote one.

Set up codeclimate Maintainability checks:
1. https://codeclimate.com/
2. Login / Quality / Open Source / Add a repository *(if necessary, click Sync now)*
3. Pick the remote repository from the list
4. See the actual status
5. Add Maintainability badge to README.md from : Repo Settings / Badges / Maintainability Badge *(Markdown)*

Add github workflow that would build project and run tests.
To refactor 🙀 --> to separate build and test jobs.

Add github actions badge for the workflow **build-and-test.yml**.
How to do it:
https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge

Add secret for codeclimate Test coverage checks to the github repository:
1. https://codeclimate.com/oss/dashboard
2. Repo Settings / Test coverage
3. Copy the ID from **Test reporter ID**
4. In the remote repository go to: Settings / Secrets / Actions 
5. Click **New repository secret**
6. Give Name and paste the codeclimate ID into Value field.
7. Add the secret's name to the github workflow file:
```sh
env:
    CC_TEST_REPORTER_ID: ${{ secrets.CC_TEST_REPORTER_ID }}
```

Add codeclimate Test coverage badge to README.md
