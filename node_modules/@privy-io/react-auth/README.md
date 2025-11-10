# @privy-io/react-auth

![pitch-2-slide-2](https://user-images.githubusercontent.com/3359083/234168988-04254782-0e67-420a-91f7-8e67b67207e5.png)

The Privy React Auth SDK allows you to authenticate your users with Privy in your React app.

Check out our [demo](https://demo.privy.io/)!

## Changelog

Our [changelog](https://docs.privy.io/reference/sdk/react-auth/changelog) contains the latest information about new releases, including features, fixes, and upcoming changes.

We use [Semantic Versioning](https://semver.org/) to track changes.

## Installing

```sh
npm i @privy-io/react-auth
```

## Basic Usage

Setup your integration by wrapping any React components that will use the Privy SDK with the `PrivyProvider`. This gives your wrapped components access to the Privy SDK and authentication context.

```tsx
// Import the PrivyProvider
import {PrivyProvider} from '@privy-io/react-auth';

// Wrap any components that will use the Privy SDK with the PrivyProvider – for example, in your `app` or `index` file
<PrivyProvider appId="<your-privy-app-id>">
  <Component {...pageProps} />
</PrivyProvider>;
```

Now, from within your React components, you can access the Privy SDK via the `usePrivy` hook!

```tsx
// Import the usePrivy hook
import {usePrivy} from '@privy-io/react-auth';

// Call usePrivy() from inside your React components
const {ready, authenticated, user, login, logout} = usePrivy();
```
