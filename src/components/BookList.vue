<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.name }} (ISBN: {{ book.isbn }})</li>
    </ul>
  </div>
  <
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs, onSnapshot, orderBy, limit } from 'firebase/firestore'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

function bindDynamicQuery() {
  const q = query(
    collection(db, 'books'),
    where('isbn', '>', 1000),
    orderBy('isbn', 'asc'),
    limit(10),
  )
  return onSnapshot(q, (snap) => {
    books.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

onMounted(() => {
  fetchBooks() // run once
  bindDynamicQuery() // set up live updates
})
</script>
