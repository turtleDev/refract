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
        this.name = "Refract";
        this.pages = ["play", "about", "settings"];
        this.state = { 
            videos: [],
            page: "play",
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

        const centered = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        }

        return (
            <div className="main">
                <Header 
                    name={this.name}
                    navItems={this.pages} 
                    activeItem={this.state.page}
                    onNav={(page) => this.setState({page})}/>
                <div style={centered}>
                    <Player 
                        ref={(player) => this.player = player}
                        onNext={() => this.handleNext()} 
                        onPrev={() => this.handlePrev()} 
                        onStateChange={(e) => this.handleStateChange(e)}/>
                </div>
                <List 
                    items={this.state.videos} 
                    render={renderItem}
                    onClick={(item) => this.player.play(item.video_id)}/>
            </div>
        );
    }
};

export default App;
