
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// ---------- LOGIN ACCOUNT ---------- //
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("login-input-email").value;
    const password = document.getElementById("login-input-password").value;   
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account){
        alert("Oops! Verifique o usuário ou a senha.");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Oops! Verifique o usuário ou a senha.");
            return;            
        } 
        
        saveSession(email, checkSession);
        window.location.href = "home.html";      

    }


})

// ---------- CREATE ACCOUNT ---------- //
document.getElementById("signup-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("signup-input-email").value;
    const password = document.getElementById("signup-input-password").value;    

    if(email.length < 5){
        alert("Utilize um e-mail válido.");
        return;
    }

    if(password.length < 8){
        alert("Crie uma senha com pelo menos 8 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();
    alert("Conta criada com sucesso!")
});


// ---------- FUNCTIONS ---------- //

function checkLogged (){
    if (session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged){
        saveSession(logged, session);

        window.location.href = "home.html"
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    
    sessionStorage.setItem("logged", data);
}


function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}
