import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", { email, password });
            navigate("/login");
        } catch (err: unknown) {
            setError("Registration failed. Please enter valid email and password");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
                <button type="submit">Register</button>
            </form>
        </div>
    )
};

export default RegisterForm;