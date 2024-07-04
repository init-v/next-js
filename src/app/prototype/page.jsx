"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { DevnetAlert } from "@/components/devnet-alert";
// ##################################################################################
import { useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../../../utils/anchor-client';



export function Subscribe() {
  const wallet = useWallet();
  const [subscriptionPubkey, setSubscriptionPubkey] = useState(null);
  async function handleSubscribe() {
    if (!wallet.connected) return;
    
    const connection = new anchor.web3.Connection('https://api.devnet.solana.com');
    const program = getProgram(connection, wallet);

    const subscription = anchor.web3.Keypair.generate();

    try {
      await program.methods.initialize()
        .accounts({
          subscription: subscription.publicKey,
          subscriber: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([subscription])
        .rpc();

      setSubscriptionPubkey(subscription.publicKey);
      await program.methods.pay()
      .accounts({
        subscription: subscription.publicKey,
        subscriber: wallet.publicKey,
        creator: 'Dng8T7j5bkQVnShovS3UeP98W7bKirro5CesqyzemT9P',
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Subscribed and paid!");
  } catch (error) {
    console.error("Error:", error);
  }
}
return (
  
  <div className="space-x-4">
            <button onClick={handleSubscribe} className={cn(buttonVariants({ size: "lg" }))}>
              Connect Wallet
            </button>
    <h1>Subscribe to Creator</h1>
    <button onClick={handleSubscribe}>Subscribe</button>
    {subscriptionPubkey && <p>Subscribed! ID: {subscriptionPubkey.toString()}</p>}
  </div>
);
};




      // ################################################################


export default function Pages() {
  const wallet = useWallet();
  const [subscriptionPubkey, setSubscriptionPubkey] = useState(null);
  const apiPath = "/api/actions/memo";
  const [apiEndpoint, setApiEndpoint] = useState("");

  useEffect(() => {
    setApiEndpoint(new URL(apiPath, window.location.href).toString());

    return () => {
      setApiEndpoint(new URL(apiPath, window.location.href).toString());
    };
  }, []);

  async function handleSubscribe() {
    console.log("wallet connection statys:", wallet.connected);
    if (!wallet.connected) {
      alert('Please connect your wallet first.');
      return;
    }
    
    const connection = new anchor.web3.Connection('https://api.devnet.solana.com');
    const program = getProgram(connection, wallet);

    const subscription = anchor.web3.Keypair.generate();

    try {
      await program.methods.initialize()
        .accounts({
          subscription: subscription.publicKey,
          subscriber: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([subscription])
        .rpc();

      setSubscriptionPubkey(subscription.publicKey);
      await program.methods.pay()
      .accounts({
        subscription: subscription.publicKey,
        subscriber: wallet.publicKey,
        creator: new anchor.web3.PublicKey('Dng8T7j5bkQVnShovS3UeP98W7bKirro5CesqyzemT9P'),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

      console.log("Subscribed and paid!");
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <section
      id="action"
      className={
        "container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      }
    >
      <DevnetAlert />

      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Subscribe
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          The following example demonstrates how to subscribe to a creator
          on-chain. You can check the resulting transaction on the Solana Explorer.
        </p>
      </div>

      <Card className="group-hover:border-primary max-w-[80vw] md:max-w-[400px] aspect-square rounded overflow-clip text-center flex items-center justify-center mx-auto">
        <p>photo</p>
        {/* Uncomment and adjust if needed
        <SolanaQRCode
          url={apiPath}
          color="white"
          background="black"
          size={400}
          className="rounded-lg aspect-square [&>svg]:scale-75 md:[&>svg]:scale-100"
        /> */}
      </Card>

      <div className="mx-auto text-center md:max-w-[58rem]">
        <button onClick={handleSubscribe} className={cn(buttonVariants({ size: "lg" }))}>
          Subscribe for 1 SOL
        </button>
        {subscriptionPubkey && <p>Subscribed! ID: {subscriptionPubkey.toString()}</p>}
      </div>

      <Card className="group-hover:border-primary">
        <CardHeader>
          <CardTitle className="space-y-3">Action Endpoint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            <Link
              href={apiEndpoint}
              target="_blank"
              className="underline hover:text-primary"
            >
              {apiEndpoint}
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}




// // pages/prototype.tsx
// const PrototypePage = () => {
//     return (
//       <div>
//         <h1>Prototype</h1>
//         <p>This is the prototype page.</p>

//         <section>
//           <h2>Creator</h2>
//         </section>
//       </div>     
//     );
//   };
  
//   export default PrototypePage;
  