const { Connection, PublicKey } = require("@solana/web3.js");
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Client, TextChannel } from 'discord.js'

// Replace these values with your actual environment variables
const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1131549535525683230';
const WSS_ENDPOINT = 'wss://rpc.ankr.com/solana/ws/ec5d708928c04ed05d30dcc3f5d3227a68fd5b3bdb7c3471034c646416f7d519';
const HTTP_ENDPOINT = 'https://rpc.ankr.com/solana/ec5d708928c04ed05d30dcc3f5d3227a68fd5b3bdb7c3471034c646416f7d519';
const SOL_ADDRESS = process.env.SOL_ADDRESS;
const USDT_ADDRESS = process.env.USDT_ACCOUNT;
const USDC_ADDRESS = process.env.USDC_ACCOUNT;

const sleep = (ms: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
};

const subscribeToLogsAndProcessSol = async () => {
  const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });
  const ACCOUNT_TO_WATCH = new PublicKey(SOL_ADDRESS);

  solanaConnection.onLogs(ACCOUNT_TO_WATCH, async (logs: any, ctx: any) => {
    console.log(logs);
    const txSignature = logs.signature;

    if (txSignature) {
      const final = await fetchAndParseTransactionsol(txSignature);
      console.log(final);
      sendMessageToDiscordChannel(final);
    } else {
      console.log('No valid txSignature available.');
    }
  }, 'confirmed');
};

const subscribeToLogsAndProcessUsdt = async () => {
  const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });
  const ACCOUNT_TO_WATCH = new PublicKey(USDT_ADDRESS);

  solanaConnection.onLogs(ACCOUNT_TO_WATCH, async (logs: any, ctx: any) => {
    console.log(logs);
    const txSignature = logs.signature;

    if (txSignature) {
      const final = await fetchAndParseTransactionusdt(txSignature);
      console.log(final);
      sendMessageToDiscordChannel(final);
    } else {
      console.log('No valid txSignature available.');
    }
  }, 'confirmed');
};

const subscribeToLogsAndProcessUsdc = async () => {
  const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });
  const ACCOUNT_TO_WATCH = new PublicKey(USDC_ADDRESS);

  solanaConnection.onLogs(ACCOUNT_TO_WATCH, async (logs: any, ctx: any) => {
    console.log(logs);
    const txSignature = logs.signature;

    if (txSignature) {
      const final = await fetchAndParseTransactionusdc(txSignature);
      console.log(final);
      sendMessageToDiscordChannel(final);
    } else {
      console.log('No valid txSignature available.');
    }
  }, 'confirmed');
};

const fetchAndParseTransactionsol = async (txSignature: string) => {
  const web3 = require("@solana/web3.js");
  const solana = new web3.Connection(HTTP_ENDPOINT);
  let jumlah = 0;
  let solscanlink = "";
  let issending = false;
  let sender = "";
  let receiver = "";
  let tokenaddress = "";
  let tokensymbol = "SOL"; // Since it's SOL token

  try {
    console.log(txSignature);
    await sleep(15000);
    const parsedTransaction = await solana.getTransaction(txSignature);
    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink = "https://solscan.io/tx/" + txSignature;

    tokenaddress = parsedTransaction.transaction.message.accountKeys[4] || "11111111111111111111111111111111";
    if (tokenaddress === "11111111111111111111111111111111") {
      jumlah = parseFloat((Math.abs(parsedTransaction.meta.postBalances[0] - parsedTransaction.meta.preBalances[0]) / 1000000000).toFixed(2));
    }

    console.log(tokenaddress);
    if (sender == SOL_ADDRESS) {
      console.log("Mengirim " + jumlah + tokensymbol + " ke " + receiver + "tx link : " + solscanlink)
      issending = true;
    } else if (receiver == SOL_ADDRESS) {
      console.log("Menerima " + jumlah + tokensymbol + " dari " + sender + "tx link : " + solscanlink)
    }

  } catch (error) {
    console.error("Failed to fetch and parse the SOL transaction:", error);
  }

  let final = "";
  console.log(issending);
  if (issending) {
    final = "Mengirim " + jumlah + " SOL ke " + receiver + " tx link : " + solscanlink;
  } else {
    console.log(sender);
    console.log(issending);
    console.log(SOL_ADDRESS);
    final = "Menerima " + jumlah + " SOL dari " + sender + " tx link : " + solscanlink;
  }
  return final;
};

