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
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
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

    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
    })

    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book:', error)
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
