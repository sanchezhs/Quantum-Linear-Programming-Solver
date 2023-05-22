# TFG


## Installation
You need to install Docker to use this app, see [https://www.docker.com/](https://www.docker.com/).

1. Once you have Docker installed on your system, clone this repo in your computer.
2. Go to repo directory and run: **docker-compose build**
3. Then run: **docker-compose up**
4. In the browser, go to [localhost:3000](localhost:3000).

## Troubleshooting
- *entrypoint.sh was not found*: This error can occour on Windows. To fix this, open VSCode, go to the *backend* folder and open *entrypoint.sh*. 
  VSCode has an option named **CRLF** (**LF** on Linux) in the options bar below, at the right side. Change it to **LF**, save *entrypoint.sh* and rerun
  steps *2* and *3*.
- *vite not found*: Check that you have NodeJS and npm installed on your machine. If you have them installed, run **npm install -g npm** and rerun steps *2* and *3*.  
- *Host version does not match binary version*: Remove **node_modules** from *frontend* and restart your machine.
- *vite error. Cannot start service...*: Remove **node_modules** from *frontend*, execute **docker-compose down** or delete container and start from step 2.
