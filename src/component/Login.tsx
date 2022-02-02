import { FormEvent, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import '../css/Login.css'

function Login(props: { open: boolean; setOpenLogin: (arg0: boolean) => void; }) {

    const [email, setEmail] = useState("admin@google.com");
    const [password, setPassword] = useState("admin@123");
    const [error, setError] = useState("");

    const storeAuth = (event: FormEvent<HTMLFormElement>) => {
        if (email === "admin@google.com" && password === "admin@123") {
            localStorage.setItem("Auth", JSON.stringify({ email }))
            props.setOpenLogin(false);
        } else {
            event.preventDefault();
            setError("Your Email or Password is Incorrect")
        } 
    }

    return (
        <Modal open={props.open} onClose={() => props.setOpenLogin(false)} center >
            <form onSubmit={(e)=>storeAuth(e)} className="modal-content animate">

                <div className="imgcontainer">
                    <img src="images/3125199.jpg" alt="Avatar" className="avatar" />
                </div>

                <div className="container">
                    <label htmlFor="uname"><b>Email</b></label>
                    <input type="text" value={email} placeholder="Enter Email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" value={password} placeholder="Enter Password"  onChange={(e) => setPassword(e.target.value)} required />
                    <span className="error">{error}</span>
                    <button type="submit" className="loginBtn">Login</button>
                </div>
            </form>
        </Modal>


    )

}

export default Login;