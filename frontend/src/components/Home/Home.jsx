import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

export function Home(){
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <div className={styles.banner}>
                <div className={styles.name}>Anon</div>
                <ul className={styles.features}>
                    <li className={styles.feature_item}>Features</li>
                    <li className={styles.feature_item}>FAQ</li>
                    <li className={styles.feature_item}>Buy me a coffee</li>
                </ul>
                <button className={styles.create} onClick={()=>navigate('/create')}>Create a room</button>
            </div>
            <div className={styles.hero}>
                <h1>Chat Anonymously, <span className={styles.ch1}>Chat Temporarily</span><br /><span className={styles.spann}>and <span className={styles.ch2}>Disappear</span></span></h1>
                <p className={styles.p1}>Anon provides a secure space for temporary conversations. No sign-up needed. Create/Join a private chat room in seconds and enjoy complete peace of mind knowing when you're done... poof! It's gone.</p>
                <div className={styles.buttons}>
                    <button className={styles.bt1} onClick={()=>navigate('/create')}>Create Room</button>
                    <button className={styles.bt2} onClick={()=>navigate('/join')}>Join Room</button>
                </div>
                <div className={styles.icons}>
                    <div className={styles.ic1}>Secure</div>
                    <div className={styles.ic2}>Private</div>
                    <div className={styles.ic3}>Anonymous</div>
                </div>
            </div>
        </div>
    );
}