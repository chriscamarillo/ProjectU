const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('projects')

exports.addToIndex = functions.firestore.document('projects/{projectId}')
    .onCreate((snapshot) => {
        // Filter based off these items
        const {title, description, createdBy, status, owner} = snapshot.data()
        const objectID = snapshot.id;

        return index.saveObject({title,
            title,
            description,
            createdBy,
            status,
            objectID})
    })

exports.updateIndex = functions.firestore.document('projects/{projectId}')
.onUpdate((change) => {
    const {title, description, createdBy, status, owner} = change.after.data()
    const objectID = snapshot.after.id;

    return index.saveObject({title,
        title,
        description,
        createdBy,
        status,
        objectID})
})


exports.deleteFromIndex = functions.firestore.document('projects/{projectId}')
.onDelete(snapshot => index.deleteObject(snapshot.id));