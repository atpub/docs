---
title: Services
---

In ATPub, a **service** refers to any external platform, protocol, or system to which a user can link their AT Protocol DID. To ensure that client applications can consistently and reliably perform verification across a wide range of platforms, ATPub utilizes a centralized service definition file.

This public JSON file, available at [services.atpub.me](https://services.atpub.me/), acts as a directory, providing clients with the necessary metadata to understand how to verify claims for each supported service. This approach allows the ecosystem to expand with new services and verification methods without requiring changes to the core ATPub protocol itself.

-----

## The Service Definition Object

Each entry in the services JSON file is an object that describes a specific service. It contains all the information a client application needs to construct profile URLs and perform automated checks.

### Core Fields

* `name`: The human-readable name of the service (e.g., "Bluesky", "GitHub").
* `profileUrl`: A template URL for a user's profile on the service. It includes an `{identifier}` placeholder that a client replaces with the `identifier` from a user's claim record.
* `verificationMethods`: An object containing one or more supported methods for verifying a claim on that service.

### Example: Backloggd Service Definition

Below is the definition for the Backloggd service. It specifies a single verification method named `profile`.

```json
{
  "backloggd": {
    "name": "Backloggd",
    "profileUrl": "https://backloggd.com/u/{identifier}/",
    "verificationMethods": {
      "profile": {
        "type": "http",
        "url": "https://backloggd.com/u/{claim.identifier}/",
        "format": "html",
        "selector": "a.secondary-link"
      }
    }
  }
}