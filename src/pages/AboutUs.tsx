import '../styles/AboutUs.css';
import PeterPhoto from '../images/PCphoto.png';
import PaulPhoto from '../images/PEphoto.png';
import RyanPhoto from '../images/RKphoto.png';
import ShauryaPhoto from '../images/SKphoto.png';


/* 
    This is the About Us page and function. It works with App.css
    styles and the code is based on Task 3: HTML and CSS from CISC275.
    When the user moves to the About Us page, each collaborator on the site
    has an image, their name, and their LinkedIn page displayed. 
*/
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
        <img className="profile-photo" src={ShauryaPhoto} alt="A pic of Shaurya" />
        <p>LinkedIn: https://www.linkedin.com/in/shauryak/</p>
    </div>;
}

export default AboutUs;