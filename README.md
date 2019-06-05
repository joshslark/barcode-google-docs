# Getting started

The add-on lives in Google's Script Editor but, in keeping with [best practices](https://developers.googleblog.com/2015/12/advanced-development-process-with-apps.html),
this repo is the source of truth, and the script editor will be overwritten with
local changes.

# Configuring

This process needs to be performed once:

1. `npm install` to install all dependencies
1. Follow the first step here:
[Node Google Apps Quickstart](https://github.com/danthareja/node-google-apps-script/blob/master/README.md#quickstart) - "Independent Developer Console Project" is recommended.
1. Download the JSON oAuth details
1. `./node_modules/bin/gapps auth <PATH-TO-JSON-OAUTH-FILE>` and follow instructions
1. Edit the generated `gapps.config.json` file and change the value for `path` to be `src`
1. Create a new apps script here: https://script.google.com
1. Get the script ID from the URL (everything between the `/d/` and `/edit` - `script.google.com/a/google.com/d/SCRIPT_ID_HERE/edit`)
1. `./node_modules/bin/gapps init <SCRIPT_ID>`

Everything is now setup.

# Deploying

`npm run deploy`

This will use node-google-apps-script to upload the `src` directory to the
add-on's script editor.

# Testing

In the script editor choose "Publish" → "Test as add-on…" and then select a
document to test with.

That will open a new window with your document. You will then see your project
in the Add-ons menu.
