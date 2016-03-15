import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'Label',

    onClickEdit() {
        this.props.label.editing = true;
    },

    onClickCancel() {
        this.props.label.editing = false;
    },

    render() {
        const {label} = this.props;
        const cssColor = '#' + label.color;
        let content;

        if (label.editing) {
            content = (
                <form className='label'>
                    <span className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
                    <input name='name'/>
                    <input name='color'/>
                    <button type='submit' className='button button-small'>Save</button>
                    <button onClick={this.onClickCancel} type='button' className='button button-small button-unstyled'>cancel</button>
                </form>
            );
        } else {
            content = (
                <div className='label'>
                    <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
                    <span>{label.name}</span>
                    <span onClick={this.onClickEdit} className='octicon octicon-pencil'></span>
                    <span className='octicon octicon-x'></span>
                </div>
            );
        }

        return (
            <div>{content}</div>
        );
    }
})