'use strict';

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

        /* will become configurable in v2 */
        this.team_domain = "dev-s";

        this.name = "Refract";
        this.pages = ["play", "tracklist", "about"];
        this.activePage = "play";
        this.idx = 0;
        this.videos = [];
        this.overlay = null;
        this.player = null;
        this.list = null;
        this.team = null;

        // init
        Request('GET', `/v0/teams?domain=${this.team_domain}`).then((response) => {
            this.team = JSON.parse(response).teams[0];
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
        Request('GET', `/v0/videos?team_id=${this.team.team_id}`).then((response) => {
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

    handleNav(page) {
        this.overlay.setItem(page);
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
            padding: '4rem 0'
        };

        return (
            <div className="main">
                <Header 
                    name={this.name}
                    navItems={this.pages} 
                    defaultItem={this.activePage}
                    onNav={(page) => this.handleNav(page)}
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
                <Overlay ref={(overlay) => this.overlay = overlay}>
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
