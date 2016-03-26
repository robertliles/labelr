import React from 'react';

export default React.createClass({
    render() {
        const {title, body} = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        );
    }
});
