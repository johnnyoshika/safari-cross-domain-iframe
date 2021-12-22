# Cross domain iframe cookie in Safari

Test cross domain iframe cookie behaviour in Safari.

## Setup

```
npm ci
cd parent && npm ci && cd ..
cd child && npm ci && cd ..
```

Add following tunnels to ngrok.yml:

```
tunnels:
  cross-domain-parent:
    proto: http
    addr: 5010
    hostname: cross-domain-parent.ngrok.io
  cross-domain-child:
    proto: http
    addr: 5020
    hostname: cross-domain-child.ngrok.io
```

## Run

```
npm start
ngrok start cross-domain-parent cross-domain-child
```

## Instructions

- Open https://cross-domain-parent.ngrok.io/ in Safari
- Set cookie
- Try `Cross domain GET`: observe that cookie doesn't get sent
- Try `Cross domain POST`: observe that cookie does get sent

_Note: If you encounter a tunnel error when you try `Cross domain GET` or `Cross domain POST`, try visiting this URL first: [https://cross-domain-child.ngrok.io/](https://cross-domain-child.ngrok.io/), then try again._
