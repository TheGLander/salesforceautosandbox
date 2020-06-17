# salesforceautosandbox

An automatic sandbox toggler, designed to be used with cron

## Getting started

Before you get started, you must download chromium via `sudo apt install chromium`, `sudo pacman -S chromium`, or any other package manager.

It's very easy to use salesforce auto sandbox: Just download a release executable and fill in `config.json` by copying `config.example.json`. You also should export `AUTOSALESFORCE_ORDER` to the env. That's it! Now in an directory you can run `env AUTOSALESFOCE_ORDER=start ./salesforceautosandbox`, you can add that to cron or something now.
