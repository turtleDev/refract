'use strict';

import React from 'react';
import List from './list.jsx';

import Request from './request.js';
import YoutubePlayer from 'youtube-player';

class App extends React.Component {

    constructor() {
        super();
        this.state = { 
            items: [],
            player: null
        };
        Request('GET', '/v1/list').then((res) => {
            res = JSON.parse(res);
            this.setState({
                items: res.videos,
            });
            this.loadPlayer();
        });
    }

    handleClick(item) {
        if ( this.state.player ) {
            this.state.player.loadVideoById(item.video_id);
            this.state.player.playVideo();
        }
    }

    loadPlayer() {
        const playerOpts = {
            width: '100%'
        };
        const player = YoutubePlayer('yt-player', playerOpts);
        player.loadVideoById(this.state.items[0].video_id);
        player.playVideo();
        this.setState({ player });
    }

    render() {

        const baseStyles = {
            maxWidth: '55em',
            margin: 'auto',
            padding: '2em 0'
        };

        const ytStub = {
            height: 360
        };

        return (
            <div style={baseStyles}>
                <h1>Refract</h1>
                <pre>
                    <code>
                    The Slack Jukebox
                    </code>
                </pre>
                <div>
                    <div style={ytStub} id="yt-player"></div>
                </div>
                <List onClick={(item) => this.handleClick(item)} items={this.state.items.slice(0, 10)} />
            </div>
        );
    }
};

export default App;
