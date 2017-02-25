'use strict';

import React from 'react';

class App extends React.Component {

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
            </div>
        );
    }
};

export default App;
