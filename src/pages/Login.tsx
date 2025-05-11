import React, { FormEvent, useEffect, useState } from "react";
import InputField from "../components/InputField";
// import { KeyValueProps } from "../interfaces";
import { apiPost } from "../utils/useApi";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts";
// import { ToastContainer } from "react-toastify";

type LoginState = {
    email: string;
    password: string;
}

function Login() {
    const { getUserData } = useDataContext();
    const [state, setState] = useState<LoginState>({ email: "", password: "" });
    // const [data, setData] = useState<{ message: string; data: KeyValueProps; status: boolean }>();
    const [loading, isLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const formFields: { id: number; label: string; type: string; name: keyof LoginState }[] = [
        { id: 1, label: "Email", type: "email", name: "email" },
        { id: 2, label: "Password", type: "password", name: "password" },
    ];

    useEffect(() => { }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        isLoading(true);

        try {
            const res = await apiPost(`/auth/login`, state);
            setState({ email: "", password: "" })
            isLoading(false);
            const {fullName, email, verified, avatar} = res.data.data;
            localStorage.setItem('userData', JSON.stringify({fullName, email, verified, avatar}));
            getUserData({ fullName, email, verified, avatar });
            localStorage.setItem("token", res.data.token);

            setTimeout(() => navigate('/', { replace: true }), 1500);

        } catch (error) {
            console.log(error)
            isLoading(false);
        }
    }

    return (
        <Form title={"Login"} onSubmit={handleSubmit} loading={loading}>
            {formFields.map(formField => <InputField
                label={formField.label}
                type={formField.type}
                name={formField.name}
                value={state[formField.name]}
                onChange={handleChange}
                className="border p-2 rounded-sm bg-transparent outline-slate-400"
                key={formField.id}
            />)}
        </Form>
    )
}

export default Login
