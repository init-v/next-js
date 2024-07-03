import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../utils/anchor-client';

export default function Subscribe() {
  const wallet = useWallet();
  const [subscriptionPubkey, setSubscriptionPubkey] = useState(null);

  async function handleSubscribe() {
    if (!wallet.connected) return;
    
    const connection = new anchor.web3.Connection(/* your RPC URL */);
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

      // Optionally, immediately call the pay function here
      await program.methods.pay()
        .accounts({
          subscription: subscription.publicKey,
          subscriber: wallet.publicKey,
          creator: /* creator's public key */,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Subscribed and paid!");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>Subscribe to Creator</h1>
      <button onClick={handleSubscribe}>Subscribe</button>
      {subscriptionPubkey && <p>Subscribed! ID: {subscriptionPubkey.toString()}</p>}
    </div>
  );
}