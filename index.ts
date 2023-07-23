const { Connection, PublicKey } = require("@solana/web3.js");
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import {Client, TextChannel} from 'discord.js'
const client = new Client({intents: []})
const TOKEN = process.env.DISCORD_TOKEN ; // Replace this with your Discord bot token
const CHANNEL_ID = '1131549535525683230';
const WSS_ENDPOINT = 'wss://withered-bitter-dew.solana-mainnet.discover.quiknode.pro/87ceb03aa79448b8146a0265762d49945bd854de/';
const HTTP_ENDPOINT = 'https://withered-bitter-dew.solana-mainnet.discover.quiknode.pro/87ceb03aa79448b8146a0265762d49945bd854de/';
const SOL_ADDRESS = process.env.SOL_ADDRESS;
const USDT_ADDRESS = process.env.USDT_ACCOUNT;
const USDC_ADDRESS = process.env.USDC_ACCOUNT;

const sleep = (ms: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
};

const subscribeToLogssol = async () => {
  const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });

  const ACCOUNT_TO_WATCH = new PublicKey(SOL_ADDRESS);
  let txSignaturesol: string | null = null; // Use 'string | null' to handle the case where txSignature is not available

  await new Promise<void>((resolve) => {
    solanaConnection.onLogs(ACCOUNT_TO_WATCH, (logs: any, ctx: any) => {
      console.log(logs);
      txSignaturesol = logs.signature;
      resolve(); // Resolve the promise after obtaining the txSignature
    }, 'confirmed');
  });

  await sleep(5000); // Wait for a few seconds to allow the subscription to execute and update txSignature

  // Logging the updated txSignature
  console.log(txSignaturesol);

  return txSignaturesol;
};

const subscribeToLogsusdt = async () => {
  const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });
  const ACCOUNT_TO_WATCH = new PublicKey(USDT_ADDRESS);
  let txSignatureusdt: string | null = null; // Use 'string | null' to handle the case where txSignature is not available

  await new Promise<void>((resolve) => {
    solanaConnection.onLogs(ACCOUNT_TO_WATCH, (logs: any, ctx: any) => {
      console.log(logs);
      txSignatureusdt = logs.signature;
      resolve(); // Resolve the promise after obtaining the txSignature
    }, 'confirmed');
  });

  await sleep(5000); // Wait for a few seconds to allow the subscription to execute and update txSignature

  // Logging the updated txSignature
  console.log(txSignatureusdt);

  return txSignatureusdt;
};

const subscribeToLogsusdc = async () => {
  const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });
  const ACCOUNT_TO_WATCH = new PublicKey(USDC_ADDRESS);
  let txSignatureusdc: string | null = null; // Use 'string | null' to handle the case where txSignature is not available

  await new Promise<void>((resolve) => {
    solanaConnection.onLogs(ACCOUNT_TO_WATCH, (logs: any, ctx: any) => {
      console.log(logs);
      txSignatureusdc = logs.signature;
      resolve(); // Resolve the promise after obtaining the txSignature
    }, 'confirmed');
  });

  await sleep(5000); // Wait for a few seconds to allow the subscription to execute and update txSignature

  // Logging the updated txSignature
  console.log(txSignatureusdc);

  return txSignatureusdc;
};


const fetchAndParseTransactionsol = async (txSignature: string) => {
  const web3 = require("@solana/web3.js");
  const solana = new web3.Connection("https://withered-bitter-dew.solana-mainnet.discover.quiknode.pro/87ceb03aa79448b8146a0265762d49945bd854de/");
  let jumlah = 0;
  let solscanlink = "";
  let issending = false;
  let sender = "";
  let receiver = "";
  let tokenaddress = "";
  let tokensymbol = "";
  try {
    console.log (txSignature)
    await sleep(10000);
    const parsedTransaction = await solana.getTransaction(txSignature);
    // const issending = parsedTransaction.meta.message;
    // console.log(issending);
    // const balancemoved = parsedTransaction.meta.postBalances[0] - parsedTransaction.meta.preBalances[0];
    // console.log(balancemoved);
    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink =  "https://solscan.io/tx/" + txSignature;
    // jumlah adalah nilai mutlak dari balancemoved
    // console.log(sender);
    // console.log(parsedTransaction);
    tokenaddress = parsedTransaction.transaction.message.accountKeys[4] || "11111111111111111111111111111111";
    if (tokenaddress == "11111111111111111111111111111111"){
        tokensymbol = "SOL";
        jumlah = parseFloat((Math.abs(parsedTransaction.meta.postBalances[0] - parsedTransaction.meta.preBalances[0]) / 1000000000).toFixed(2));
    }
    console.log(tokenaddress);
    if (sender == SOL_ADDRESS) {
        console.log("Mengirim " + jumlah + tokensymbol +" ke " + receiver + "tx link : " + solscanlink)
        issending = true;
    }
    else if (receiver == SOL_ADDRESS) {
        console.log("Menerima " + jumlah + tokensymbol + "dari " + sender + "tx link : " + solscanlink)
    }
    // console.log ("pengirim : " + sender)
    // console.log("jumlah : " + jumlah)
  } catch (error) {
    console.error("Failed to fetch and parse the transaction:", error);
  }
  let final = "";
  console.log(issending);
  if (issending === true) {
    final = "Mengirim " + jumlah +  "SOL ke " + receiver + "tx link : " + solscanlink;
  }
    else {
        final = "Menerima " + jumlah + " SOL dari " + sender + "tx link : " + solscanlink;
    }
  return final
};

