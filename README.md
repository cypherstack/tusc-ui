BitShares-UI
============
[中文版](README_zh.md)

This is a light wallet that connects to a TUSC API provided by the *witness_node* executable.

It *stores all keys locally* in the browser, *never exposing your keys to anyone* as it signs transactions locally before transmitting them to the API server which then broadcasts them to the blockchain network. The wallet is encrypted with a password of your choosing and encrypted in a browser database.

## Getting started

TUSC-UI depends node Node.js, and version 10+ is required.

On Ubuntu and OSX, the easiest way to install Node is to use the [Node Version Manager](https://github.com/creationix/nvm).

To install NVM for Linux/OSX, simply copy paste the following in a terminal:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install v10
nvm use v10
```

Once you have Node installed, you can clone the repo:

```
git clone https://github.com/TUSCNetwork/tusc-ui.git
cd tusc-ui
```

Before launching the GUI you will need to install the npm packages:

```
npm install
```

## Running the dev server

The dev server uses Express in combination with Webpack.

Once all the packages have been installed you can start the development server by running:

```
npm start
```

Once the compilation is done the GUI will be available in your browser at: `localhost:8080` or `127.0.0.1:8080`. Hot Reloading is enabled so the browser will live update as you edit the source files.


## Production
If you'd like to host your own wallet somewhere, you should create a production build and host it using NGINX or Apache. In order to create a prod bundle, simply run the following command:

```
npm run build
```
This will create a bundle in the ./build/dist folder that can be hosted with the web server of your choice.


### Installable wallets
We use Electron to provide installable wallets, available for Windows, OSX and Linux Debian platforms such as Ubuntu. First, make sure your local python version is 2.7.x, as a dependency requires this.

On Linux you will need to install the following packages to handle icon generation:

`sudo apt-get install --no-install-recommends -y icnsutils graphicsmagick xz-utils`

For building, each architecture has it's own script that you can use to build your native binary:

__Linux__
`npm run package-deb`  
__Windows__
`npm run package-win`  
__Mac__
`npm run package-mac`  

This will compile the UI with some special modifications for use with Electron, generate installable binaries with Electron and copy the result to the root `build/binaries` folder.


### Docker

Clone this repository, run `docker-compose up` and visit localhost:8080


## Contributing & Coding style guideline
See [CONTRIBUTING.md](CONTRIBUTING.md)

## Code of Conduct
This repository has a Code of Conduct that should be followed by everyone. 
Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

**Please keep comments constructive and clean**

## BrowserStack 

The BitShares UI is integrated with BrowserStack (https://www.browserstack.com) to allow manual compatibility testing across devices and browser versions. In the future we will switch to a automated Selenium testing framework.
![image](https://user-images.githubusercontent.com/33128181/48697885-05f8d880-ebe6-11e8-95a2-d87516cbb3d9.png)

### Main(stable)

Available for browsing on https://wallet.tusc.network/wallet/, which is the official reference wallet for TUSC.

