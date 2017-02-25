'use strict';

import React from 'react';
import List from './list.jsx';

import Request from './request.js';

class App extends React.Component {

    constructor() {
        super();
        this.state = { items: [] };
        this.refreshList();
    }

    refreshList() {
        Request('GET', '/v1/list').then((res) => {
            res = JSON.parse(res);
            this.setState({
                items: res.videos
            });
        });
    }

    render() {

        const styles = {
            'maxWidth': '800em',
            'padding': '2em 0'
        };

        return (
            <div style={styles}>
                <h1>Refract</h1>
                <pre>
                    <code>
                    The Slack Jukebox
                    </code>
                </pre>
                <List values={this.state.items} />
            </div>
        );
    }
};

export default App;
