import '../styles/AboutUs.css';
import PeterPhoto from './images/PC_Professional_Photo.png';

function AboutUs(): JSX.Element {
    return <div className="about-us-container">
        <h1>Peter Chapman</h1>
        <img src={PeterPhoto} alt="A picture of Peter" />
    </div>;
}

export default AboutUs;