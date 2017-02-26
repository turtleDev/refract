'use strict';

import React from 'react';

class List extends React.Component {
    renderNodes() {

        const listStyle = {
            listStyle: 'none'
        };

        const Render = this.props.render;

        const nodes = this.props.items.map((item, index) => {
            return (
                <li style={listStyle} key={index}>
                    <a href="javascript: void(0)" onClick={() => this.props.onClick(item)}>
                        <Render {...item}/>
                    </a>
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
