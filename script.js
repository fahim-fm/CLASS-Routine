// script.js (used in index.html only)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBomo-m2ELXKmEmZLHthSeRw7migfOrvEU",
  authDomain: "class-routine-885c0.firebaseapp.com",
  projectId: "class-routine-885c0",
  storageBucket: "class-routine-885c0.firebasestorage.app",
  messagingSenderId: "625895455525",
  appId: "1:625895455525:web:0f2f8a53f24494c37a38cc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const routineRef = collection(db, "routines");

const tbody = document.querySelector("#routine-table tbody");

// Load routines
async function loadRoutines() {
  tbody.innerHTML = "";
  const snapshot = await getDocs(routineRef);
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${data.day}</td>
  <td>${data.time}</td>
  <td>${data.subject}</td>
  <td>${data.teacher}</td>
  <td>${data.room}</td>
  <td>${data.department}</td>
  <td>${data.semester}</td>
  <td class="no-print">
    <a href="edit.html?id=${docSnap.id}" class="btn edit-btn">✏️</a>
    <button onclick="deleteRoutine('${docSnap.id}')" class="btn delete-btn">🗑️</button>
  </td>
`;


    tbody.appendChild(tr);
  });
}

loadRoutines();

// Delete
window.deleteRoutine = async (id) => {
  if (confirm("Delete this routine?")) {
    await deleteDoc(doc(db, "routines", id));
    loadRoutines();
  }
};
