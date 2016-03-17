import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'Label',

    getInitialState() {
        const {name, color} = this.props.label;
        return {name, color};
    },

    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
    },

    onColorChange(e) {
        this.setState({
            color: e.target.value.slice(1)
        });
    },

    onClickDelete(e) {
        e.preventDefault();
        this.props.label.destroy();
    },

    onClickEdit(e) {
        e.preventDefault();
        this.props.label.editing = true;
    },

    onClickCancel(e) {
        e.preventDefault();
        const {label} = this.props;

        if (label.saved) {
            this.setState(this.getInitialState());
            label.editing = false;
        } else {
            label.destroy();
        }
    },

    onSubmit(e) {
        e.preventDefault();
        const {label} = this.props;

        if (label.saved) {
            label.update(this.state);
        } else {
            label.save(this.state, {
                success: function() {
                    label.saved = true
                }
            })
        }

        label.editing = false;
    },

    render() {
        const {label} = this.props;
        const {name, color} = this.state;
        const cssColor = '#' + color;
        let content;

        if (label.editing) {
            content = (
                <form onSubmit={this.onSubmit} className='label'>
                    <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
                    <input name='name' onChange={this.onNameChange} value={name}/>
                    <input name='color' onChange={this.onColorChange}  value={cssColor}/>
                    <button type='submit' className='button button-small'>Save</button>
                    <button onClick={this.onClickCancel} type='button' className='button button-small button-unstyled'>cancel</button>
                </form>
            );
        } else {
            content = (
                <div className='label'>
                    <span style={{backgroundColor: cssColor}} className='label-color'>&nbsp;</span>
                    <span>{name}</span>
                    <span onClick={this.onClickEdit} className='octicon octicon-pencil'></span>
                    <span onClick={this.onClickDelete} className='octicon octicon-x'></span>
                </div>
            );
        }

        return (
            <div>{content}</div>
        );
    }
})