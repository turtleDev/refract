'use strict';

import React from 'react';


class Controls extends React.Component {

    render() {

        const pullRight = {
            float: 'right'
        };
        
        const ctrlStyle = {
            fontSize: 'large'
        };

        return (
            <div>
                <span>
                    <button onClick={() => this.props.onPrev()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-backward" />
                    </button>
                    <button onClick={() => this.props.onToggle()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-play" />
                    </button>
                    <button onClick={() => this.props.onNext()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-forward" />
                    </button>
                </span>
                <span style={pullRight}>
                    <button onClick={() => this.props.onRandom()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-random" />
                    </button>
                    <button onClick={() => this.props.onRepeat()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-repeat" />
                    </button>
                </span>
            </div>
        );
    }
};

export default Controls;
