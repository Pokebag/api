# Contributing

You want to contribute to the Pokébag API? Awesome!

## Some things to know

By contributing to this repository, you are expected to know and follow the rules of general conduct outlined in our [Code of Conduct][coc]. While not all rules are applicable in the context of github, we still expect the same level of professional behavior detailed by our CoC.

**Working on your first Pull Request?**
[How to Contribute to an Open Source Project on GitHub][egghead]

## How do I...

* Request a feature?
  [Submit it!][new-issue]

* Report a bug?
  [Let us know!][new-issue]

* Setup a development enviornment?
  [We've got you covered!](#project-setup)

* Submit a PR?
  [Learn more here!](#code-contributions)





## Project setup

1. Install Node.js (if you haven't already).
    * [`nvm`](#nvm-install) is recommended for Linux/WSL/macOS.
    * Node for Windows is available [here](#node-install), but you should probably be using WSL or some other linux-based CLI alternative.
    * Current version requirement is: `Node@^16.0.0`.
1. Install Yarn (if you haven't already).
    * Run: `npm install --global yarn`
1. Fork and clone the repo
    * Hit "Fork" in the upper left corner of the github page.
    * Run: `git clone https://github.com/<your username>/api`
1. In the project directory, run `yarn install` to install dependencies.
1. Run `yarn dev` to start the dev server.

> Warning: Use of `npm` as a package manager is **NOT** supported.

> Tip: Keep your `develop` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```bash
> git remote add upstream https://github.com/Pokebag/api.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `main`
> branch to use the upstream `main` branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `main`
> branch. Whenever you want to update your version of `main`, do a regular
> `git pull`.





## Code Contributions

Please, *please*, ***please*** get some feedback before you write any code. Don't waste your time building a feature that's already been discussed or is currently in-progress by another developer. Search our existing [issues][issues] for a related issue, or [create a new one][new-issue] if none exists.

Before beginning work on your first contribution, you should read through this document to make the process as straightforward as possible.





### Development flow

Once you have an issue to work on, follow these steps to get you off the ground.

1. If this is your first contribution, follow ["Project Setup"](#project-setup) above.
1. Create a new working branch off of `main` on your own fork.
1. Do the work required to satisfy the issue. If work unrelated to the objective needs to be done, discuss it in the issue before proceeding.
1. Commit your changes following our [Commit Conventions](#commit-conventions).
1. Before creating your PR, ensure you have followed the [PR Checklist](#submitting-a-pr) below.
1. Submit PR to merge back into `main`.
    * When ready, a review should be requested from the `Pokebag/api` team.





### Submitting a PR

So you've got a working branch all ready to go? Great! Before submitting, make sure you've followed this checklist.

- [ ] This PR was created to resolve an existing issue or set of issues.
- [ ] This PR satisfies any and all acceptance criteria laid out by issue(s) it resolves.
- [ ] I have discussed creating this PR with the maintainers in the issue(s) beforehand.
- [ ] I have thoroughly tested the changes this PR introduces in a local development enviornment.
- [ ] I have linted the entire codebase using `yarn lint` and confirmed there are no errors or warnings.
- [ ] I have followed the commit conventions laid out by the [Commit Conventions](#commit-conventions) section below.





### Being added as a contributor

When you create your first pull request we will add you as a contributor as per [All Contributors][all-contributors] convention. If you have created an issue but not a PR, you will be added along with the PR that closes your issue.

If you do not wish to be added to the contributors list, please specify in the pull request or GitHub issue. The pull request template contains a section specifically for this.





### Commit conventions

We use an interpretation of the angular commit conventions in this project. Generally speaking, all commits should follow this pattern:
```
type(componentOrRoute): commit message

commit body
```
* **type** - The type of work done in the commit. [See below for types](#commit-types).
* **component** - Should follow these rules:
    * If the file is a route (in the `routes` directory), no suffix is needed. Just use the file name.
    * If the file is a helper file (in the `helpers` directory), using `helpers` as the component will suffice.
    * If the file is documentation, no suffix is needed, however docs should **ALWAYS** have a commit type of `docs`.
    * Remain as consistent in naming as possible. Use git history as precedence for the component name given to a file.
* **commit message** - This should quickly summarize changes made.
* **commit body** - Most commits *do not* require a commit body. If your changes are particularly complex, or include a breaking change, adding a commit body is a great opportunity to provide insight into *why* these changes were necessary.

If in doubt about component naming, try to dive into the commit history for the file in question. If you're still confused, don't hesitate to ask somebody! Use your best judgement, but prefer consistency over enforcing the rules set by this document. The point of these rules is to make searching through commits easier, and consistency helps the most.

Commits should be as small as possible, with exceptions for large sweeping changes required by lint rule changes, package updates, etc.

If the commit **must** make changes to two or more **completely unrelated** files, the component and parentheses are not required.

### Commit types
* `feat` - A new feature
* `fix` - A bug fix
* `docs` - Documentation only changes
* `style` - Changes that do not affect the meaning of the code (white-space, formatting, rogue semicolons, etc)
* `refactor` - A code change that neither fixes a bug nor adds a feature
* `perf` - A code change that improves performance
* `test` - Adding missing tests or correcting existing tests
* `build` - Changes that affect the build system or external dependencies (example scopes: semantic-release, ESLint, etc)
* `ci` - Changes to our CI configuration files and scripts (example scopes: GH Actions, DO App Platform, etc)
* `chore` - Other changes that don't modify src or test files
* `revert` - Reverts a previous commit





## Primary Repo Development

These rules pertain to development on the main `Pokebag/api` repository, and do not need to be followed if you're doing development on your own fork.

### Development flow

1. Branch from `main` using the [branch conventions below](#branch-conventions).
1. Do the work required to satisfy the issue or objective. If work unrelated to the objective needs to be done, make a separate branch.
1. Submit PR to merge back into `main`.
    * Any change which would affect current development should be documented in the description.
    * Assign the PR to yourself.
    * The PR should be labeled with the label most fitting to the type of work. If the PR is a bugfix which must be merged to fix a major problem, it should be labeled `urgent`.
    * When the PR is ready to be merged, A review should be requested from the `Pokebag/api` team.
1. Once the PR is approved, it is the responsibility of the **assignee** to merge the PR.

### Branch Conventions

Work branches on the **main repo** are expected to follow this branch format:

```
type/objective
```
* **type** - The type of work being done. See below for types.
* **objective** - a simple and breif descriptor of the work being done. words should be hyphen-delimited. e.g. `fix-venusaur`, `redesign-pokemon-route`, `add-cors-headers`

#### Branch types

Branches can have all of the same types as commits. See the [commit types](#commit-types) above.





[coc]: ./CODE_OF_CONDUCT.md
[all-contributors]: https://allcontributors.org/
[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[nvm-install]: https://github.com/nvm-sh/nvm#installing-and-updating/
[node-install]: https://nodejs.org/en/
[issues]: https://github.com/Pokebag/api/issues/
[new-issue]: https://github.com/Pokebag/api/issues/new/choose/
