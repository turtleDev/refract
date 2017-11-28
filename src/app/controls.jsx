'use strict';

import React from 'react';

export const ControlsState = {
    PLAYING: 1 << 0,
    REPEAT: 1 << 1,
    SHUFFLE: 1 << 2
};

export class Controls extends React.Component {

    render() {

        const pullRight = {
            float: 'right'
        };
        
        const ctrlStyle = {
            fontSize: 'large'
        };

        const state = this.props.state;
        const isPlaying = state & ControlsState.PLAYING;
        const isRepeat = state & ControlsState.REPEAT;
        const isShuffle = state & ControlsState.SHUFFLE;

        const toggleClass = "fa " + (isPlaying?"fa-pause":"fa-play");

        return (
            <div>
                <span>
                    <button onClick={() => this.props.onPrev()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-backward" />
                    </button>
                    <button onClick={() => this.props.onToggle()} className="button button-clear">
                        <i style={ctrlStyle} className={toggleClass} />
                    </button>
                    <button onClick={() => this.props.onNext()} className="button button-clear">
                        <i style={ctrlStyle} className="fa fa-forward" />
                    </button>
                </span>
                <span style={pullRight}>
                    <button onClick={() => this.props.onRandom()} className={"button " + (isShuffle?"button-highlight":"button-clear")}>
                        <i style={ctrlStyle} className="fa fa-random" />
                    </button>
                    <button onClick={() => this.props.onRepeat()} className={"button " + (isRepeat?"button-hightlight":"button-clear")}>
                        <i style={ctrlStyle} className="fa fa-repeat" />
                    </button>
                </span>
            </div>
        );
    }
};

