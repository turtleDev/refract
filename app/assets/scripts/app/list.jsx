'use strict';

import React from 'react';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: props.activeIdx || 0
        }
    }

    setActive(idx) {
        this.setState({
            active: idx
        });
    }

    onClick(item, idx) {
        this.setActive(idx);
        this.props.onClick(item, idx);
    }

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
            if ( index == this.state.active ) {
                cls = 'brand-highlight';
            }
            return (
                <li className={cls} style={listStyle} key={index} onClick={() => this.onClick(item, index)} >
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
