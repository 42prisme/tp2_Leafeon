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
                    sessionStorage.setItem("token", res.token)
                    sessionStorage.setItem("username", login)
                    window.location.replace("index.html")
                })
                .catch(err => {
                    console.log(err)
                    if (err == 401) {
                        M.toast({html:"user name or password incorrect"})
                    } else {
                        M.toast({html:'connexion problemes'})
                    }
                })
        }
    }
    createNewUser()
    {

    }
    addUser()
    {
        document.getElementById("submitButton").innerText = "REGISTER"
    }
}

window.loginController = new LoginController()
