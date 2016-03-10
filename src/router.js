import styles from './styles/main.styl';

import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import Layout from './layout';
import ReposPage from './pages/repos';

export default Router.extend({
    renderPage(page, opts = {layout: true}) {
        if (opts.layout) {
            page = (
                <Layout>
                    {page}
                </Layout> 
            );
        }

        React.render(page, document.body);
    },

    routes: {
        '': 'public',
        'public': 'public',
        'repos': 'repos'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    repos() {
        this.renderPage(<ReposPage/>);
    }
});