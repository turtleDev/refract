'use strict';

import React from 'react';


class Controls extends React.Component {

    render() {

        const pullRight = {
            float: 'right'
        };

        return (
            <div>
                <span>
                    <button onClick={() => this.props.onPrev()} className="button button-clear">prev</button>
                    <button onClick={() => this.props.onToggle()} className="button button-clear">pause/play</button>
                    <button onClick={() => this.props.onNext()} className="button button-clear">next</button>
                </span>
                <span style={pullRight}>
                    <button onClick={() => this.props.onRandom()} className="button button-clear">random</button>
                    <button onClick={() => this.props.onRepeat()} className="button button-clear">repeat</button>
                </span>
            </div>
        );
    }
};

export default Controls;
