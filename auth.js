// // auth.js

// document.getElementById('signupForm').addEventListener('submit', function (e) {
//   e.preventDefault();
  
//   const email = document.getElementById('signupEmail').value;
//   const password = document.getElementById('signupPassword').value;

//   // Store user data in localStorage
//   localStorage.setItem('userEmail', email);
//   localStorage.setItem('userPassword', password);

//   alert('Signup successful! Please login.');
//   window.location.href = 'login.html';
// });

// document.getElementById('loginForm').addEventListener('submit', function (e) {
//   e.preventDefault();

//   const email = document.getElementById('loginEmail').value;
//   const password = document.getElementById('loginPassword').value;

//   // Retrieve user data from localStorage
//   const storedEmail = localStorage.getItem('userEmail');
//   const storedPassword = localStorage.getItem('userPassword');

//   if (email === storedEmail && password === storedPassword) {
//     alert('Login successful!');
//     window.location.href = 'index.html'; // Redirect to the homepage or dashboard
//   } else {
//     alert('Invalid email or password');
//   }
// });
// auth.js

// document.getElementById('loginForm').addEventListener('submit', function (e) {
//   e.preventDefault();

//   const userId = document.getElementById('userId').value;

//   if (userId) {
//     // Assuming successful login
//     alert('Login successful!');
//     window.location.href = 'add-medicine.html';
//   } else {
//     alert('Please enter your User ID');
//   }
// });
// auth.js

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = document.getElementById('userId').value;

  if (userId) {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          window.location.href = 'add-medicine.html';
        } else {
          alert('Invalid User ID');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Wrong ID');
      });
  } else {
    alert('Please enter your User ID');
  }
});
// auth.js

document.getElementById('addUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const newUserId = document.getElementById('newUserId').value;

  if (newUserId) {
    fetch('http://localhost:3000/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: newUserId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('User added successfully!');
          document.getElementById('newUserId').value = ''; // Clear the input field
        } else {
          alert(`Failed to add user: ${data.error}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  } else {
    alert('Please enter a User ID');
  }
});
