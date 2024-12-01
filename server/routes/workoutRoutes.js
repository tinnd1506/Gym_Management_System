const express = require('express');
const workoutService = require('../domain/Workout/WorkoutService');
const authenticateToken = require('../middleware/authMiddleware');
const validateContentType = require('../middleware/contentTypeMiddleware');

const router = express.Router();

router.get('/', authenticateToken, workoutService.getAllWorkoutsHandler.bind(workoutService));
router.get('/search', authenticateToken, workoutService.searchAndFilterWorkoutsHandler.bind(workoutService));
router.post('/', validateContentType, authenticateToken, workoutService.createWorkoutHandler.bind(workoutService));
router.put('/:id', validateContentType, authenticateToken, workoutService.updateWorkoutHandler.bind(workoutService));
router.delete('/:id', authenticateToken, workoutService.deleteWorkoutHandler.bind(workoutService));
router.patch('/:id/status', validateContentType, authenticateToken, workoutService.changeWorkoutStatusHandler.bind(workoutService));

module.exports = router; 