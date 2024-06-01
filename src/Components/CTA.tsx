import { Link } from "react-router-dom";

function CTA() {
    return (
        <section className="cta">
            <p className="cta-text">
                Have a project in mind <br className="hidden sm:block" />
                Let's build something together!
            </p>
            <Link to="/contact" className="btn">
                Contact
            </Link>
        </section>
    );
}

export default CTA;
