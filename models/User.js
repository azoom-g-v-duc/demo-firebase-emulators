const firestore = require('../database')
class User {
  static async getUsers() {
    const snapshot = await firestore.collection('User').get()
    if (snapshot.empty) return []
    return snapshot.docs.map((doc) => doc.data())
  }
  static async createUser(user) {
    const { id } = await firestore.collection('User').add(user)
    return {
      id,
      ...user
    }
  }
}
module.exports = User
