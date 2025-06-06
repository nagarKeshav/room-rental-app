import {auth} from '../Firebase/Firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';



class AuthService {
  // ✅ Signup
async createAccount(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Set the user's display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // ✅ Login
  async loginAccount({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // ✅ Logout
  async logoutAccount() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase logout error:", error);
    }
  }

  // ✅ Get Current User
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // stop listening once we get the user
        resolve(user);
      }, reject);
    });
  }
}

// Singleton instance like Appwrite style
const authService = new AuthService();
export default authService;
