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

const setupPost = data => {
  if(data.length) {
    let html = '';
    data.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      const li = `
        <li class="list-group-item list-group-item-action >
          <h5> ${post.title} </h5>
          <p>${post.description} </p>
        </li>
      `;
      html = html + li;
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
      });
  } else {
    console.log('Te saliste sign out');
    setupPost([]);
  }
})