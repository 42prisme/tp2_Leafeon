class LoginController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new UserAPI()
    }
    async authenticate() {
        let login = this.validateRequiredField('#fieldLogin', 'Adresse e-mail')
        let password = this.validateRequiredField('#fieldPassword', 'Mot de passe')
        if ((login != null) && (password != null)) {
            console.log(login, password)
            this.svc.authenticate(login, password)
                .then(res => {
                    sessionStorage.setItem("token", res.token)
                    this.model.owner = login;
                    window.location.replace("index.html")
                })
                .catch(err => {
                    console.log(err)
                    if (err == 401) {
                        M.toast({html:"Adresse e-mail ou mot de passe incorrect"})
                    } else {
                        M.toast({html:'Service injoignable ou problème réseau'})
                    }
                })
        }
    }
}

window.loginController = new LoginController()
