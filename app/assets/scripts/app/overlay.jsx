'use strict';

import React from 'react';

export class Overlay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    setItem(item) {
        const keys = this.getChildren().map((c) => c.key);
        if ( keys.indexOf(item) == -1 ) {
            this.setState({active: false});
        }
        else {
            this.setState({active: item});
        }
    }

    getChildren() {
        let children = this.props.children;
        if ( !Array.isArray(children) ) {
            children = [children];
        }
        return children;
    }


    render() {

        let style = {
            display: this.state.active?'block':'none',
            position: 'absolute',
            background: 'white',
            top: 0,
            left: 0,
            width: '100%'
        };


        const content = this.getChildren().map((child) => {
            return child.key == this.state.active?child:null;
        });

        return (
            <div style={style}>
                {content}
            </div>
        );
    }
}

export class OverlayItem extends React.Component {
    render() {
        return <div style={this.props.style}>{this.props.children}</div>
    }
}
