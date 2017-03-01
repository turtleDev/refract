'use strict';

import React from 'react';

import List from './list.jsx';
import Header from './header.jsx';
import { Player, PlayerState } from './player.jsx';

import Request from './request.js';
import Utils from './utils.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
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
            if ( this.player.state.random ) {
                let old_idx = idx;
                while ( idx === old_idx ) {
                    idx = Math.floor(Math.random() * videos.length);
                }
            } else if ( !this.player.state.repeat ) {
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


    handleStateChange(event) {
        if ( event.data == PlayerState.ENDED ) {
            this.handleNext();
        }
    }

    render() {

        /* Stateless functional component */
        const renderItem = function(props) {

            const infoStyle = {
                float: 'right'
            };

            return (
                <span>
                    {props.title}
                    <span style={infoStyle}>
                        ({props.duration})
                    </span>
                </span>
            );
        }

        const headerStyle = {
            margin: '0',
            fontSize: '2.8rem',
            height: '10%',
            display: 'flex',
            alignItems: 'center'
        }

        const mainStyle = {
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };
        
        const containerStyle = {
            height:'100%'
        };

        return (
            <div style={containerStyle}>
                <header style={headerStyle}>
                    <span>Refract</span>
                </header>
                <div style={mainStyle}>
                    <p>You are listening to music from <a href="#">Devs and Hackers</a></p>
                    <Player 
                        ref={(player) => this.player = player}
                        onNext={() => this.handleNext()} 
                        onPrev={() => this.handlePrev()} 
                        onStateChange={(e) => this.handleStateChange(e)}/>
                </div>
            {/*
                <List 
                    items={this.state.videos} 
                    render={renderItem}
                    onClick={(item) => this.player.play(item.video_id)}/>
            */}
            </div>
        );
    }
};

export default App;
