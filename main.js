// Login Change
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

// SignUp Event
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // clean the form
      signupForm.reset();
      // close the modal
      $('#signupmodal').modal('hide')

      console.log('sign up');
    })
    .catch((error) => {
      // Handle Errors 
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

// SignIn Event
const signinForm = document.querySelector("#login-form");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // clean the form
      signupForm.reset();
      // close the modal
      $('#signinmodal').modal('hide')

      console.log('sign in');
    })
    .catch((error) => {
      // Handle Errors 
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

// logOut event
const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(function () {
    // Sign-out successful.
    console.log('sign out');
  }).catch(function (error) {
    // An error happened.
  });
})

// Google login
const googleButton = document.querySelector('#googleLogin');
googleButton.addEventListener('click', e => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      console.log('google sign in')
      // clean the form
      signupForm.reset();
      // close the modal
      $('#signinmodal').modal('hide')
    })
    .catch(error => {
      console.log(error.message);
    })
})

// Facebook Login
const facebookButton = document.querySelector('#facebookLogin')
facebookButton.addEventListener('click', e => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      // clean the form
      signupForm.reset();
      // close the modal
      $('#signinmodal').modal('hide')
    })
    .catch(error => {
      console.log(error.message);
      // clean the form
      signupForm.reset();
    })

})

// Publicaciones post
const postList = document.querySelector('.posts');

const setupPost = data => {
  if (data.length) {
    let html = '';
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title}</h5>
        <p>${post.description}</p>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<p class=" text-center"> Login to see Posts</p>'
  }
}


// Events -> enlistar si está autenticado si no ocultalos
auth.onAuthStateChanged(user => {
  if(user){
    db.collection("posts")
      .get()
      .then((snapshot) => {
        setupPost(snapshot.docs);
        loginCheck(user);
      });
  } else {
    console.log('Te saliste sign out');
    setupPost([]);
    loginCheck(user)
  }
})