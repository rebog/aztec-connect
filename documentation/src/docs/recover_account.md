This method allows a user to recover their account to the trusted third party they selected during account creation. It is the responsibility of the third party to construct a new proof that returns the account control to a public key the user controls and revokes the third party access.

@spec sdk.ts recoverAccount

## Examples

### Recover account to a trusted third party.

```js
import { GrumpkinAddress } from '@aztec/sdk';
import { randomBytes } from 'crypto';

async function demoRecoveryData(aztecSdk) {
  // create a new user
  const privacyKey = randomBytes(32);
  const user = await aztecSdk.addUser(privacyKey);

  // create recovery data
  const trustedThirdParties = [GrumpkinAddress.randomAddress()];
  const [recoveryPayload] = await aztecSdk.generateAccountRecoveryData(user.id, trustedThirdParties);

  // create a new account
  const signingPublicKey = GrumpkinAddress.randomAddress();
  const alias = randomBytes(5).toString();
  console.info('Creating proof...');
  const txHash = await aztecSdk.createAccount(user.id, signingPublicKey, recoveryPayload.recoveryPublicKey, alias);
  console.info('Proof accepted by server. Tx hash:', txHash.toString('hex'));

  console.info('Waiting for tx to settle...');
  await aztecSdk.awaitSettlement(user.id, txHash);
  console.info('Account created!');

  // recover the account
  console.info('Creating proof...');
  const recoverTxHash = await aztecSdk.recoverAccount(user.id, recoveryPayload);
  console.info('Proof accepted by server. Tx hash:', recoverTxHash.toString('hex'));

  console.info('Waiting for tx to settle...');
  await aztecSdk.awaitSettlement(user.id, recoverTxHash);
  console.info('Account recovered!');

  // remove this demo user from your account
  await aztecSdk.removeUser(user.id);
}
```

## See Also

- **[Generate account recovery data](/#/User/generateAccountRecoveryData)**
- **[Create account](/#/User/createAccount)**