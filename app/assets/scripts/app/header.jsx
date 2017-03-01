'use strict';

import React from 'react';

class Header extends React.Component {

    render() {
        return ( 
            <header className="metabar">
                <div className="container metabar-inner">
                    <div className="metabar-brand">
                        {this.props.name}
                    </div>
                    <div className="metabar-nav">
                        {this.props.navItems.map((item) => 
                            <div key={item} onClick={() => this.props.onNav(item)} className={"metabar-navitem "+(this.props.activeItem === item?"active":"")}>
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
