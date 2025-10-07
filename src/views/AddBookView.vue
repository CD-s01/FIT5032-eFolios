<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="number" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" name="name" required />
      </div>
      <br />
      <button type="submit">Add Book</button>
    </form>
  </div>
  <br />
  <div>
    <Booklist />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import Booklist from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')

/** ---------- CREATE ---------- */
const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    const originalName = name.value

    // Add the book to Firestore
    const docRef = await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
    })

    // Listen for the update from the Firebase Function
    let isFirstSnapshot = true
    const unsubscribe = onSnapshot(doc(db, 'books', docRef.id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedData = docSnapshot.data()

        // Added a small delay to ensure capitalizatoin function has time to fire
        // Skip the first snapshot (initial data before Function runs)
        if (isFirstSnapshot) {
          isFirstSnapshot = false
          return
        }

        // Show the capitalized result
        alert(`Book: "${originalName}"\n has been added successfully as:\n"${updatedData.name}"`)
        unsubscribe() // Stop listening after getting the update
      }
    })

    isbn.value = ''
    name.value = ''
  } catch (error) {
    console.error('Error adding book:', error)
    alert('Error adding book')
  }
}

/** ---------- UPDATE ---------- */
function startEdit(row) {
  editId.value = row.id
  editDraft.value = { isbn: row.isbn, name: row.name }
}
function cancelEdit() {
  editId.value = null
  editDraft.value = { isbn: '', name: '' }
}
async function save(id) {
  await updateDoc(doc(db, 'books', id), {
    isbn: Number(editDraft.value.isbn),
    name: editDraft.value.name,
    // updatedAt: serverTimestamp(), // enable if you want
  })
  cancelEdit()
}

/** ---------- DELETE ---------- */
async function remove(id) {
  if (!confirm('Delete this book?')) return
  await deleteDoc(doc(db, 'books', id))
}
</script>
