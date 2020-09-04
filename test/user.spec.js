const User = require('../models/User')
const firestore = require('../database')
const firebase = require('@firebase/testing')

const { expect } = require('chai')

describe('Create user', () => {
  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId: process.env.PROJECT_ID })
  })

  it('Create user successfully', async () => {
    const result = await User.createUser({ username: 'Duc' })
    expect(result).not.to.be.eq(false)
    expect(result).to.have.all.keys(['id', 'username'])
    expect(result.username).to.be.eq('Duc')
    const createdUser = await firestore.collection('User').doc(result.id).get()
    expect(createdUser.exists).to.be.eq(true)
    expect(createdUser.data().username).to.be.eq('Duc')
  })

  it('Get users', async () => {
    const createdUser = await User.createUser({ username: 'Duc' })
    const results = await User.getUsers()
    expect(results.length).to.be.eq(1)
    expect(results[0].username).to.be.eq(createdUser.username)
  })
})
