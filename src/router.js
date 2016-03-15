import app from 'ampersand-app';
import qs from 'qs';
import xhr from 'xhr';
import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import Layout from './layout';
import ReposPage from './pages/repos';
import RepoDetail from './pages/repo-detail';

export default Router.extend({
    renderPage(page, opts = {layout: true}) {
        if (opts.layout) {
            page = (
                <Layout me={app.me}>
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
        'repo/:owner/:name': 'repoDetail',
        'auth/callback?:query': 'authCallback'
    },

    public() {
        this.renderPage(<PublicPage/>, {layout: false});
    },

    repos() {
        this.renderPage(<ReposPage repos={app.me.repos}/>);
    },

    repoDetail(owner, name) {
        const model = app.me.repos.getByFullName(owner + '/' + name);
        this.renderPage(<RepoDetail repo={model} labels={model.labels}/>);
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
