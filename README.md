# About
Firefox extension that allows quick search from the address bar on aonprd by typing 'a ' follow by a search term

Needs npm and web-ext (installed through npm)

https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/

## Start new firefox instance and temp. load the addon for debugging
web-ext run

## Debug (after run)
browse to about:debugging#/runtime/this-firefox

## build an unsigned .zip file
web-ext build

## sign an artifact (.zip file)
## issuer & secret are stored at addons.mozilla.org under 'manage API keys'
web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET

## 'Planned' features
Use options (like CLI programs) instead of always try-parsing the first word for a category
