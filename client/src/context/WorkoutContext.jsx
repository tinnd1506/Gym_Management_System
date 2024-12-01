import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import api from '../api/axios';

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async (searchParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching workouts with params:', searchParams);
      
      const params = new URLSearchParams();
      
      if (searchParams.name?.trim()) {
        params.append('name', searchParams.name.trim());
      }
      if (searchParams.status?.trim()) {
        params.append('status', searchParams.status.trim());
      }
      
      const endpoint = '/workouts/search';
      const queryString = params.toString();
      const url = queryString ? `${endpoint}?${queryString}` : endpoint;
      
      console.log('Making request to:', url);
      
      const response = await api.get(url);
      console.log('Response received:', response.data);
      
      if (response.data.success) {
        setWorkouts(response.data.workouts || []);
      } else {
        console.error('Error in response:', response.data);
        setError(response.data.error || 'Failed to fetch workouts');
        setWorkouts([]);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message || 'Failed to fetch workouts');
      setWorkouts([]);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkout = async (workoutData) => {
    const response = await api.post('/workouts', workoutData);
    if (response.data.success) {
      setWorkouts([...workouts, response.data.workout]);
    }
    return response.data;
  };

  const updateWorkout = async (id, workoutData) => {
    const response = await api.put(`/workouts/${id}`, workoutData);
    if (response.data.success) {
      setWorkouts(workouts.map(w => w.id === id ? response.data.workout : w));
    }
    return response.data;
  };

  const deleteWorkout = async (id) => {
    const response = await api.delete(`/workouts/${id}`);
    if (response.data.success) {
      setWorkouts(workouts.filter(w => w.id !== id));
    }
    return response.data;
  };

  const changeWorkoutStatus = async (id, status) => {
    const response = await api.patch(`/workouts/${id}/status`, { status });
    if (response.data.success) {
      setWorkouts(workouts.map(w => w.id === id ? response.data.workout : w));
    }
    return response.data;
  };

  const value = useMemo(() => ({
    workouts,
    loading,
    error,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    changeWorkoutStatus
  }), [workouts, loading, error, fetchWorkouts, createWorkout, updateWorkout, deleteWorkout, changeWorkoutStatus]);

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => useContext(WorkoutContext);
