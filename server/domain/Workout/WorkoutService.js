const db = require('../../infrastructure/Database');

class WorkoutService {
    async getAllWorkoutsHandler(req, res) {
        try {
            const workouts = await db.query('SELECT * FROM workouts');
            res.json(workouts);
        } catch (error) {
            console.error('Error fetching workouts:', error);
            res.status(500).json({ 
                error: 'Internal Server Error', 
                message: error.message 
            });
        }
    }

    async createWorkoutHandler(req, res) {
        const { name, description, status } = req.body;
        try {
            const sql = 'INSERT INTO workouts (name, description, status) VALUES ($1, $2, $3) RETURNING *';
            const workout = await db.querySingle(sql, [name, description, status]);
            res.status(201).json({
                success: true,
                message: "Workout added successfully!",
                workout: workout
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateWorkoutHandler(req, res) {
        const { id } = req.params;
        const { name, description, status } = req.body;
        try {
            const sql = 'UPDATE workouts SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *';
            const workout = await db.querySingle(sql, [name, description, status, id]);
            
            if (!workout) {
                return res.status(404).json({ message: "Workout not found." });
            }

            res.json({
                success: true,
                message: "Workout updated successfully!",
                workout: workout
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteWorkoutHandler(req, res) {
        const { id } = req.params;
        try {
            const sql = 'DELETE FROM workouts WHERE id = $1 RETURNING *';
            const workout = await db.querySingle(sql, [id]);
            
            if (!workout) {
                return res.status(404).json({ message: "Workout not found or could not be deleted." });
            }

            res.json({
                success: true,
                message: "Workout deleted successfully!",
                workout: workout
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async changeWorkoutStatusHandler(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        
        try {
            // Validate status value
            const validStatuses = ['active', 'inactive'];
            if (!status || !validStatuses.includes(status.toLowerCase())) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid status value',
                    details: `Status must be one of: ${validStatuses.join(', ')}`
                });
            }

            // Check if workout exists
            const checkSql = 'SELECT * FROM workouts WHERE id = $1';
            const existingWorkout = await db.querySingle(checkSql, [id]);
            
            if (!existingWorkout) {
                return res.status(404).json({
                    success: false,
                    error: 'Workout not found',
                    details: `No workout found with id: ${id}`
                });
            }

            // Update workout status
            const sql = 'UPDATE workouts SET status = $1 WHERE id = $2 RETURNING *';
            const workout = await db.querySingle(sql, [status.toLowerCase(), id]);
            
            return res.json({
                success: true,
                message: "Workout status updated successfully!",
                workout: workout
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async searchAndFilterWorkoutsHandler(req, res) {
        try {
            const { name, status } = req.query;
            console.log('Search Params:', { name, status });
            
            // Validate query parameters
            const allowedParams = ['name', 'status'];
            const receivedParams = Object.keys(req.query);
            const invalidParams = receivedParams.filter(param => !allowedParams.includes(param));
            
            if (invalidParams.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid query parameters',
                    details: `Allowed parameters are: ${allowedParams.join(', ')}. Invalid parameters received: ${invalidParams.join(', ')}`
                });
            }

            const conditions = [];
            const params = [];
            
            if (name) {
                params.push(`%${name}%`);
                conditions.push(`name ILIKE $${params.length}`);
            }
            
            if (status) {
                const validStatuses = ['active', 'inactive'];
                if (!validStatuses.includes(status.toLowerCase())) {
                    return res.status(400).json({
                        success: false,
                        error: 'Invalid status value',
                        details: `Status must be one of: ${validStatuses.join(', ')}`
                    });
                }
                params.push(status.toLowerCase());
                conditions.push(`LOWER(status) = $${params.length}`);
            }
            
            const sql = `
                SELECT * FROM workouts 
                ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
                ORDER BY name ASC
            `;
            
            const workouts = await db.query(sql, params);
            
            return res.json({
                success: true,
                count: workouts.length,
                workouts: workouts
            });
        } catch (error) {
            console.error('Error searching workouts:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }    
}    
module.exports = new WorkoutService();
