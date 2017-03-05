#!/usr/bin/env bash

source ./config.sh

trap exit SIGINT SIGTERM

log_err() {
    echo '[Error]' $@
}

exists() {
    which $1 &>/dev/null
}


try() {
    exists $1
    if [[ $? != 0 ]]; then
        log_err "$1 not found. please install $1"
    else
        exec $@ 
        return $?
    fi
}

install_node_packages() {
    exists npm
    NPM=$?
    
    exists yarn
    YARN=$?

    if [[ $NPM  == '0' ]]; then
        exec npm install
    elif [[ $YARN == '0' ]]; then
        exec yarn install
    else
        log_err "can't find any nodejs package managers"
    fi
}



for i in "$@"
do
case $i in 
    --collect)
        cd scraper/slackarchive
        try scrapy crawl archive
        exit
        ;;
    --install-deps)
        THIS=$PWD
        cd app/
        install_node_packages
        cd $THIS
        cd scraper/slackarchive
        try pip install -r requirements.txt
        exit
        ;;
    --main)
        cd app/
        try gulp
        exit
        ;;
esac
done

echo "usage: $0 [--collect | --install-deps | --main ]"
