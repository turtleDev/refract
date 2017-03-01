'use strict';

import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: props.defaultItem
        }
    }

    setActiveItem(item) {
        this.setState({
            activeItem: item
        });
        this.props.onNav(item);
    }

    render() {
        return ( 
            <header className="metabar">
                <div className="container metabar-inner">
                    <div className="metabar-brand">
                        {this.props.name}
                    </div>
                    <div className="metabar-nav">
                        {this.props.navItems.map((item) => 
                            <div 
                                key={item} 
                                onClick={() => this.setActiveItem(item)} 
                                className={"metabar-navitem "+(this.state.activeItem === item?"active":"")}>

                                {item}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
