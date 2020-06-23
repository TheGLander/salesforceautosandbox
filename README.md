# salesforceautosandbox

An automatic sandbox toggler, designed to be used with cron

## Getting started

Before you get started, you must download chromium via `sudo apt install chromium-browser`, `sudo pacman -S chromium`, or any other package manager.

It's very easy to use salesforce auto sandbox: Just download a release executable and fill in env variables. After that, you can just run it and it will do what you want! Now you can add it to cron or something.

## Env variables

|          Variable          |                       Description                       |
| :------------------------: | :-----------------------------------------------------: |
|      `CHROMIUM_PATH`       |            Path to your chromium executable             |
| `AUTOSALESFORCE_CLIENTID`  |                       Client uuid                       |
|   `AUTOSALESFORCE_LOGIN`   |                       User email                        |
| `AUTOSALESFORCE_PASSWORD`  |                      User password                      |
| `AUTOSALESFORCE_SANDBOXID` |                      Sandbox uuid                       |
|   `AUTOSALESFORCE_ORDER`   | The order to send to the sandbox, `start`, `stop`, etc. |
