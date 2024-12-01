class User {
    constructor(id, email, username, password, fitnessGoals, workoutPreferences) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.fitnessGoals = fitnessGoals;
        this.workoutPreferences = workoutPreferences;
    }
}

module.exports = User;