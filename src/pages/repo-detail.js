import React from 'react';
import LabelItem from '../components/label-item';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'RepoDetail',

    render() {
        const {repo, labels}  = this.props;

        return (
            <div className='container'>
                <h1>{repo.full_name}</h1>
                <p></p>
                <ul>
                    {labels.map((label) => {
                        return <LabelItem key={label.name} label={label}/>;
                    })}
                </ul>
            </div>
        );
    }
});
