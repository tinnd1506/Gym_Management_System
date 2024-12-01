const db = require('../../infrastructure/Database');

class UserService {
    async viewProfileHandler(req, res) {
        const { id } = req.user; 
        try {
            const user = await db.querySingle('SELECT id, email, username, fitness_goals, workout_preferences FROM users WHERE id = $1', [id]);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async editProfileHandler(req, res) {
        const { id } = req.user; 
        const { email, username, fitnessGoals, workoutPreferences } = req.body;
        try {
            const sql = 'UPDATE users SET email = $1, username = $2, fitness_goals = $3, workout_preferences = $4 WHERE id = $5 RETURNING *';
            const user = await db.querySingle(sql, [email, username, fitnessGoals, workoutPreferences, id]);
            res.json({
                message: "Profile updated successfully!",
                user: user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserService();