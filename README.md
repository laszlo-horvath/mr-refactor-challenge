# MomentRanks Interview

## Intro

Welcome to MR interview challenge! 🚀

We want to ask you to complete two tasks:

1. Refactor existing codebase.
2. Implement a new feature.

Find below more details about each part.

At any stage, especially before you start coding, feel free to ask us any questions.

## Refactor challenge

In the repo you'll find simple app called "NFT Floor Sweep Estimator". Your goal is to improve its code quality and ensure it works without any errors.

### What you should do?

- Improve general code structure & readability
- Extract some functions or components if needed
- Utilize TypeScript better
- Slightly improve the UI/UX
- Implement form validation & error handling

### What not to do?

- Add any new functionalities during refactor
- Rebuild completely the design
- Modify the data returned by API
- Remove Next.js or replace it with different React framework
- Remove Tailwind or replace it with different CSS framework

Files you can ignore, that don't need / require any changes:

- pages/api/nfts.ts (it will be used in the next part of the challenge)
- ./vscode/extensions.json
- .eslintrc.json
- .gitignore
- .prettierrc
- next-env.d.ts
- next.config.js
- postcss.config.js
- README.md
- tailwind.config.js
- tsconfig.json
- public/

### Hints

- Don't forget to check `package.json` file
- HTML code can also be improved
- CSS modules are nice, but do they help here?

## New Feature implementation

Your code after refactor looks much better - good job! 💯

Now it's time to add a new feature to the existing app.

Please implement the user story below:

> - As a user, I want to see four cheapest NFTs from the collection I want to sweep floor for.
> - For each NFT I want to see its name, image and current price in ETH

### Details

- To get the data for collection please use existing `/api/nfts` endpoint.
  It takes collection's name as a `collection` query parameter.
- Please implement simple, but neat UI to display NFTs below "Calculation result" section.
- Please create a separate component(s), so they can be reused in the future.
- You can add extra functionality if you're feeling up to it -- can use mock data, interact with the blockchain, or just make a cool design -- anything you'd like.

Good luck!

## Additional info

### Technologies used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [Typescript](https://www.typescriptlang.org/)

### Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
