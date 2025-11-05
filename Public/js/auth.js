// Authentication and session management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadCurrentUser();
    }

    // Load current user from session storage
    loadCurrentUser() {
        try {
            const userData = sessionStorage.getItem('currentUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            this.logout();
        }
    }

    // Save current user to session storage
    saveCurrentUser(user) {
        try {
            this.currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    // Staff authentication with backend + fallback
    async authenticateStaff(email, password) {
        try {
            console.log('🔐 Attempting staff login via backend...');
            
            const response = await fetch('http://localhost:3000/api/auth/staff-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ Staff login successful via backend');
                this.saveCurrentUser(userData);
                return true;
            } else {
                console.log('❌ Backend login failed, using mock data as fallback');
                return this.authenticateStaffMock(email, password);
            }
        } catch (error) {
            console.log('🌐 Backend not reachable, using mock data:', error.message);
            return this.authenticateStaffMock(email, password);
        }
    }

    // Staff authentication mock data (fallback)
    authenticateStaffMock(email, password) {
        const staff = {
            'johnson@hilltops.edu': {
                password: 'teacher123',
                name: 'Mr. Johnson',
                subject: 'mathematics',
                classes: ['grade10_math', 'grade11_math'],
                id: 'T001',
                role: 'teacher'
            },
            'davis@hilltops.edu': {
                password: 'teacher123', 
                name: 'Ms. Davis',
                subject: 'science',
                classes: ['grade10_science', 'grade11_physics'],
                id: 'T002',
                role: 'teacher'
            },
            'wilson@hilltops.edu': {
                password: 'teacher123',
                name: 'Mr. Wilson',
                subject: 'english',
                classes: ['grade10_english', 'grade11_english'],
                id: 'T003',
                role: 'teacher'
            },
            'admin@hilltops.edu': {
                password: 'admin123',
                name: 'Administrator',
                role: 'admin',
                id: 'A001'
            }
        };
        
        const staffMember = staff[email];
        
        if (staffMember && staffMember.password === password) {
            const staffData = {
                ...staffMember,
                email: email,
                role: staffMember.role || 'teacher'
            };
            this.saveCurrentUser(staffData);
            console.log('✅ Staff login successful via mock data');
            return true;
        }
        
        console.log('❌ Staff login failed with mock data');
        return false;
    }

    // Student authentication with backend + fallback
    async authenticateStudent(email, password) {
        try {
            console.log('🔐 Attempting student login via backend...');
            
            const response = await fetch('http://localhost:3000/api/auth/student-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ Student login successful via backend');
                this.saveCurrentUser(userData);
                return true;
            } else {
                console.log('❌ Backend login failed, using mock data as fallback');
                return this.authenticateStudentMock(email, password);
            }
        } catch (error) {
            console.log('🌐 Backend not reachable, using mock data:', error.message);
            return this.authenticateStudentMock(email, password);
        }
    }

    // Student authentication mock data (fallback)
    authenticateStudentMock(email, password) {
        const students = {
            'sarah@hilltops.edu': {
                password: 'student123',
                name: 'Sarah Johnson',
                grade: 'Grade 10',
                classes: ['grade10_math', 'grade10_science', 'grade10_english'],
                id: 'S001'
            },
            'mike@hilltops.edu': {
                password: 'student123',
                name: 'Mike Brown', 
                grade: 'Grade 11',
                classes: ['grade11_math', 'grade11_physics', 'grade11_english'],
                id: 'S002'
            },
            'emma@hilltops.edu': {
                password: 'student123',
                name: 'Emma Davis',
                grade: 'Grade 10', 
                classes: ['grade10_math', 'grade10_science', 'grade10_english'],
                id: 'S003'
            }
        };
        
        const student = students[email];
        
        if (student && student.password === password) {
            const studentData = {
                ...student,
                email: email,
                role: 'student'
            };
            this.saveCurrentUser(studentData);
            console.log('✅ Student login successful via mock data');
            return true;
        }
        
        console.log('❌ Student login failed with mock data');
        return false;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Check if user has specific role
    hasRole(role) {
        return this.isAuthenticated() && this.currentUser.role === role;
    }

    // Check if user is teacher or admin
    isStaff() {
        return this.isAuthenticated() && (this.currentUser.role === 'teacher' || this.currentUser.role === 'admin');
    }

    // Check if user is student
    isStudent() {
        return this.isAuthenticated() && this.currentUser.role === 'student';
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
        
        // Try to call backend logout if available
        this.backendLogout().finally(() => {
            window.location.href = 'index.html';
        });
    }

    // Backend logout (optional)
    async backendLogout() {
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('✅ Backend logout successful');
        } catch (error) {
            console.log('🌐 Backend logout not available, continuing with frontend logout');
        }
    }

    // Redirect based on user role
    redirectBasedOnRole() {
        if (this.isStaff()) {
            window.location.href = 'teacher-dashboard.html';
        } else if (this.isStudent()) {
            window.location.href = 'student-dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    // Protect route - redirect if not authenticated or wrong role
    protectRoute(allowedRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return false;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(this.currentUser.role)) {
            window.location.href = 'index.html';
            return false;
        }

        return true;
    }

    // Check backend status (for debugging)
    async checkBackendStatus() {
        try {
            const response = await fetch('http://localhost:3000/api/status');
            if (response.ok) {
                console.log('✅ Backend is running');
                return true;
            }
        } catch (error) {
            console.log('❌ Backend is not running');
            return false;
        }
    }
}

// Initialize global auth manager
const authManager = new AuthManager();

// Auto-check backend status on load
document.addEventListener('DOMContentLoaded', function() {
    authManager.checkBackendStatus();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, authManager };
}