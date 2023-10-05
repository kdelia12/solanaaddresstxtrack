const { Connection, PublicKey } = require("@solana/web3.js");
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Client, Embed, TextChannel } from 'discord.js'
const { EmbedBuilder } = require('discord.js');
const BigNumber = require('bignumber.js');
// Replace these values with your actual environment variables
const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1131549535525683230';
const WSS_ENDPOINT = 'wss://special-indulgent-glitter.solana-mainnet.discover.quiknode.pro/69bd625c3fae8d09c87a2a78b8ff325b76806837/';
const HTTP_ENDPOINT = 'https://special-indulgent-glitter.solana-mainnet.discover.quiknode.pro/69bd625c3fae8d09c87a2a78b8ff325b76806837/';
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
    await sleep(30000);
    const parsedTransaction = await solana.getTransaction(txSignature);
    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink = "https://solscan.io/tx/" + txSignature;

    tokenaddress = parsedTransaction.transaction.message.accountKeys[4] || "11111111111111111111111111111111";
    if (tokenaddress === "11111111111111111111111111111111") {
      jumlah = parseFloat(new BigNumber(parseFloat(parsedTransaction.meta.postTokenBalances[1])).minus(parseFloat(parsedTransaction.meta.preTokenBalances[1])).dividedBy(1000000000).toFixed(3));
    }
    console.log(parsedTransaction.meta.postTokenBalances[1])

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
  let sendreceive = "";
  let jumlahs = "";
  let address = "";
  let link="";
  let click="";
  let color="";
  console.log(issending);
  if (issending) {
    jumlahs = ""+jumlah+" SOL";
    final = "Mengirim " + jumlah + " SOL ke " + receiver + "tx link : " + solscanlink;
    sendreceive = "<a:owo:918748809725616168> ! ! SENDING ! ! <a:owo:918748809725616168>"
    address = "**"+receiver+"**";
    link = ""+solscanlink;
    click = "[Click Here]("+solscanlink+")";
    color = "#FF0000";
  } else {
    final = "Menerima " + jumlah + " SOL dari " + sender + "tx link : " + solscanlink;
    sendreceive = "<a:pepe_rich:1087066383914905763> ! ! RECEIVED ! ! <a:pepe_rich:1087066383914905763>"
    address = sender;
    jumlahs = ""+jumlah+" SOL";
    address = "**"+sender+"**";
    link = ""+solscanlink;
    click = "[Click Here]("+solscanlink+")";
    color = "#87FF52"
  }
  const embed = new EmbedBuilder()
  .setColor(color)
  .setTitle(sendreceive)
  .addFields(
    {name: "Amount :", value: jumlahs},
    {name: "From/To :", value: address},
    {name: "Link :", value: link},
    {name: "Directlink", value:click}
  )
  return embed;
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
    await sleep(20000);
    const parsedTransaction = await solana.getTransaction(txSignature);

    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink = "https://solscan.io/tx/" + txSignature;

    tokenaddress = parsedTransaction.transaction.message.accountKeys[4];
    if (tokenaddress === "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB") {
      jumlah = parseFloat(new BigNumber(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount).minus(parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.amount).dividedBy(1000000).toFixed(3));
      
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
  let sendreceive = "";
  let jumlahs = "";
  let address = "";
  let link="";
  let click="";
  console.log(issending);
  if (issending) {
    jumlahs = ""+jumlah+" USDT";
    final = "Mengirim " + jumlah + " USDT ke " + receiver + "tx link : " + solscanlink;
    sendreceive = "<a:owo:918748809725616168> ! ! SENDING ! ! <a:owo:918748809725616168>"
    address = "**"+receiver+"**";
    link = ""+solscanlink;
    click = "[Click Here]("+solscanlink+")";
  } else {
    final = "Menerima " + jumlah + " USDT dari " + sender + "tx link : " + solscanlink;
    sendreceive = "<a:pepe_rich:1087066383914905763> ! ! RECEIVED ! ! <a:pepe_rich:1087066383914905763>"
    address = sender;
    jumlahs = ""+jumlah+" USDT";
    address = "**"+sender+"**";
    link = ""+solscanlink;
    click = "[Click Here]("+solscanlink+")";
  }
  const embed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(sendreceive)
  .addFields(
    {name: "Amount :", value: jumlahs},
    {name: "From/To :", value: address},
    {name: "Link :", value: link},
    {name: "Directlink", value: click} 
  )
  return embed;
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
    await sleep(30000);
    const parsedTransaction = await solana.getTransaction(txSignature);

    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink = "https://solscan.io/tx/" + txSignature;

    tokenaddress = parsedTransaction.transaction.message.accountKeys[4];
    jumlah = parseFloat(new BigNumber(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount).minus(parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.amount).dividedBy(1000000).toFixed(2));

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
  let sendreceive = "";
  let jumlahs = "";
  let address = "";
  let link="";
  let click="";
  console.log(issending);
  if (issending) {
    jumlahs = ""+jumlah+" USDT";
    final = "Mengirim " + jumlah + " USDT ke " + receiver + "tx link : " + solscanlink;
    sendreceive = "<a:owo:918748809725616168> ! ! SENDING ! ! <a:owo:918748809725616168>"
    address = "**"+receiver+"**";
    link = ""+solscanlink;
    click = "[Click Here]("+solscanlink+")";
  } else {
    final = "Menerima " + jumlah + " USDC dari " + sender + "tx link : " + solscanlink;
    sendreceive = "<a:pepe_rich:1087066383914905763> ! ! RECEIVED ! ! <a:pepe_rich:1087066383914905763>"
    address = sender;
    jumlahs = ""+jumlah+" USDC";
    address = "**"+sender+"**";
    link = ""+solscanlink;
    click = "[Click Here]("+solscanlink+")";
  }
  const embed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(sendreceive)
  .addFields(
    {name: "Amount :", value: jumlahs},
    {name: "From/To :", value: address},
    {name: "Link :", value: link},
    {name: "Directlink", value: click},
  )
  return embed;
};

const sendMessageToDiscordChannel = async (message: Embed) => {
  try {
    await client.login(TOKEN);
    const channel = await client.channels.fetch(CHANNEL_ID) as TextChannel;
    await channel.send({ embeds: [message] });
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