const fetchAndParseTransactionusdt = async (txSignature: string) => {
  const web3 = require("@solana/web3.js");
  const solana = new web3.Connection(HTTP_ENDPOINT);
  let jumlah = 0;
  let solscanlink = "";
  let issending = false;
  let sender = "";
  let receiver = "";
  let tokenaddress = "";
  let tokensymbol = "USDT"; // Since it's USDT token

  try {
    console.log(txSignature);
    await sleep(15000);
    const parsedTransaction = await solana.getTransaction(txSignature);

    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink = "https://solscan.io/tx/" + txSignature;

    tokenaddress = parsedTransaction.transaction.message.accountKeys[4];
    if (tokenaddress === "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB") {
      jumlah = parseFloat((Math.abs(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount - parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.amount) / 1000000).toFixed(2));
    }

    console.log(tokenaddress);
    if (sender == SOL_ADDRESS) {
      console.log("Mengirim " + jumlah + tokensymbol + " ke " + receiver + "tx link : " + solscanlink)
      issending = true;
    } else if (receiver == SOL_ADDRESS) {
      console.log("Menerima " + jumlah + tokensymbol + " dari " + sender + "tx link : " + solscanlink)
    }

  } catch (error) {
    console.error("Failed to fetch and parse the USDT transaction:", error);
  }

  let final = "";
  console.log(issending);
  if (issending) {
    final = "Mengirim " + jumlah + " USDT ke " + receiver + "tx link : " + solscanlink;
  } else {
    final = "Menerima " + jumlah + " USDT dari " + sender + "tx link : " + solscanlink;
  }
  return final;
};

const fetchAndParseTransactionusdc = async (txSignature: string) => {
  const web3 = require("@solana/web3.js");
  const solana = new web3.Connection(HTTP_ENDPOINT);
  let jumlah = 0;
  let solscanlink = "";
  let issending = false;
  let sender = "";
  let receiver = "";
  let tokenaddress = "";
  let tokensymbol = "USDC"; // Since it's USDC token

  try {
    console.log(txSignature);
    await sleep(15000);
    const parsedTransaction = await solana.getTransaction(txSignature);

    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink = "https://solscan.io/tx/" + txSignature;

    tokenaddress = parsedTransaction.transaction.message.accountKeys[4];
    jumlah = parseFloat((Math.abs(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount - parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.amount) / 1000000).toFixed(2));

    console.log(tokenaddress);
    console.log(sender);
    if (sender == SOL_ADDRESS) {
      console.log("Mengirim " + jumlah + tokensymbol + " ke " + receiver + "tx link : " + solscanlink)
      issending = true;
    } else if (receiver == SOL_ADDRESS) {
      console.log("Menerima " + jumlah + tokensymbol + " dari " + sender + "tx link : " + solscanlink)
    }

  } catch (error) {
    console.error("Failed to fetch and parse the USDC transaction:", error);
  }

  let final = "";
  console.log(issending);
  if (issending) {
    final = "Mengirim " + jumlah + " USDC ke " + receiver + "tx link : " + solscanlink;
  } else {
    final = "Menerima " + jumlah + " USDC dari " + sender + "tx link : " + solscanlink;
  }
  return final;
};

const sendMessageToDiscordChannel = async (message: string) => {
  try {
    await client.login(TOKEN);
    const channel = await client.channels.fetch(CHANNEL_ID) as TextChannel;
    await channel.send(message);
  } catch (error) {
    console.error("Failed to send message to Discord channel:", error);
  }
};

// Discord client setup and login
const client = new Client({ intents: [] });

(async () => {
  try {
    await client.login(TOKEN);
    console.log("Logged in to Discord.");
  } catch (error) {
    console.error("Failed to log in to Discord:", error);
  }
})();

(async () => {
  // Subscribe to SOL logs and process transactions
  subscribeToLogsAndProcessSol();

  // Subscribe to USDT logs and process transactions
  subscribeToLogsAndProcessUsdt();

  // Subscribe to USDC logs and process transactions
  subscribeToLogsAndProcessUsdc();
})();
