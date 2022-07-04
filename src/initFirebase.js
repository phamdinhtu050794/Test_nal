import firebase from 'firebase'

var config = {
    apiKey:"AIzaSyBpenP5RnVteAjC6gkhRguXJeXJguCmIvk",
    projectId:"newplan-44a19",
};

if(!firebase.apps.length){
    firebase.initializeApp(config)
}
