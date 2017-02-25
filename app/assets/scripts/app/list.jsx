'use strict';

import React from 'react';

class List extends React.Component {
    renderNodes() {
        const nodes = this.props.values.map((value, index) => {
            return (
                <li key={index}>
                    <a href="#">{value}</a>
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
