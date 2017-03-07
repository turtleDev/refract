'use strict';

import React from 'react';

export class Overlay extends React.Component {

    getChildren() {
        let children = this.props.children;
        if ( !Array.isArray(children) ) {
            children = [children];
        }
        return children;
    }


    render() {

        // should the overlay be shown?
        let shouldDisplay = false;

        const content = this.getChildren().map((child, idx) => {
            const style = {
                display: child.key == this.props.activeItem?'block':'none'
            }

            // if even one item is active, display the overlay
            shouldDisplay = shouldDisplay || ( style.display  != 'none' );

            return <div style={style} key={idx}>{child}</div>;
        });

        let style = {
            display: shouldDisplay?'block':'none',
            position: 'absolute',
            background: 'white',
            top: 0,
            left: 0,
            width: '100%'
        };
    
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
