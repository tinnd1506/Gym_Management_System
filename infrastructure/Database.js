const axios = require('axios');
const BASE_URL = 'http://localhost:5001'; // Base URL for json-server

class Database {
    // Membership methods
    async getMemberships() {
        try {
            const response = await axios.get(`${BASE_URL}/memberships`);
            return response.data;
        } catch (error) {
            console.error('Error fetching memberships:', error.message);
            throw error;
        }
    }

    async addMembership(membership) {
        try {
            const response = await axios.post(`${BASE_URL}/memberships`, membership);
            return response.data;
        } catch (error) {
            console.error('Error adding membership:', error.message);
            throw error;
        }
    }

    // Class methods
    async getClasses() {
        try {
            const response = await axios.get(`${BASE_URL}/classes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching classes:', error.message);
            throw error;
        }
    }

    async addClass(classInstance) {
        try {
            const response = await axios.post(`${BASE_URL}/classes`, classInstance);
            return response.data;
        } catch (error) {
            console.error('Error adding class:', error.message);
            throw error;
        }
    }

    // Trainer methods
    async getTrainers() {
        try {
            const response = await axios.get(`${BASE_URL}/trainers`);
            return response.data;
        } catch (error) {
            console.error('Error fetching trainers:', error.message);
            throw error;
        }
    }

    async addTrainer(trainer) {
        try {
            const response = await axios.post(`${BASE_URL}/trainers`, trainer);
            return response.data;
        } catch (error) {
            console.error('Error adding trainer:', error.message);
            throw error;
        }
    }
}

module.exports = new Database();
