import { useEffect, useState } from "react"
import styles from '../Create/Create.module.css'
import icon from "../../assets/transfrly-round.ico";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

export function Create(){
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();

    async function GetCode() {
        const res = await fetch("http://localhost:3000/api/create-room")
        if (!res.ok) {
            setError("Sorry our backend is down ;(!") 
        } else {
            const data = await res.json();
            setCode(data.code)
            setName(data.username)
            localStorage.setItem('username',data.username)
        }
    }

    useEffect(() => {
        GetCode(); 
    }, [])

    return(
        <div className={styles.create}>
            <div className={styles.left}>
                <div className={styles.box}>
                    <div className={styles.iconbox1}>
                        <FaUnlock className={styles.ic1} />
                        <h2 className={styles.head1}>Create a room</h2>
                    </div>
                    <p className={styles.para}>Your room code is your key. Share it only with those you trust.</p>
                    <FaUser className={styles.ic2} />
                    <h5 className={styles.head2}>{name}</h5>
                    <div className={styles.rnc}>{code}</div>
                    
                    {error && <div className={styles.error}>{error}</div>}
                    
                    <div className={styles.buttons}>
                        <button className={styles.gn1} onClick={GetCode}>Generate Different Code</button>
                        <button className={styles.cr1} onClick={()=>navigate(`/room/${code}`)}>Create this room</button>
                        <button className={styles.jn1} onClick={()=>navigate('/join')}>Join a room</button>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <img src={icon} className={styles.image} alt="icon"></img>
            </div>
        </div>
    )
}