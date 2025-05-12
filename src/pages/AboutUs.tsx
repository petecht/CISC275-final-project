import '../styles/AboutUs.css';
import PeterPhoto from './images/PC Professional Photo.png';

function AboutUs(): JSX.Element {
    return <div>
        <h1>Peter Chapman</h1>
        <img src={PeterPhoto} alt="A picture of Peter" />;
    </div>;
}

export default AboutUs;