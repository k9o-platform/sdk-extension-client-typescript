# @k9o/extension-client

Official extensions client for [Kilimanjaro](#54-about-kilimanjaro).

Typed bindings for platform extensions, resolved by slug with `k9o.extension(slug)`. The bindings define the typed contract for each extension's methods. Calls are not served yet: every method rejects with an error before any request is sent. To write an extension, use [`@k9o/extension-runtime`](https://www.npmjs.com/package/@k9o/extension-runtime).

## Contents

**A. Get started**

1. [Links](#1-links)
2. [Install](#2-install)
3. [Quick start](#3-quick-start)
   - 3.1 [When a method is not available yet](#31-when-a-method-is-not-available-yet)

**B. Use extensions**

4. [Using through @k9o/core](#4-using-through-k9ocore)

**C. Reference**

5. [Appendix](#5-appendix)
   - 5.1 [Find extensions](#51-find-extensions)
   - 5.2 [Imports](#52-imports)
   - 5.3 [Related packages](#53-related-packages)
   - 5.4 [About Kilimanjaro](#54-about-kilimanjaro)
6. [License](#6-license)

## A. Get started

### 1. Links

- Website: <https://kilimanjaro.dev>
- Documentation / Developer Hub: <https://docs.kilimanjaro.dev>
- API: <https://api.k9o.io>
- Console: <https://console.k9o.io>
- Open source
  - Platform: <https://github.com/k9o-platform>
  - Community: <https://github.com/k9o-community>

### 2. Install

```bash
npm install @k9o/extension-client
```

```bash
bun add @k9o/extension-client
```

```bash
pnpm add @k9o/extension-client
```

Requires TypeScript 5.6 or newer for the bundled types.

### 3. Quick start

Resolve a binding by slug, then call its methods. For example, sending a WhatsApp message through an installed extension (illustrative):

```ts
import { k9o } from "@k9o/extension-client";

const whatsapp = k9o.extension("whatsapp");

const message = await whatsapp.messages.send({
  to: "+255700000000",
  text: "Your order has shipped.",
});

console.log(message.id);
```

```text
wamid.HBgLMjU1NzAwMDAwMDAVAgARGBI5
```

The returned object is typed for the extension you name, and an unknown slug is a compile-time error. Calls are not served yet; see [When a method is not available yet](#31-when-a-method-is-not-available-yet).

#### 3.1 When a method is not available yet

Every method rejects with an `Error` before any request is sent:

```ts
const stripe = k9o.extension("stripe");

try {
  await stripe.invalidMethod.init();
} catch (error) {
  console.log(`Output: ${error instanceof Error ? error.message : error}`);
}
```

```text
Output: stripe.invalidMethod.init is not available yet: the extension runtime is not implemented in this version of @k9o/extension-client.
```

An unknown slug also throws an `Error` at runtime. Each extension's methods are documented in [Find extensions](#51-find-extensions).

## B. Use extensions

### 4. Using through @k9o/core

`@k9o/core` exposes the same factory as `k9o.extensions.extension(slug)`.

## C. Reference

### 5. Appendix

#### 5.1 Find extensions

Extensions and their documentation are published in the community: <https://github.com/k9o-community/>. Each extension lists its methods there.

#### 5.2 Imports

| Import | What it gives you |
| --- | --- |
| `@k9o/extension-client` | `k9o`, plus the types `ExtensionSlug` and `Extension`. |
| `@k9o/extension-client/<slug>` | One extension's binding and types, for example `@k9o/extension-client/paperless`. |

#### 5.3 Related packages

| Package | What it does |
| --- | --- |
| `@k9o/extension-runtime` | The runtime client for writing an extension. |
| `@k9o/extension-manifest` | Declaring an extension's manifest. |
| `@k9o/core` | The full platform client. |
| `@k9o/gate` | End-user identity and JWT verification. |
| `@k9o/kibo` | Vault and key operations. |

#### 5.4 About Kilimanjaro

Kilimanjaro is a modular developer platform for building secure enterprise applications. You define AI agents, functions and data pipelines
on the platform. The SDKs let you deploy and invoke them, read and write your data, publish to and subscribe to streams, sign users in, and
encrypt with keys you hold.

It provides four building blocks:

- **Keep**: AI security and governance. Guardrails and policy for the agents you run.
- **Pulse**: data intelligence and real-time stream processing. Streams, analytics and live feeds.
- **Gate**: customer identity and access management. Sign-in and sessions, and automatic data scoping so a signed-in user reaches only their own data.
- **Kibo**: cryptographic keys and secrets management. Client-side encryption with keys you hold, and a secrets vault.

### 6. License

Apache-2.0 © Formelo Inc. See `LICENSE` and `NOTICE`.
