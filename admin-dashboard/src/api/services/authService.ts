import api from "../apiClient";

interface SignupData {
    firstName: string;
    lastName: string;
    phone: string;
    nationalId: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        nationalId: string;
    };
    token: string;
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
    try {
        console.log('Sending signup request:', data);
        const response = await api.post('/auth/register', data);
        console.log('Signup response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
        console.log('Sending login request with data:', data);
        const response = await api.post('/auth/login', data);
        console.log('Login API response:', response.data);

        if (!response.data) {
            throw new Error('No data received from server');
        }

        // Transform the API response to match our expected structure
        const transformedResponse = {
            user: {
                id: response.data.user?.id || response.data.sub || '',
                firstName: response.data.user?.firstName || '',
                lastName: response.data.user?.lastName || '',
                email: data.email,
                phone: response.data.user?.phone || response.data.phoneNumber || '',
                nationalId: response.data.user?.nationalId || ''
            },
            token: response.data.accessToken || response.data.token || ''
        };

        if (!transformedResponse.token) {
            throw new Error('Authentication token missing in response');
        }

        console.log('Transformed login response:', transformedResponse);
        return transformedResponse;
    } catch (error: any) {
        console.error('Login error:', error);

        let errorMessage = 'Login failed';
        if (error.response) {
            errorMessage = error.response.data?.message ||
                error.response.data?.error ||
                error.response.statusText;
        } else if (error.message) {
            errorMessage = error.message;
        }

        console.error('Login error message:', errorMessage);
        throw new Error(errorMessage);
    }
};