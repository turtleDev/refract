'use strict';

import React from 'react';

export class AboutPage extends React.Component {
    render()  {
        return (
            <div>
                <h1>Refract - The Public Slack Jukebox</h1>
                <p>Slack teams are great way to discover new music.</p>
                <p>
                    Teams often have a channel dedicated to music dicussions and links, however
                    it can get very tedious to navigate those links.
                </p>
                <p>
                    What if all you wanted to do was listen to some music? You'd have to manually
                    click on those links, or ask someone to create a play list. Some make it harder
                    than the others (spotify in particular has excellent integration with slack),
                    but not everyone is on spotify ):. A majority of these links are youtube links,
                    and here's where refract comes in.
                </p>
                <p>
                    Refract collects the youtube links from channels in your public slack team, and generates
                    track list you can navigate and play!
                </p>
                <p>
                    Refract is still in early alpha and there are a tons of features planned.
                </p>
                <p>
                    You can follow the development at it's <a href="http://github.com/turtledev/refract">github</a> repository.
                </p>
                <p>
                    Music for you, by you.
                </p>
            </div>
        );
    }
}
