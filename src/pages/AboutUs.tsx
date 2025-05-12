import '../styles/AboutUs.css';
import PeterPhoto from '../images/PCphoto.png';
import PaulPhoto from '../images/PEphoto.png';
import RyanPhoto from '../images/RKphoto.png';
import GOATphoto from '../images/GOATphoto.jpg';

function AboutUs(): JSX.Element {
    return <div className="about-us-container">
        <h1>Project Collaborators</h1>
        <h3>Peter Chapman</h3>
        <img className="profile-photo" src={PeterPhoto} alt="A pic of Peter" />
        <p>LinkedIn: https://www.linkedin.com/in/peter-chapman-a65731236/</p>
        <h3>Paul Edelman</h3>
        <img className="profile-photo" src={PaulPhoto} alt="A pic of Paul" />
        <p>LinkedIn: https://www.linkedin.com/in/paul-edelman/</p>
        <h3>Ryan Koller</h3>
        <img className="profile-photo" src={RyanPhoto} alt="A pic of Ryan" />
        <p>LinkedIn: https://www.linkedin.com/in/ryan-koller-14792a209/</p>
        <h3>Shaurya Kumar</h3>
        <img className="profile-photo" src={GOATphoto} alt="A pic of Shaurya" />
        <p>LinkedIn: </p>
    </div>;
}

export default AboutUs;