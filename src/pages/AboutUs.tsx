import '../styles/AboutUs.css';
import PeterPhoto from '../images/PCphoto.png';

function AboutUs(): JSX.Element {
    return <div className="about-us-container">
        <h1>Peter Chapman</h1>
        <img src={PeterPhoto} alt="A pic of Peter" />
    </div>;
}

export default AboutUs;