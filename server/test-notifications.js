// Test script for notifications
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';
let authToken = '';

// Login to get token
async function login() {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username: 'supradmin',
            password: '12345678'
        });
        authToken = response.data.token;
        console.log('Login successful');
    } catch (error) {
        console.error('Login failed:', error.message);
    }
}

// Test registration notification
async function testRegistrationNotification() {
    try {
        const response = await axios.post(`${API_URL}/notification/create/request`, {
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser',
            email: 'test@example.com',
            phone: '1234567890',
            password: 'testpassword123'
        });
        console.log('Registration notification created:', response.data);
    } catch (error) {
        console.error('Failed to create registration notification:', error.message);
    }
}

// Test urgent task notification
async function testUrgentTaskNotification() {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const response = await axios.post(`${API_URL}/task/create`, {
            title: 'Urgent Test Task',
            description: 'This is a test task due tomorrow',
            priority: 'high',
            dueDate: tomorrow.toISOString(),
            assignedTo: 'EMPLOYEE_ID' // Replace with actual employee ID
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Urgent task created:', response.data);
    } catch (error) {
        console.error('Failed to create urgent task:', error.message);
    }
}

// Test refund approval notification
async function testRefundNotification() {
    try {
        const response = await axios.post(`${API_URL}/approval/create/refund`, {
            amount: '1000',
            clientName: 'Test Client',
            reason: 'Test Refund Request'
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Refund notification created:', response.data);
    } catch (error) {
        console.error('Failed to create refund notification:', error.message);
    }
}

// Check notifications
async function checkNotifications() {
    try {
        const response = await axios.get(`${API_URL}/notification/get/all`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Current notifications:', response.data);
    } catch (error) {
        console.error('Failed to fetch notifications:', error.message);
    }
}

// Run all tests
async function runTests() {
    await login();
    await testRegistrationNotification();
    await testUrgentTaskNotification();
    await testRefundNotification();
    await checkNotifications();
}

runTests(); 