import React, { FormEvent, useEffect, useState } from "react";
import InputField from "../components/InputField";
import { apiPost } from "../utils/useApi";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

function ForgotPassword() {
  const [state, setState] = useState<{email: string}>({ email: ""});
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const formFields: {
    id: number;
    label: string;
    type: string;
    name: string;
  }[] = [
    { id: 1, label: "Email", type: "email", name: "email" }
  ];

  useEffect(() => {}, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    isLoading(true);

    try {
      const res = await apiPost(`/users/forgot-password`, state);
      setState({ email: ""});
      isLoading(false);
      const temporaryPassword = res.data.data;
      toast.success(`Check your email: ${temporaryPassword}`);

      navigate("/login", { replace: true });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err?.message || "Invalid password");
    } finally {
      isLoading(false);
    }
  };

  return (
    <Form title={"Forgot Password"} onSubmit={handleSubmit} loading={loading}>
      {formFields.map((formField) => (
        <InputField
          label={formField.label}
          type={formField.type}
          name={formField.name}
        //   value={formField.name}
          onChange={handleChange}
          className="border p-2 rounded-sm bg-transparent outline-slate-400"
          key={formField.id}
        />
      ))}
    </Form>
  );
}

export default ForgotPassword;




// import React, { FormEvent, useEffect, useState } from "react";
// import InputField from "../components/InputField";
// // import { KeyValueProps } from "../interfaces";
// import { apiPost } from "../utils/useApi";
// import Form from "../components/Form";
// import { useNavigate } from "react-router-dom";
// import { useDataContext } from "../contexts";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// // import { ToastContainer } from "react-toastify";

// type LoginState = {
//   email: string;
//   password: string;
// };

// function Login() {
//   const { getUserData, login} = useDataContext();
//   const [state, setState] = useState<LoginState>({ email: "", password: "" });
//   // const [data, setData] = useState<{ message: string; data: KeyValueProps; status: boolean }>();
//   const [loading, isLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const formFields: {
//     id: number;
//     label: string;
//     type: string;
//     name: keyof LoginState;
//   }[] = [
//     { id: 1, label: "Email", type: "email", name: "email" },
//     { id: 2, label: "Password", type: "password", name: "password" },
//   ];

//   useEffect(() => {}, []);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     isLoading(true);

//     try {
//       const res = await apiPost(`/auth/login`, state);
//       setState({ email: "", password: "" });
//       isLoading(false);
//       const { fullName, email, verified, avatar } = res.data.data;
//       login({ fullName, email, verified, avatar }, res.data.token);
//       toast.success(`Login successful`);

//       navigate("/", { replace: true });
//     } catch (error) {
//       const err = error as AxiosError;
//       toast.error(err?.message || "Login failed");
//     } finally {
//       isLoading(false);
//     }
//   };

//   return (
//     <Form title={"Login"} onSubmit={handleSubmit} loading={loading}>
//       {formFields.map((formField) => (
//         <InputField
//           label={formField.label}
//           type={formField.type}
//           name={formField.name}
//           value={state[formField.name]}
//           onChange={handleChange}
//           className="border p-2 rounded-sm bg-transparent outline-slate-400"
//           key={formField.id}
//         />
//       ))}
//     </Form>
//   );
// }

// export default Login;
