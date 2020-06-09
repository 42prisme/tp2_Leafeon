class LoginController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new UserAPI()
    }
    async authenticate() {
        if (document.getElementById("submitButton").innerText === "REGISTER")
        {
            this.createNewUser()
            return
        }
        let login = this.validateRequiredField('#fieldLogin', 'Adresse e-mail')
        let password = this.validateRequiredField('#fieldPassword', 'Mot de passe')
        if ((login != null) && (password != null)) {
            this.svc.authenticate(login, password)
                .then(res => {
                    console.log("login status", res)
                    if (res === 207)
                    {
                        M.toast({html:"check you're email for the confirmation link"})
                        return
                    }
                    sessionStorage.setItem("token", res.token)
                    sessionStorage.setItem("username", login)
                    window.location.replace("index.html")
                })
                .catch(err => {
                    console.log(err)
                    if (err === 401) {
                        M.toast({html:"user name or password incorrect"})
                    } else {
                        M.toast({html:'connexion problemes'})
                    }
                })
        }
    }
    createNewUser()
    {
        let login = this.validateRequiredField('#cfieldLogin', 'login')
        let password = this.validateRequiredField('#cfieldPassword', 'Mot de passe')
        let email = this.validateRequiredField('#cfieldEmail', 'e-mail')
        if ((login != null) && (password != null) && this.validateEmail(email))
        {
            this.svc.createAccount(login, email, password).then(res => {
                console.log(res)
                if (res.status === 200)
                {
                    window.location.replace("login.html")
                }
            })
        }
        //if not
        if (!this.validateEmail(email) && email != null)
        {
            M.toast({html:"bad email"})
        }
    }

    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    }

    addUser()
    {
        document.getElementById("submitButton").innerText = "REGISTER"
    }
}

window.loginController = new LoginController()
