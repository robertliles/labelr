import Router from 'ampersand-router';
import styles from './styles/main.styl';

export default Router.extend({
    routes: {
        '': 'public',
        'repos': 'repos'
    },

    public() {
        console.log('public');
    },

    repos() {
        console.log('repos');
    }
});