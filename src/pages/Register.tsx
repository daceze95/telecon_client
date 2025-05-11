import React, { FormEvent, useEffect, useState } from "react";
import InputField from "../components/InputField";
import { KeyValueProps } from "../interfaces";
import { apiPost } from "../utils/useApi";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

type RegisterState = {
  email: string;
  fullName: string;
  password: string;
}

function Register() {
  const [state, setState] = useState<RegisterState>({ email: "", fullName: "", password: "" });
  const [data, setData] = useState<{ message: string; data: KeyValueProps; status: boolean }>();
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const formFields: { id: number; label: string; type: string; name: keyof RegisterState }[] = [
    { id: 1, label: "Email", type: "email", name: "email" },
    { id: 2, label: "Full Name", type: "text", name: "fullName" },
    { id: 3, label: "Password", type: "password", name: "password" },
  ];
  useEffect(() => { }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    isLoading(!loading);

    try {
      const res = await apiPost(`/auth/signup`, state);
      setState({ email: "", fullName: "", password: "" });
      isLoading(false);
      setTimeout(() => navigate('/login', {replace: true}), 1500);
      console.log(res.data)

    } catch (error) {
      console.log(error)
      isLoading(false);
    }
  }

  return (
    <Form title={"Register"} onSubmit={handleSubmit} loading={loading}>
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

export default Register
