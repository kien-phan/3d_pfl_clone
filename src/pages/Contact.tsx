import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Fox } from "../models/Fox";
import Loader from "../Components/Loader";
import useAlert from "../Hooks/useAlert";
import Alert from "../Components/Alert";

interface FormInterface {
    from_name: string;
    to_name: string;
    from_email: string;
    to_email: string;
    message: string;
}

function Contact() {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState("idle");

    const { alert, showAlert, hideAlert } = useAlert();

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");

    // SUBMIT
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation("hit");

        const formToSend: FormInterface = {
            from_name: form.name,
            to_name: "Adrian",
            from_email: form.email,
            to_email: "kienphan1621@gmail.com",
            message: form.message,
        };
        const formElement = document.createElement("form");

        (Object.keys(formToSend) as (keyof FormInterface)[]).forEach((key) => {
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", key);
            input.setAttribute("value", formToSend[key]);
            formElement.appendChild(input);
        });
        emailjs
            .sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formElement,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                //
                showAlert({
                    text: "Message sent successfully",
                    type: "success",
                });
                //
                setTimeout(() => {
                    hideAlert();
                    setIsLoading(false);
                    setCurrentAnimation("idle");
                    setForm({ name: "", email: "", message: "" });
                }, 3000);

                //
            })
            .catch((error) => {
                setIsLoading(false);
                setCurrentAnimation("idle");
                console.log(error);
                showAlert({
                    text: "I dindt receive your message",
                    type: "danger",
                });
            });
    };

    return (
        <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
            {alert.show && <Alert {...alert} />}
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in Touch</h1>
                <form
                    ref={formRef}
                    className="w-full flex flex-col gap-7 mt-14"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="" className="text-black-500 font-semibold">
                        Name
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="John"
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label htmlFor="" className="text-black-500 font-semibold">
                        Email
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="John@gmail.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label htmlFor="" className="text-black-500 font-semibold">
                        Your Message
                        <textarea
                            rows={4}
                            name="message"
                            className="textarea"
                            placeholder="Let me know how I can help you!"
                            required
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn"
                        disabled={isLoading}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    {/* sub */}
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    {/* environ */}
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -1, 0]}
                            scale={[0.5, 0.5, 0.5]}
                            currentAnimation={currentAnimation}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}

export default Contact;
