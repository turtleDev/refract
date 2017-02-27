'use strict';

import React from 'react';
import YoutubePlayer from 'youtube-player';

import Controls from './controls.jsx';

export let PlayerState = {
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
}
    
export class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            random: false,
            repeat: false
        }
    }

    componentDidMount() {
        this.loadPlayer();
    }


    play(id) {
        if ( !id && !this.state.playing ) { return; }
        this.state.playing = true;
        this.player.loadVideoById(id);
        this.player.playVideo();
    }


    loadPlayer() {
        const playerOpts = {
            width: '100%',
            playerVars: {
                disablekb: 1,
                modestbranding: 1,
                fs: 0
            }
        };
        this.player = YoutubePlayer('yt-player', playerOpts);
        this.player.addEventListener('onStateChange', (data) => {
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
            const repeat = random?false:true;
            return { random, repeat };
        });
    }

    handleRepeat() {
        this.setState((prevState) => {
            const repeat = !prevState.repeat;
            const random = repeat?false:true
            return { repeat, random };
        });
    }

    render() {

        const ytStub = {
            height: 360
        };

        return (
            <div>
                <div style={ytStub} id="yt-player"></div>
                <Controls 
                    playerState={this.state}
                    onToggle={() => this.togglePlaying()}
                    onNext={() => this.props.onNext()}
                    onPrev={() => this.props.onPrev()}
                    onRandom={() => this.handleRandom()}
                    onRepeat={() => this.handleRepeat()}/>
            </div>
        );
    }
}

