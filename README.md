# salesforceautosandbox

An automatic sandbox toggler, designed to be used with cron

## Getting started

It's very easy to use salesforce auto sandbox: Just download a release executable and fill in `config.json` by copying `config.example.json`. You also should export `AUTOSALESFOCE_ORDER` to the env. That's it! Now in an directory you can run `env AUTOSALESFOCE_ORDER=start ./salesforceautosandbox`, you can add that to cron or something now.
