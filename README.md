# get-apex-domain

Returns the apex domain (aka base, bare, naked, root apex, or zone apex domain) of the current web page without the use of a public suffix list. The apex domain is also the top-most domain that allows for setting cookies.

## What's an apex domain?

An apex domain is the longest portion of a domain that does not contain a subdomain. In the case of `store.example.co.uk`, `example.co.uk` would be the apex domain.

When a website owner attempts to register a domain name, they cannot register a domain matching an effective top-level domain (e.g., `com`, `co.uk`) due to restrictions controlled by registrars. However, domains ending in an effective top-level domain are allowed (e.g., `example.com`, `example.co.uk`). This is the apex domain. The domain name owner can then create subdomains ending in the domain they registered (e.g., `store.example.com`, `store.example.co.uk`).

## Requirements

This will only work in a browser when cookies are enabled.

## How detection is accomplished

As it turns out, browsers allow websites to set cookies for apex domains (e.g., `example.co.uk`) but not top-level domains (e.g., `uk`) or effective top-level domains (e.g., `co.uk`).

Considering a hostname of `store.example.co.uk`, we can determine the apex domain by attempting to write a cookie on `uk`, then `co.uk`, then `example.co.uk`, then `store.example.co.uk`, until we succeed in writing a cookie. In this case, the first attempt that will succeed is `example.co.uk`. This is the apex domain.

## Installation

If you use npm for package management, you can install `get-etld` by running the following command from within your project's directory:

```
npm install --save-dev get-apex-domain
```

## Usage

```javascript
import getApexDomain from "get-apex-domain";

console.log(getApexDomain());
```

If cookies are not enabled, an error will be thrown.

The `localhost` hostname presents a unique case. If the hostname is `localhost`, the returned apex domain will be `undefined`.

## Special Recognition

Full credit goes to [Joe Khoury](https://github.com/jfkhoury) for devising the strategy used to determine the apex domain.
