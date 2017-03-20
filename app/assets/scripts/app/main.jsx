'use strict';

import co from 'co';

import React from 'react';

import Alert from 'react-s-alert';

import List from './list.jsx';
import Header from './header.jsx';
import TeamInfo from './teaminfo.jsx';
import { PageContainer, Page } from './page.jsx'
import { Player, PlayerState } from './player.jsx';
import { AboutPage } from './static.jsx';

import Request from './request.js';
import Utils from './utils.js';

class App extends React.Component {

    constructor(props) {

        super(props);
        this.name = "Refract";
        this.pages = ["home", "tracklist", "about"];
        this.videos = [];
        this.player = null;

        this.state = {
            activePage: 'home',
            activeVideoIdx: 0,
            team: null
        };

        this.init();
    }

    init() {

        const self = this;

        return co(function *init() {

            const parse = JSON.parse.bind(JSON);

            const { teams } = yield Request('GET', '/v0/teams').then(parse)

            if ( !teams.length ) {
                setTimeout(() => {
                    Alert.error('No team data available', {
                        timeout: 'none'
                    });
                }, 1500);

                return;
            }

            // select the first available team
            self.setState({ team: teams[0] });

            const { videos } = yield Request('GET', `/v0/videos?id=${self.state.team.id}`).then(parse);
            self.videos = videos;

            console.log(self.videos);

            if ( !self.videos.length ) {

                setTimeout(() => {
                    Alert.error('No video data available', {
                        timeout: 'none'
                    });
                }, 1500);

                return;
            }

            self.play();

        }).catch((err) => {

            Alert.error('Aw snap. Something broke.', {
                timeout: 'none'
            });

            console.error(err);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        /**
         * there are two kind of state changes that can occur: page switch
         * or track switch.
         *
         * if this is a track switch, play the currently selected video
         */
        if ( this.state.activePage !== prevState.activePage ) {
            return;
        }
        this.play();
    }

    play() {
        let { videos } = this;
        let idx = this.state.activeVideoIdx;
        if ( videos.length ) {
            const video_id = videos[idx].video_id;
            this.player.play(video_id);
        }
    }


    handleNext() {

        let { videos } = this;
        let idx = this.state.activeVideoIdx;
        if ( this.player.state.random ) {
            let old_idx = idx;
            while ( idx === old_idx ) {
                idx = Math.floor(Math.random() * videos.length);
            }
        } else if ( !this.player.state.repeat ) {
            idx = (idx < videos.length-1)?idx+1:0;
        }

        this.setState({
            activeVideoIdx: idx
        });
    }

    handlePrev() {
        let { videos } = this;
        let idx = this.state.activeVideoIdx;
        idx = (idx > 0)?idx-1:videos.length -1;
        this.setState({
            activeVideoIdx: idx
        });
    }


    handleStateChange(event) {
        switch(event.data) {
            case PlayerState.ENDED:
                this.handleNext();
                break;
            case PlayerState.READY:
                Utils.removePreloader();
        }
    }

    handleNav(page) {
        if ( this.state.activePage != page ) {
            this.setState({
                activePage: page
            });
        }
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

        const pageStyle = {
            maxWidth: '854px',
            margin: '0 auto',
            padding: '3rem 2rem'
        };

        const playlistStyle = Object.assign({}, pageStyle, {
            height: '100%',
            overflow: 'auto'
        });

        const playerStyle =  {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };


        const ghost = {
            height: 0
        };

        return (
            <div className="main">
                <Header 
                    name={this.name}
                    navItems={this.pages} 
                    activeItem={this.state.activePage}
                    onNav={(page) => this.handleNav(page)}
                />
                <PageContainer activePage={this.state.activePage}>
                    <Page style={playerStyle} key="home">
                        <TeamInfo team={this.state.team} />
                        <Player 
                            ref={(player) => this.player = player}
                            onNext={() => this.handleNext()} 
                            onPrev={() => this.handlePrev()} 
                            onStateChange={(e) => this.handleStateChange(e)}
                        />
                    </Page>
                    <Page style={pageStyle} key="about">
                        <AboutPage />
                    </Page>
                    <Page style={playlistStyle} key="tracklist">
                        <List 
                            activeIdx={this.state.activeVideoIdx}
                            items={this.videos} 
                            render={renderItem}
                            onClick={(item, index) => { this.setState({activeVideoIdx: index}); } }
                        />
                    </Page>
                </PageContainer>
                <div style={ghost}>
                    <Alert 
                        position='bottom-left' 
                        timeout='none'
                        effect='slide'
                    />                
                </div>
            </div>
        );
    }
};

export default App;
