'use strict';

import React from 'react';

class List extends React.Component {
    renderNodes() {
        const infoStyle = {
            float: 'right'
        };
        const listStyle = {
            listStyle: 'none'
        };
        const nodes = this.props.items.map((item, index) => {
            return (
                <li style={listStyle} key={index}>
                    <a href="javascript: void(0)" onClick={() => this.props.onClick(item)}>{item.title}
                        <span style={infoStyle}>({item.duration})</span>
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
