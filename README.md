# Red5 Pro Mixer Back-End

> Simple WebSocket Server for hosting Mixer Backend

This Node.js-based WebSocket server provides the communication between the Stream Manager Mixer testbeds, which moderators use to create compositions, and the HTML5 pages with sample layouts that are loaded into Red5 Pro Mixers and are responsible for defining the layout of the composite streams. This allows for creating dynamic compositions or video conferences where a Manager or Host can add or remove live streams in real-time. Additionally, the node.js server can provide the endpoints for round-trip authentication if used.

# Requirements

* NodeJS v10+
* NPM 6+

> This project was developed with the latest NodeJS & NPM as of the time of this writing (December 2021).

# Installation

**Install Prerequisites**

```sh
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
sudo apt-get install build-essential
sudo apt-get install forever
```

cd into the project directory, then run:

```sh
npm install
```

# SSL

For most NodeJS implementations, it is necessary to generate SSL certificate files, which are converted into .crt and .key files to be stored in the `<service>/cert` folder.

## Using Let's Encrypt

The following can be run to install Let's Encrypt Certbot on Ubuntu (`snap` is included with most Ubuntu distributions by default)

1.	sudo snap install core; sudo snap refresh core
2.	sudo snap install --classic certbot
3.	sudo ln -s /snap/bin/certbot /usr/bin/certbot

To generate the cert, run `sudo certbot certonly --standalone --email <your-email> --agree-tos -d <server-fqdn>`  (for example: `sudo certbot certonly --standalone --email jessica@infrared5.com --agree-tos -d test01.red5.net`)

You will then need to copy the fullchain and privatekey to the cert directory of your application

```sh
sudo cp /etc/letsencrypt/live/<server-fqdn>/fullchain.pem ~/<nodejs-server>/cert/certificate.crt
sudo cp /etc/letsencrypt/live/<server-fqdn>/privkey.pem ~/<nodejs-server>/cert/privateKey.key
sudo chmod +r ~/<nodejs-server>/cert/*
```

Your index.js file then needs to be modified with the full path to the certificate and privateKey files (replace with the appropriate paths):

```js
if (useSSL) {
  cert = fs.readFileSync('/home/ubuntu/serverapp/cert/certificate.crt')
  key = fs.readFileSync('/home/ubuntu/serverapp/cert/privateKey.key')
  port = 443
```

# Usage

Start the Node.js server with the following command:

```sh
sudo PORT=443 SM_TOKEN=<SM-API_token> SM_HOST=https://<Hostname-of-Stream-Manager> CERT=<path-to-fullchain.pem> KEY=<path-to-private-key.pem> forever start index.js 
```

> By default, if PORT is not specified, the websocket server will run on localhost:8001.

## Backend Mixer Testbeds

The `backend-mixer-testbeds` directory is required for creating mixer compositions.

## Forever Commands

* `forever start`: starts a script as a daemon.
* `forever stop`: stops the daemon script by `Id|Uid|Pid|Index|Script`.
* `forever stopall`: stops all running scripts.
* `forever restart`: restarts the daemon script.
* `forever restartall`: restarts all running forever scripts.
