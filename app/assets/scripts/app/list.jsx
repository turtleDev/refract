'use strict';

import React from 'react';

class List extends React.Component {

    renderNodes() {

        const listStyle = {
            listStyle: 'none',
            cursor: 'pointer',
            margin: 0,
            padding: '1rem'
        };

        const Render = this.props.render;

        const nodes = this.props.items.map((item, index) => {
            let cls = '';
            if ( index == this.props.activeIdx ) {
                cls = 'brand-highlight';
            }
            return (
                <li className={cls} style={listStyle} key={index} onClick={() => this.props.onClick(item, index)} >
                    <Render {...item}/>
                </li>
            );
        });

        return nodes;
    }

    render() {
        return (
            <div>
                <ul>{this.renderNodes()}</ul>
            </div>
        );
    }
}

export default List;
