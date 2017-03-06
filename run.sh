#!/usr/bin/env bash

source ./config.sh

trap exit SIGINT SIGTERM

APPROOT=$(dirname $(realpath $0))

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

run_scraper() {

    # kill any previous instances
    pkill scrapy

    try scrapy crawl archive &>> $APPROOT/scraper.log
}


for i in "$@"
do
case $i in 
    --collect)
        cd scraper/slackarchive
        REFRACT_REDUNDENCY_THRESHOLD=-1 
        run_scraper
        exit
        ;;
    --update)
        cd scraper/slackarchive
        run_scraper
        exit
        ;;
    --install-deps)
        cd app/
        install_node_packages
        cd $APPROOT
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

echo "usage: $0 [--collect | --update | --install-deps | --main ]"
