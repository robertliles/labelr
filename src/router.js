import app from 'ampersand-app';
import styles from './styles/main.styl';
import qs from 'qs';
import xhr from 'xhr';
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
        'login': 'login',
        'logout': 'logout',
        'repos': 'repos',
        'auth/callback?:query': 'authCallback'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    repos() {
        this.renderPage(<ReposPage/>);
    },

    // TODO: set up own
    login() {
        window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
            client_id: 'f8dd69187841cdd22a26',
            redirect_uri: window.location.origin + '/auth/callback',
            scope: 'user,repo'
        });
    },

    authCallback(query) {
        query = qs.parse(query);

        xhr({
            url: 'https://labelr-localhost.herokuapp.com/authenticate/' + query.code, // TODO: set up own
            json: true 
        }, (err, req, body) => {
            app.me.token = body.token;
            this.redirectTo('/repos');
        });
    },

    logout() {
        window.localStorage.clear();
        window.location = '/';
    }
});