function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "admin" && password === "admin") {
    alert("Login erfolgreich!");
    // Weiterleitung zur Startseite hier möglich
    // window.location.href = "startseite.html";
  } else {
    alert("Benutzername oder Passwort falsch!");
  }
}

