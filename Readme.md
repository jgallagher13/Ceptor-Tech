# EthChiacgo 2023 Hackathon Template: Ceptor Club

## About 

This starter kit is created specifically for Ceptor Club Bounty for ETHChiacgo 2023 Hackathon. 

LFG Ceptor Club Hackers! 🚀🚀

## Getting Started 

1. Clone this directory

   `git clone https://github.com/ceptor-club/ETHChicago.git`

2. It will create two folders: `Backend` and `FrontEndV2`.


## 🧑‍💻 Let's Setup Frontend First 

1. Go to frontend folder

   `cd frontend`

2. Install dependencies

   `npm install`

3. Clone .env.example to .env

   `cp .env.example .env`

4. Setting up .env variables 

   - Setting up Network and Chain Id
      
     - `NEXT_PUBLIC_NETWORK=goerli`
     - `NEXT_PUBLIC_CHAIN_ID=5`

   - Setting up Alchemy API Key

     - Go to [Alchemy Dashboard](https://dashboard.alchemy.com/) and create an account(if you don't have one already)
     - Create a new project based on your `NEXT_PUBLIC_NETWORK` variable and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_ALCHEMY_KEY=https://eth-goerli.g.alchemy.com/v2/4nxF5nQMK20uGJinU_sample`

   - Setting up WALLETCONNECT_PROJECT_ID for wallet authentication -

     - Go to [WalletConnect Dashboard](https://cloud.walletconnect.com/app) and create an account(if you don't have one already)
     - Create a new project and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=f88d2c49_sample`
     
   - Setting up OPENAI_API_KEY for AI Image Generation

     - Go to [OpenAI Dashboard](https://platform.openai.com/account/api-keys) and create an account(if you don't have one already)
     - Create a new project and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_OPENAI_API_KEY=sk-<34f34qw_sample>`

   - Setting up NFT.storage api for storing images on IPFS

     - Go to [NFT.storage Dashboard](https://nft.storage/) and create an account(if you don't have one already)
     - Create a new project and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_NFT_STORAGE=eyJhbGciOiJIUzI1NiIsI_sample`

5. Run the frontend
   
      `npm run dev`

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and enjoy!

    `Need to setup backend now to see the full functionality of the frontend, if already setup then skip to step 7`

7. Check that the back-end API is functioning by uploading the fastcharacter.com sheet pdf and generating an image.


## 🖥️ Let's Setup Backend

1. Go to Backend folder

   `cd backend`

2. Install all the dependencies

   `npm install`

3. Clone .env.example to .env

   `cp .env.example .env`

4. Setting up .env variables
 
   - For ALCHEMY_API_KEY use the same key as in frontend
   - Setup API_KEY="testKey" for Socket io connections

5. Renable CORS object 

6. Run the backend

   `npm run dev`

--prompt generated by uploading a level 1 Zeed (the flying star bird-druid) PDF [See acceptablePDF/ folder in this repo for example](https://github.com/DnDnDiffusion/Front-end/tree/main/acceptablePDF).


> Imagine, creating a new D&D Character on fastcharacter.com (just a few clicks, lets go!), copy it into our website and BOOM! Having a custom AI generated avatar minted and saved into Dragons Mine for for your level 1 Dragonborn, all in under a minute! Download for free or save your character as NFT with a random secret/public mission. Are we having fun yet?


# Learn More 
## **🛠️ MongoDB Setup: Endpoints for user creation and lookup!**

Put `mongodb+srv://ceptorclub:dajfMXIwMzwM8ssI@ceptor.pgtoahq.mongodb.net/?retryWrites=true&w=majority` into mongodb compass and see the db

GET /user?wallet=<wallet0x> will give you the user
POST /user with

```
{
name: "blap",
email: "sldkfjh@klfj.com",
wallet: "0x12373fn...",
whatever: "else we want to save about users as we go (no, not images)"
}
```


## **🧑‍💻Frontend Setup**


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.jsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/getImage](http://localhost:3000/api/getImage). This endpoint can be edited in `pages/api/getImage.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Use the `utils/` folder to add general functions (such as generating prompts, or saving files to NFT.Storage)

## 🚀 Blockchain, Chainlink & IPFS References

- Our database of dragonborn heroes is maintained as NFTs in our smart contract, with a nice royalty for our treasury in there. - [@Cromewar put a](https://danj-o.notion.site/Just-regular-NFTs-7e555cc179684be58edf002b0f5b645d) sentence or two and a link here. -

- In the past, we used Chainlink in our Smart Contract to provide VRF randomness. [Link](https://goerli.etherscan.io/address/0xa41a00db6c90b969252b38580e36b5241c16de85) In the future we want to expand this random seed into unique image prompts, gameplay missions and DM/GM approved mission complete access control. [See Our Github Repo for mo'](https://github.com/DnDnDiffusion/scaffold-dnd)

- We used IPFS/NFT.Storage to provide decentralized, permanent and immutable storage for the image saved to NFT. [link to code in front end, line 42](https://github.com/DnDnDiffusion/Front-end/blob/0d8ea121eb9e9f05550a99e6ae4e6887642e5e1b/pages/index.jsx#L42) and more code at [util for NFT Storage](https://github.com/DnDnDiffusion/Front-end/blob/main/utils/web3utils.js).



## **🔗 Next.js**
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




### Let's Build! 🚀🚀