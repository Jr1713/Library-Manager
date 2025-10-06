// Library array
let library = [];

// Utility: find book index by title
function findBookIndex(bookTitle) {
  const lowerTitle = bookTitle.toLowerCase();
  return library.findIndex(book => book.title === lowerTitle);
}

// Add or update book
function addBook(book) {
  const lowerTitle = book.title.toLowerCase();
  const index = findBookIndex(lowerTitle);

  if (index !== -1) {
    library[index].quantity += book.quantity;
    logToConsole(`"${book.title}" quantity updated`);
  } else {
    library.push({ title: lowerTitle, author: book.author, quantity: book.quantity });
    logToConsole(`"${book.title}" added to library`);
  }
  renderTable();
}

// Remove book
function removeBook(bookTitle, quantity) {
  const lowerTitle = bookTitle.toLowerCase();
  const index = findBookIndex(lowerTitle);

  if (index === -1) {
    logToConsole(`"${bookTitle}" not found`);
    return;
  }

  const book = library[index];

  if (book.quantity < quantity) {
    logToConsole(`Not enough copies of "${bookTitle}" available, remaining: ${book.quantity}`);
  } else if (book.quantity === quantity) {
    library.splice(index, 1);
    logToConsole(`"${bookTitle}" removed from library`);
  } else {
    book.quantity -= quantity;
    logToConsole(`Remaining copies of "${bookTitle}": ${book.quantity}`);
  }
  renderTable();
}

// Find book
function findBook(title) {
  const index = findBookIndex(title);
  if (index !== -1) {
    const book = library[index];
    logToConsole(`Found "${book.title}" by ${book.author} — ${book.quantity} copies available`);
  } else {
    logToConsole(`"${title}" not found`);
  }
}

// Render library table
function renderTable() {
  const tbody = document.getElementById('libraryBody');
  tbody.innerHTML = '';
  library.forEach(book => {
    const row = `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.quantity}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Console output
function logToConsole(message) {
  const consoleDiv = document.getElementById('consoleOutput');
  const time = new Date().toLocaleTimeString();
  consoleDiv.innerHTML += `[${time}] ${message}<br>`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', () => {
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  const qty = parseInt(document.getElementById('bookQuantity').value);

  if (!title || !author || isNaN(qty) || qty <= 0) {
    logToConsole('⚠️ Please enter valid book details.');
    return;
  }

  addBook({ title, author, quantity: qty });
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookQuantity').value = '';
});

document.getElementById('removeBtn').addEventListener('click', () => {
  const title = document.getElementById('bookTitle').value.trim();
  const qty = parseInt(document.getElementById('bookQuantity').value);

  if (!title || isNaN(qty) || qty <= 0) {
    logToConsole('⚠️ Please enter a valid book title and quantity.');
    return;
  }

  removeBook(title, qty);
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookQuantity').value = '';
});

document.getElementById('findBtn').addEventListener('click', () => {
  const title = document.getElementById('bookTitle').value.trim();
  if (!title) {
    logToConsole('⚠️ Please enter a book title to find.');
    return;
  }
  findBook(title);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  library = [];
  renderTable();
  logToConsole('🧹 Library has been reset.');
});
