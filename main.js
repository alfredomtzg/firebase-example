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

// Publicaciones post
const postList = document.querySelector('.posts');


// Events -> enlistar si está autenticado si no ocultalos
auth.onAuthStateChanged(user => {
  if(user){
    console.log('Está logiado sign in');
  } else {
    console.log('Te saliste sign out');
  }
})