const fetchAndParseTransactionusdt = async (txSignature: string) => {
  const web3 = require("@solana/web3.js");
  const solana = new web3.Connection("https://withered-bitter-dew.solana-mainnet.discover.quiknode.pro/87ceb03aa79448b8146a0265762d49945bd854de/");
  let jumlah = 0;
  let solscanlink = "";
  let issending = false;
  let sender = "";
  let receiver = "";
  let tokenaddress = "";
  let tokensymbol = "";
  try {
    console.log (txSignature)
    await sleep(10000);
    const parsedTransaction = await solana.getTransaction(txSignature);
    // const issending = parsedTransaction.meta.message;
    // console.log(issending);
    // const balancemoved = parsedTransaction.meta.postBalances[0] - parsedTransaction.meta.preBalances[0];
    // console.log(balancemoved);
    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink =  "https://solscan.io/tx/" + txSignature;
    // jumlah adalah nilai mutlak dari balancemoved
    // console.log(sender);
    // console.log(parsedTransaction);
    console.log(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount);
    tokenaddress = parsedTransaction.transaction.message.accountKeys[4];
    if (tokenaddress == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"){
        tokensymbol = "USDT";
        jumlah = parseFloat((Math.abs(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount - parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.amount) / 1000000).toFixed(2));
    }
    console.log(tokenaddress);
    if (sender == SOL_ADDRESS) {
        console.log("Mengirim " + jumlah + tokensymbol +" ke " + receiver + "tx link : " + solscanlink)
        issending = true;
    }
    else if (receiver == SOL_ADDRESS) {
        console.log("Menerima " + jumlah + tokensymbol + "dari " + sender + "tx link : " + solscanlink)
    }
    // console.log ("pengirim : " + sender)
    // console.log("jumlah : " + jumlah)
  } catch (error) {
    console.error("Failed to fetch and parse the transaction:", error);
  }
  let final = "";
  console.log(issending);
  if (issending === true) {
    final = "Mengirim " + jumlah +  " USDT ke " + receiver + "tx link : " + solscanlink;
  }
    else {
        final = "Menerima " + jumlah + " USDT dari " + sender + "tx link : " + solscanlink;
    }
  return final
};

const fetchAndParseTransactionusdc = async (txSignature: string) => {
  const web3 = require("@solana/web3.js");
  const solana = new web3.Connection("https://withered-bitter-dew.solana-mainnet.discover.quiknode.pro/87ceb03aa79448b8146a0265762d49945bd854de/");
  let jumlah = 0;
  let solscanlink = "";
  let issending = false;
  let sender = "";
  let receiver = "";
  let tokenaddress = "";
  let tokensymbol = "";
  try {
    console.log (txSignature)
    await sleep(10000);
    const parsedTransaction = await solana.getTransaction(txSignature);
    // const issending = parsedTransaction.meta.message;
    // console.log(issending);
    // const balancemoved = parsedTransaction.meta.postBalances[0] - parsedTransaction.meta.preBalances[0];
    // console.log(balancemoved);
    sender = parsedTransaction.transaction.message.accountKeys[0];
    receiver = parsedTransaction.transaction.message.accountKeys[1];
    solscanlink =  "https://solscan.io/tx/" + txSignature;
    // jumlah adalah nilai mutlak dari balancemoved
    // console.log(sender);
    // console.log(parsedTransaction);
    console.log(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount);
    tokenaddress = parsedTransaction.transaction.message.accountKeys[4];
    jumlah = parseFloat((Math.abs(parsedTransaction.meta.postTokenBalances[0].uiTokenAmount.amount - parsedTransaction.meta.preTokenBalances[0].uiTokenAmount.amount) / 1000000).toFixed(2));
    console.log(jumlah);
    console.log(tokenaddress);
    if (sender == SOL_ADDRESS) {
        console.log("Mengirim " + jumlah + tokensymbol +" ke " + receiver + "tx link : " + solscanlink)
        issending = true;
    }
    else if (receiver == SOL_ADDRESS) {
        console.log("Menerima " + jumlah + tokensymbol + "dari " + sender + "tx link : " + solscanlink)
    }
    // console.log ("pengirim : " + sender)
    // console.log("jumlah : " + jumlah)
  } catch (error) {
    console.error("Failed to fetch and parse the transaction:", error);
  }
  let final = "";
  console.log(issending);
  if (issending === true) {
    final = "Mengirim " + jumlah +  " USDC ke " + receiver + "tx link : " + solscanlink;
  }
    else {
        final = "Menerima " + jumlah + " USDC dari " + sender + "tx link : " + solscanlink;
    }
  return final
};


// Function to send the message to the Discord channel
const sendMessageToDiscordChannel = async (message: string) => {
  try {
    await client.login(TOKEN)
    const channel = await client.channels.fetch(CHANNEL_ID) as TextChannel;
    await channel.send(message);
  }
  catch (error){
    console.error("Failed to send message to Discord channel:", error);
  }

};


(async () => {
  while (true) {
    const txSignaturesol = await subscribeToLogssol();
    if (txSignaturesol) {
      const final = await fetchAndParseTransactionsol(txSignaturesol);
      console.log(final);
      sendMessageToDiscordChannel(final);
    } else {
      console.log('No valid txSignature available.');
    }
  }
})();

(async () => {
  while (true) {
    const txSignatureusdt = await subscribeToLogsusdt();
    if (txSignatureusdt) {
      const final = await fetchAndParseTransactionusdt(txSignatureusdt);
      console.log(final);
      sendMessageToDiscordChannel(final);
    }
    else {
      console.log('No valid txSignature available.');
    }
  }
  }
)();

(async () => {
  while (true) {
    const txSignatureusdc = await subscribeToLogsusdc();
    if (txSignatureusdc) {
      const final = await fetchAndParseTransactionusdc(txSignatureusdc);
      console.log(final);
      sendMessageToDiscordChannel(final);
    }
    else {
      console.log('No valid txSignature available.');
    }
  }
  }
)();