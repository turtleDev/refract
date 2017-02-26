'use strict';

import React from 'react';

import List from './list.jsx';
import { Player, PlayerState } from './player.jsx';

import Request from './request.js';
import Utils from './utils.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
            random: false,
            repeat: false,
            idx: null
        };
    }

    componentWillMount() {
        this.loadData();
    }

    componentWillUpdate(nextProps, nextState) {
        const video_id = nextState.videos[nextState.idx].video_id;
        this.player.play(video_id);
    }

    loadData() {
        Request('GET', '/v0/videos').then((response) => {
            const videos = JSON.parse(response).videos;
            this.setState({ 
                videos,
                idx: 0
            });
        });
    }

    handleNext() {
        this.setState((prevState) => {
            let { idx, videos } = prevState;
            if ( this.state.random ) {
                let old_idx = idx;
                while ( idx === old_idx ) {
                    idx = Math.floor(Math.random() * videos.length);
                }
            } else if ( !this.state.repeat ) {
                idx = (idx < videos.length-1)?idx+1:0;
            }
            return { idx };
        });

    }

    handlePrev() {
        this.setState((prevState) => {
            let { idx, videos } = prevState;
            idx = (idx > 0)?idx-1:videos.length -1;
            return { idx };
        });
    }

    toggleRandom() { 
        this.setState((prevState, props) => {
            return { random: !prevState.random }
        });
    }

    toggleRepeat() {
        this.setState((prevState, props) => {
            return { repeat: !prevState.repeat }
        });
    }

    handleStateChange(event) {
        if ( event.data == PlayerState.ENDED ) {
            this.handleNext();
        }
    }

    render() {

        const baseStyles = {
            maxWidth: '55em',
            margin: 'auto',
            padding: '2em 0'
        };

        return (
            <div style={baseStyles}>
                <h1>Refract</h1>
                <pre>
                    <code>
                    The Slack Jukebox
                    </code>
                </pre>
                <p>Random: {this.state.random?'ON':'OFF'}, Repeat: {this.state.repeat?'ON':'OFF'}</p>
                <Player 
                    ref={(player) => this.player = player}
                    onNext={() => this.handleNext()} 
                    onPrev={() => this.handlePrev()} 
                    onRandom={() => this.toggleRandom()}
                    onRepeat={() => this.toggleRepeat()}
                    onStateChange={(e) => this.handleStateChange(e)}/>

                <List items={this.state.videos} />
            </div>
        );
    }
};

export default App;
