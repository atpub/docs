---
title: me.atpub.identity.claim
---

```typescript
interface IdentityClaim {
  $type: 'pub.atp.identity.claim';
  platform: string;        // Target platform (dns, nostr, discord, etc.)
  identifier: string;      // Account identifier (domain, username, pubkey)
  createdAt: string;
  
  // Optional
  claimData?: object;      // Additional claim information (public keys, metadata, etc.)
  proofs?: {               // Array of verification proofs
    method: string;        // Verification method (dns-txt, bio-link, signature)
    proofData?: object;    // Platform-specific proof information
    expiresAt?: string;    // Optional expiration
  }[],
  signature?: {            // Cryptographic signature
    key: string;
    value: string;
  },
  updatedAt?: string;
}
```