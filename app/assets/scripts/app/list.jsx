'use strict';

import React from 'react';

class List extends React.Component {

    renderNodes() {
        const listStyle = {
            listStyle: 'none',
            cursor: 'pointer'
        };

        const Render = this.props.render;

        const nodes = this.props.items.map((item, index) => {
            return (
                <li style={listStyle} key={index} onClick={() => this.props.onClick(item, index)} >
                    <Render {...item}/>
                </li>
            );
        });
        return nodes;
    }

    render() {
        return (
            <ul>{this.renderNodes()}</ul>
        );
    }
}

export default List;
