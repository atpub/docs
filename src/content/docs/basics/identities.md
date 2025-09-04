---
title: Identities
---

An identity in ATPub represents a cryptographically verifiable link between an AT Protocol Decentralized Identifier (DID) and an external account or resource. These links, referred to as **claims**, are stored as records within a user's Personal Data Server (PDS). This architecture ensures that users retain full ownership and control over their identity verification data, establishing a decentralized alternative to centralized identity providers.

This model allows a user's DID to serve as a root of trust for asserting control over various digital assets and profiles.

```
did:plc:[...] (AT Protocol DID)
    ├── DNS:       example.com
    ├── GitHub:    @username
    ├── Nostr:     npub1k23nutfrj...
    └── Ethereum:  0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
```

-----

## The Identity Claim Record

The fundamental component of the system is the **identity claim**. This is a structured data record of type [`me.atpub.identity.claim`](/lexicons/identity-claim/) that asserts ownership of an external identifier.

### Claim Structure

A claim record consists of three primary fields:

  * `$type`: The AT Protocol record type, fixed to [`me.atpub.identity.claim`](/lexicons/identity-claim/).
  * `service`: A string identifying the external service or protocol (e.g., `github`, `dns`, `nostr`).
  * `identifier`: The specific identifier on the target service, such as a username, domain name, or public key.

Below is an example of an **unverified claim**, which is a public assertion without an associated proof.

```json
{
  "$type": "me.atpub.identity.claim",
  "service": "github",
  "identifier": "octocat",
  "createdAt": "2025-09-04T00:00:00Z"
}
```

-----

## Verification Through Proofs

To make a claim verifiable, a `proofs` array is added to the record. A **proof** contains the necessary information for a client application to independently validate the user's control over the external identifier. The `method` field within a proof object specifies the verification procedure to be used.

### Example 1: DNS Domain Verification

This proof instructs a client to verify a `TXT` record associated with the `example.org` domain. The validation logic would involve querying the domain's DNS records and confirming the presence of a record containing the user's DID.

```json
{
  "$type": "me.atpub.identity.claim",
  "service": "dns",
  "identifier": "example.org",
  "createdAt": "2025-09-04T00:00:00Z",
  "proofs": [
    {
      "method": "txt"
    }
  ]
}
```

### Example 2: Nostr Cryptographic Verification

This proof utilizes a signed Nostr note, referenced by an `nevent` code. A client can validate this by fetching the note, verifying its cryptographic signature against the `identifier` (the Nostr public key), and ensuring the note's content includes the user's DID.

```json
{
  "$type": "me.atpub.identity.claim",
  "service": "nostr",
  "identifier": "npub1k23nutfrjhts...",
  "createdAt": "2025-09-04T00:00:00Z",
  "proofs": [
    {
      "method": "note",
      "nevent": "nevent1qvzqqqqqqypzpv4r8..."
    }
  ]
}
```

-----

## The Decentralized Verification Process

The verification workflow in ATPub is designed to operate without a central authority and involves three distinct steps.

1.  **Claim and Prove (User):** The user first creates and stores a `me.atpub.identity.claim` record in their PDS. Subsequently, the user establishes a public backlink to their DID on the target service (e.g., in a profile bio, a DNS TXT record, or a signed cryptographic message).

2.  **Fetch and Check (Client Application):** A third-party application initiates verification by fetching the claim from the user's PDS and then checking the proof at the external service.

3.  **Compare and Trust (Client Application):** The application compares the data retrieved from the external service with the information in the claim. If the proof is validated, the application can consider the identity verified. Each application is responsible for implementing its own trust model.

The diagram below illustrates the verification flow from the perspective of a client application:

```
  Client App (Verifier)             User's PDS              External Service (e.g., GitHub)
         |                              |                               |
         |  1. Request identity claims  |                               |
         |----------------------------->|                               |
         |                              |                               |
         |  2. Respond with claims     |                               |
         |<-----------------------------|                               |
         |                              |                               |
         |  3. Parse proof & identify   |                               |
         |     external service         |                               |
         |                              |                               |
         |                              |  4. Request public data       |
         |                              |     (e.g., profile bio)       |
         |------------------------------------------------------------->|
         |                              |                               |
         |                              |  5. Respond with public data  |
         |                              |     (containing user's DID)   |
         |<-------------------------------------------------------------|
         |                              |                               |
         |  6. Compare DID from claim   |                               |
         |     with data from service.  |                               |
         |     If they match:           |                               |
         |                              |                               |
         o-----> Identity Verified      |                               |

```