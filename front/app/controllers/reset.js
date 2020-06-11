class ResetController extends BaseFormController {
    constructor() {
        super()
        this.svc = new Userapi()
        this.model.getUser().then(res => {
            console.log("res",res)
            this.user = res
            document.getElementById("submitButton").addEventListener("click",function () {resetController.editUser(this)}.bind(res))
            document.getElementById("fieldlogin").value = res.name
            document.getElementById("fieldemail").value = res.email
        })
    }

    editUser(p_user)
    {
        this.user = p_user
        let login = this.validateRequiredField("#fieldlogin",'login')
        let email = this.validateRequiredField("#fieldemail",'email')
        let pswd = this.validateRequiredField('#NfieldPassword','password')
        let Vpswd = this.validateRequiredField('#MfieldPassword','password')
        if (pswd === Vpswd)
        {
            //add new details
            console.log("pswd", pswd)
            this.user.name = login
            this.user.email = email
            this.user.password = pswd
            this.model.updateUser(this.user)
        }else{
            M.toast({html:"passwords not matching"})
        }
    }
}

window.resetController = new ResetController();