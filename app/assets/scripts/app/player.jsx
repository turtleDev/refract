'use strict';

import React from 'react';
import YoutubePlayer from 'youtube-player';

import { Controls, ControlsState } from './controls.jsx';

import Utils from './utils.js';

/**
 * youtube player state
 * https://developers.google.com/youtube/iframe_api_reference#Events
 */
export let PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,

    // non standard
    READY: -1
}
    
export class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            random: false,
            repeat: false
        }

        const isMobile = Utils.isMobile();
        this.playerOpts = {
            width: !isMobile?'854px':'300px',
            height: !isMobile?'480px':'168px',
            playerVars: {
                disablekb: 1,
                modestbranding: 1,
                fs: 0
            }
        };
    }

    componentDidMount() {
        this.loadPlayer();
    }

    /**
     * This method is called by the parent component via a ref
     */
    play(id) {
        if ( !id && !this.state.playing ) { return; }
        this.setState({
            playing: true
        });
        this.player.loadVideoById(id);
        this.player.playVideo();
    }


    loadPlayer() {
        this.player = YoutubePlayer('yt-player', this.playerOpts);
        this.player.on('stateChange', (data) => {
            this.props.onStateChange(data);
        });
    }

    togglePlaying() {
        if ( this.state.playing ) {
            this.player.pauseVideo();
        } else {
            this.player.playVideo();
        }

        this.setState({
            playing: !this.state.playing
        });
    }

    /**
     * random and repeat are mutually exclusive
     */
    handleRandom() {
        this.setState((prevState) => {
            const random = !prevState.random;
            const repeat = random?false:prevState.repeat;
            return { random, repeat };
        });
    }

    handleRepeat() {
        this.setState((prevState) => {
            const repeat = !prevState.repeat;
            const random = repeat?false:prevState.random;
            return { repeat, random };
        });
    }

    render() {

        const ytStub = {
            height: this.playerOpts.height,
        };

        const playerStyle = {
            width: this.playerOpts.width,
            margin: '0 auto'
        };

        const ctrlState = (this.state.playing?ControlsState.PLAYING:0) |
            (this.state.random?ControlsState.SHUFFLE:0) |
            (this.state.repeat?ControlsState.REPEAT:0);

        return (
            <div style={playerStyle}>
                <div style={ytStub} id="yt-player"></div>
                <Controls 
                    state={ctrlState}
                    onToggle={() => this.togglePlaying()}
                    onNext={() => this.props.onNext()}
                    onPrev={() => this.props.onPrev()}
                    onRandom={() => this.handleRandom()}
                    onRepeat={() => this.handleRepeat()}/>
            </div>
        );
    }
}

