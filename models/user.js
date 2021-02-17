class User{
    constructor(id, firstName, email, lastName, password, phoneNumber) {
        this.id = id;
        this.firstName= firstName;
        this.email= email;
        this.lastName= lastName;
        this.password= password;
        this.phoneNumber= phoneNumber;
    }
    toString() {
        return this.id + ', ' + this.firstName + ', ' + this.email + ', ' + this.lastName + ', ' + this.password + ', ' + this.phoneNumber;
    }
}
module.exports = User;