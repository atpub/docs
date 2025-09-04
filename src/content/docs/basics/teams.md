---
title: Teams
---

Teams in ATPub provide a decentralized mechanism for establishing verifiable affiliations between AT Protocol accounts. An account, identified by its DID, can represent either an individual or an organization (a "team"). This system allows users to claim membership in a team and for teams to claim members, with the affiliation becoming verified only when the assertion is mutual.

-----

## The Principle of Mutual Assertion

Verified team membership is established through a bilateral agreement. These claims are standard AT Protocol records, meaning each is created by and stored in the repository of the asserting account (either the user or the team).

Verification requires two claims to exist:

1.  A user must claim they are a member of a team.
2.  The team must claim that user as a member.

When both claims are present, a client application can display the affiliation as verified.

-----

## Team Record Types

The mutual assertion is achieved using two distinct lexicon types. A "team" is any AT Protocol account that represents a group or organization.

### The Member's Claim

A user declares their affiliation with a team by creating a [`me.atpub.team.member`](https://www.google.com/search?q=/lexicons/me.atpub.team.member) record.

  * **Purpose:** A user asserts, "I am a member of this team."
  * **Structure:**
      * `team`: The DID of the team account.

<!-- end list -->

```json
{
  "$type": "me.atpub.team.member",
  "team": "did:plc:team_did_goes_here",
  "createdAt": "2025-09-04T00:40:00Z"
}
```

### The Team's Claim

A team acknowledges a user as a member by creating a [`me.atpub.team.membership`](https://www.google.com/search?q=/lexicons/me.atpub.team.membership) record.

  * **Purpose:** A team asserts, "This user is a member of our team."
  * **Structure:**
      * `member`: The DID of the user.

<!-- end list -->

```json
{
  "$type": "me.atpub.team.membership",
  "member": "did:plc:user_did_goes_here",
  "createdAt": "2025-09-04T00:45:00Z"
}
```

-----

## The Verification Process

Client applications verify an affiliation by fetching records from both the user and the team.

1.  The client fetches `me.atpub.team.member` records from the user's account.
2.  For each record found, the client extracts the team's DID.
3.  The client then queries the team's account for a corresponding `me.atpub.team.membership` record that points back to the user.
4.  If a corresponding record is found, the affiliation is considered verified.

The diagram below illustrates this data flow:

```
 Client Application                 User's PDS                   Team's PDS
        |                               |                            |
        | 1. Request member claims      |                            |
        |------------------------------>|                            |
        |                               |                            |
        | 2. Respond with member claim  |                            |
        |    (contains team DID)        |                            |
        |<------------------------------|                            |
        |                               |                            |
        | 3. Parse team DID & request   |                            |
        |    corresponding membership   |                            |
        |    claim from Team's PDS      |                            |
        |----------------------------------------------------------->|
        |                               |                            |
        |                               | 4. Respond with matching   |
        |                               |    membership claim        |
        |<-----------------------------------------------------------|
        |                               |                            |
        | 5. Confirm mutual claims      |                            |
        |    exist.                     |                            |
        |                               |                            |
        o-----> Affiliation Verified    |                            |
```