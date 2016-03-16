import Model from 'ampersand-model';
import xhr from 'xhr';
import githubMixin from '../helpers/github-mixin';

export default Model.extend(githubMixin, {
    idAttribute: 'name',

    props: {
        name: 'string',
        color: 'string'
    },

    session: {
        editing: {
            type: 'boolean',
            default: false
        },
        saved: {
            type: 'boolean',
            default: true
        }
    },

    isNew() {
        return !this.saved;
    },

    update(attrs) {
        const oldAttrs = this.getAttributes({props: true, session: false});

        xhr({
            url: this.url(),
            json: attrs,
            method: 'PATCH',
            headers: {
                Authorization: 'token ' + app.me.token // TODO: DRY
            }
        }, (err, req, body) => {
            if (err) {
                this.set(oldAttrs);
                console.error('Something went wrong!');
            }
        });

        this.set(attrs);
    }
});
