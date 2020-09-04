if (process.env.NODE_ENV === 'develop') {
  const firebase = require('@firebase/testing')
  const firestore = firebase.initializeTestApp({ projectId: 'azoom-l-x-duy' }).firestore()
  module.exports = firestore
} else {
  const firebase = require('firebase-admin')
  const firestore = firebase.firestore()
  module.exports = firestore
}
