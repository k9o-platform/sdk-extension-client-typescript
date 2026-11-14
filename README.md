# @k9o/extension-client

Official extensions client for [Kilimanjaro](#63-about-kilimanjaro).

Typed bindings for platform extensions, resolved by slug with `k9o.extension(slug)`. The bindings define the typed contract for each extension's methods. Calls are not served yet: every method rejects with an error before any request is sent. To write an extension, use [`@k9o/extension-runtime`](https://www.npmjs.com/package/@k9o/extension-runtime).

## Contents

**A. Get started**

1. [Links](#1-links)
2. [Install](#2-install)
3. [Choose the right package](#3-choose-the-right-package)
4. [Quick start](#4-quick-start)
   - 4.1 [When a method is not available yet](#41-when-a-method-is-not-available-yet)

**B. Use extensions**

5. [Using through @k9o/core](#5-using-through-k9ocore)

**C. Reference**

6. [Appendix](#6-appendix)
   - 6.1 [Find extensions](#61-find-extensions)
   - 6.2 [Imports](#62-imports)
   - 6.3 [About Kilimanjaro](#63-about-kilimanjaro)
7. [License](#7-license)

## A. Get started

### 1. Links

- Website: <https://kilimanjaro.dev>
- Documentation / Developer Hub: <https://docs.kilimanjaro.dev>
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

### 3. Choose the right package

| Package | Use it when you are… | Registry | Source |
| --- | --- | --- | --- |
| `@k9o/extension-client` | Calling an extension installed in your project, by its slug, through typed bindings. | [npm](https://www.npmjs.com/package/@k9o/extension-client) | [sdk-extension-client-typescript](https://github.com/k9o-platform/sdk-extension-client-typescript) |
| `@k9o/extension-runtime` | Writing an extension: reading and writing data, generating text and embeddings, and calling the platform services the extension's manifest grants. | [npm](https://www.npmjs.com/package/@k9o/extension-runtime) | [sdk-extension-runtime-typescript](https://github.com/k9o-platform/sdk-extension-runtime-typescript) |
| `@k9o/extension-manifest` | Declaring an extension's manifest: its permissions, surfaces and endpoints, checked the way the platform checks them at registration. | [npm](https://www.npmjs.com/package/@k9o/extension-manifest) | [sdk-extension-manifest-typescript](https://github.com/k9o-platform/sdk-extension-manifest-typescript) |

### 4. Quick start

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

The returned object is typed for the extension you name, and an unknown slug is a compile-time error. Calls are not served yet; see [When a method is not available yet](#41-when-a-method-is-not-available-yet).

#### 4.1 When a method is not available yet

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

An unknown slug also throws an `Error` at runtime. Each extension's methods are documented in [Find extensions](#61-find-extensions).

[↑ Back to Contents](#contents)

## B. Use extensions

### 5. Using through @k9o/core

`@k9o/core` exposes the same factory as `k9o.extensions.extension(slug)`.

[↑ Back to Contents](#contents)

## C. Reference

### 6. Appendix

#### 6.1 Find extensions

Extensions and their documentation are published in the community: <https://github.com/k9o-community/>. Each extension lists its methods there.

#### 6.2 Imports

| Import | What it gives you |
| --- | --- |
| `@k9o/extension-client` | `k9o`, plus the types `ExtensionSlug` and `Extension`. |
| `@k9o/extension-client/<slug>` | One extension's binding and types, for example `@k9o/extension-client/paperless`. |

#### 6.3 About Kilimanjaro

Kilimanjaro is a modular developer platform for building secure enterprise applications. You define AI agents, functions and data pipelines
on the platform. The SDKs let you deploy and invoke them, read and write your data, publish to and subscribe to streams, sign users in, and
encrypt with keys you hold.

It provides four building blocks:

- **Keep**: AI security and governance. Guardrails and policy for the agents you run.
- **Pulse**: data intelligence and real-time stream processing. Streams, analytics and live feeds.
- **Gate**: customer identity and access management. Sign-in and sessions, and automatic data scoping so a signed-in user reaches only their own data.
- **Kibo**: cryptographic keys and secrets management. Client-side encryption with keys you hold, and a secrets vault.

### 7. License

Apache-2.0 © Formelo Inc. See `LICENSE` and `NOTICE`.

[↑ Back to Contents](#contents)
