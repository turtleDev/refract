'use strict';

import React from 'react';


class TeamInfo extends React.Component {

    renderText() {

        if ( !this.props.team ) {
            return null;
        }

        const teamLink = `http://${this.props.team.domain}.slack.com`;
        return (
            <span>
                You are listening to music from 
                <a href={teamLink}>
                    {" " + this.props.team.name}
                </a>
            </span>
        );
    }
    render() {
        const style = {
            margin: 0,
            paddingTop: '2rem'
        };
        return (
            <div style={style}>{this.renderText()}</div>
        );
    }
};

export default TeamInfo;
