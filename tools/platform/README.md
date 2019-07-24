# Tool to extract Cloud Platform credentials

In order to consume the Cloud Orchestrator API, you will need to use a different authentication configuration than for on-premise Orchestrator.
This tool will allow you to retrieve the relevant information for your account.
Note that the current implementation is experimental and will most likely require some maintenance when the Cloud Platform exists its preview period. 

### Table of content

1. [Installation](#installation)
2. [Usage](#usage)
4. [License](#license)

### Installation

In the current folder, simply execute

`npm install`

### Usage

Simply run the index:

`node index.js`

A browser will open and ask you to login, or will directly reach a redirection page displaying `OK`.

Copy the code at the end of the URL in the address bar, and paste it back in the tool.

A list of accounts and the associated Service Instances will be displayed.

In order to consume the Orchestrator API from using this module, you will need the refresh token, the account logical name (between brackets), and the service instance logical name (between brackets).   

### License

MIT
