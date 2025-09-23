
### Dev notes 

### 1. npm modules
## Install:
At current directory; sidenote: use tailwind v4
```bash
npm install

npm install next@latest react@latest react-dom@latest
npm install tailwindcss @tailwindcss/postcss postcss

```

### 2. Tailwind in tsconfig
```bash

postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```
### 3. Run Node
global.css:

```bash
@import "tailwindcss";
```
Deployment
bash```
npm run build && npm start
```
bash```
Development
npm run dev
```

bash```
Next,js branch overwrite:
git push --force-with-lease origin nextJS

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (Optional and on-development)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

This project may use [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

