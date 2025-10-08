/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// const logger = require('firebase-functions/logger')

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { setGlobalOptions } = require('firebase-functions/v2')
const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

setGlobalOptions({ maxInstances: 10 })

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      connectFirestoreEmulator.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

// Firestore trigger: Capitalize book data when a new book is added
exports.capitalizeBookData = onDocumentCreated('books/{bookId}', async (event) => {
  const snapshot = event.data
  if (!snapshot) {
    console.log('No data associated with the event')
    return
  }

  const data = snapshot.data()
  const bookId = event.params.bookId

  // Capitalize the book name
  const capitalizedName = data.name ? data.name.toUpperCase() : data.name

  // Update the document with capitalized data
  await admin.firestore().collection('books').doc(bookId).update({
    name: capitalizedName,
  })

  console.log(`Book ${bookId} capitalized: ${capitalizedName}`)
})

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      res.status(200).send(books)
    } catch (error) {
      console.error('Error retrieving books:', error.message)
      res.status(500).send('Error retrieving books')
    }
  })
})
