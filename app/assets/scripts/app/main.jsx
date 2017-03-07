'use strict';

/**
 * TODO:
 *  * replace all error messages with notifications
 */
import React from 'react';

import List from './list.jsx';
import Header from './header.jsx';
import TeamInfo from './teaminfo.jsx';
import { Overlay, OverlayItem } from './overlay.jsx';
import { Player, PlayerState } from './player.jsx';
import { AboutPage } from './static.jsx';

import Request from './request.js';
import Utils from './utils.js';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.name = "Refract";
        this.pages = ["home", "tracklist", "about"];
        this.idx = 0;
        this.videos = [];
        this.player = null;
        this.list = null;
        this.team = null;

        this.state = {
            activePage: 'home'
        };

        Request('GET', `/v0/teams`).then((response) => {

            const { teams } = JSON.parse(response);
            if ( !teams.length ) {
                console.warn('no teams available')
                return
            }

            // select the first item
            this.team = teams[0];
            this.loadData();
        });
    }

    play() {
        let { idx, videos } = this;
        if ( videos.length ) {
            const video_id = videos[idx].video_id;
            this.player.play(video_id);
            this.list.setActive(idx);
        }
    }

    loadData() {
        Request('GET', `/v0/videos?id=${this.team.id}`).then((response) => {
            this.videos = JSON.parse(response).videos;
            this.forceUpdate();
            this.play();
        });
    }

    handleNext() {

        let { idx, videos } = this;
        if ( this.player.state.random ) {
            let old_idx = idx;
            while ( idx === old_idx ) {
                idx = Math.floor(Math.random() * videos.length);
            }
        } else if ( !this.player.state.repeat ) {
            idx = (idx < videos.length-1)?idx+1:0;
        }

        this.idx = idx;
        this.play();
    }

    handlePrev() {
        let { idx, videos } = this;
        idx = (idx > 0)?idx-1:videos.length -1;
        this.idx = idx;
        this.play();
    }


    handleStateChange(event) {
        if ( event.data == PlayerState.ENDED ) {
            this.handleNext();
        }
    }

    handleListClick(item, idx) {
        this.idx = idx;
        this.player.play(item.video_id); 
        this.list.setActive(idx);
    }

    render() {

        /* Stateless functional component */
        const renderItem = function(props) {

            const infoStyle = {
                display: 'flex',
                justifyContent: 'space-between'
            };

            return (
                <span style={infoStyle}>
                    <span>
                        {props.title}
                    </span>
                    <span>
                        ({props.duration})
                    </span>
                </span>
            );
        };

        const centered = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        };

        const overlayStyle = {
            maxWidth: '854px',
            margin: 'auto',
            padding: '3rem 2rem'
        };

        return (
            <div className="main">
                <Header 
                    name={this.name}
                    navItems={this.pages} 
                    activeItem={this.state.activePage}
                    onNav={(page) => this.setState({activePage: page})}
                />
                <div style={centered}>
                    <TeamInfo team={this.team} />
                    <Player 
                        ref={(player) => this.player = player}
                        onNext={() => this.handleNext()} 
                        onPrev={() => this.handlePrev()} 
                        onStateChange={(e) => this.handleStateChange(e)}
                    />
                </div>
                <Overlay activeItem={this.state.activePage}>
                    <OverlayItem style={overlayStyle} key="about">
                        <AboutPage />
                    </OverlayItem>
                    <OverlayItem style={overlayStyle} key="tracklist">
                        <List 
                            ref={(list) => this.list = list}
                            activeIdx={this.idx}
                            items={this.videos} 
                            render={renderItem}
                            onClick={(item, index) => { this.handleListClick(item, index); } }
                        />
                    </OverlayItem>
                </Overlay>
            </div>
        );
    }
};

export default App;
