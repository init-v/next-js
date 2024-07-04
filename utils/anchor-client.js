import * as anchor from '@project-serum/anchor';
import idl from '../utils/idl (1).json';  // Import your IDL

const programId = new anchor.web3.PublicKey('29JwmCGU6vs2msChwdHuwHA1pufd592HptPgDj87WWCD');

export function getProgram(connection, wallet) {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  return new anchor.Program(idl, programId, provider);
}

// export default getProgram();