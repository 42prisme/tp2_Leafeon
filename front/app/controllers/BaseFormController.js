class BaseFormController extends BaseController {
    constructor() {
        super()
    }
    validateRequiredField(selector, name) {
        const value =  $(selector).value
        if ((value == null) || (value === "")) {
            M.toast({html:'Les champs sont obligatoire'})
            $(selector).style.backgroundColor = 'antiquewhite'
            return null
        }
        return value
    }
}
