. ~/.nvm/nvm.sh
nvm use v8 --silent
SCRIPT_PATH=$(dirname `which $0`)

node $SCRIPT_PATH/index.js
