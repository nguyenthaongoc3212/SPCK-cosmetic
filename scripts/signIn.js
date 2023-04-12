// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNXJO6qsVIJCaXWFTiNR9U7dSZDeUL-8g",
  authDomain: "login-authentication-30b59.firebaseapp.com",
  projectId: "login-authentication-30b59",
  storageBucket: "login-authentication-30b59.appspot.com",
  messagingSenderId: "850079718940",
  appId: "1:850079718940:web:ae32300b27a63edfbbc9d9",
  measurementId: "G-T8VFKY6ZWP"
};

firebase.initializeApp(firebaseConfig);

const userSignIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      alert('Sign in successful');
    })
    .catch(function(error) {
      alert(error.message)
    })
}

const userSignUp = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      alert("Sign up successful!");
    })
    .catch(function (error) {
      alert(error.message);
    });
};

// Lớp (class) Form
class Form {
  constructor(id, fields, onSubmit) {
    this.id = id;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.element = document.getElementById(id);
    this.element.addEventListener("submit", this.onSubmit);
  }

  getData() {
    const data = {};
    this.fields.forEach((field) => {
      if (field.element) {
        data[field.name] = field.getValue();
      }
    });
    return data;
  }

  clear() {
    this.fields.forEach((field) => {
      if (field.element) {
        field.setValue("");
      }
    });
  }

  isValid() {
    let isValid = true;
    this.fields.forEach((field) => {
      if (!field.isValid()) {
        isValid = false;
      }
    });
    return isValid;
  }
}

// Lớp (class) Field
class Field {
  constructor(name, validators) {
    this.name = name;
    this.element = document.getElementsByName(name)[0];
    this.validators = validators || [];
  }

  getValue() {
    return this.element.value;
  }

  isValid() {
    let isValid = true;
    if (this.element) {
      this.validators.forEach((validator) => {
        if (!validator(this.getValue())) {
          isValid = false;
        }
      });
    }
    return isValid;
  }
  setValue(value) {
    if (this.element) {
      this.element.value = value;
    }
  }
}

// Các hàm kiểm tra tính hợp lệ của dữ liệu
const isRequired = (value) => {
  return value.trim() !== "";
};

const isEmail = (value) => {
  // Kiểm tra định dạng email bằng regular expression
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
};

const isPasswordMatched = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Tạo form đăng ký
// const signupFields = [
//   new Field("username", [(value) => isRequired(value)]),
//   new Field("email", [(value) => isRequired(value), (value) => isEmail(value)]),
//   new Field("password", [(value) => isRequired(value)]),
//   new Field("confirm-password", [
//     (value) => isRequired(value),
//     (value) =>
//       isPasswordMatched(value, document.getElementsByName("password")[0].value),
//   ]),
// ];

// const signupForm = new Form("signup-form", signupFields, (event) => {
//   event.preventDefault();
//   if (signupForm.isValid()) {
//     const data = signupForm.getData();
//     console.log(data);
//     userSignUp(data.username, data.password);
//     signupForm.clear();
//   }
// });

// Tạo form đăng nhập
const loginFields = [
  new Field("username", [(value) => isRequired(value)]),
  new Field("password", [(value) => isRequired(value)]),
];

const loginForm = new Form("login-form", loginFields, (event) => {
  event.preventDefault();
  if (loginForm.isValid()) {
    const data = loginForm.getData();
    userSignIn(data.username, data.password);
    loginForm.clear();
  }
});
