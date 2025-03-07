import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";


const LoginForm: React.FC = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        try {
            const response = await api.post("/auth/login", { email, password }); // 
            const token = response.data.token;
            localStorage.setItem("token", token); // stores token under the key "token".
            navigate("/products");
        } catch (err: unknown) {
            setError("Login failed - please check credentials");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p style={{color: "red"}}>{error}</p>} 
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;

// track email password, takes form input from client to send to service layer for auth. 
// handleSubmit from form. 