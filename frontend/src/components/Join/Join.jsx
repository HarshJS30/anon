import styles from '../Join/Join.module.css';
import icon from "../../assets/transfrly-round.ico";
import { FaUser } from 'react-icons/fa';
import { FaUnlock } from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function Join(){

    const [name,setName] = useState('');
    const [error,setError] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setInputValue(e.target.value);
    }

    function Submit(){
        if ((inputValue.length)!=6){
            setError("Code is of not the right length")
        }else{
            navigate(`/room/${inputValue}`)
        }
    }

    async function GetName(){
        const res = await fetch("https://anon-1rcv.onrender.com/api/create-room")
        if(!res.ok){
            setError("Sorry backend down!")
        }else{
            const data = await res.json();
            setName(data.username)
            localStorage.setItem('username',data.username);
        }
    }

    useEffect(()=>{
        GetName();
    },[])

    return(
        <div className={styles.join}>
            <div className={styles.left}>
                <div className={styles.box}>
                    <div className={styles.iconbox1}>
                        <FaUnlock className={styles.ic1} />
                        <h2 className={styles.head1}>Join a room</h2>
                    </div>
                    <p className={styles.para}>Enter the Code to connect</p>
                    <FaUser className={styles.ic2} />
                    <h5 className={styles.head2}>{name}</h5>
                    <input className={styles.rnc} placeholder='-------' value={inputValue} onChange={handleChange}></input>
                    <button className={styles.jn1} onClick={Submit}>Join this room</button>
                    <button className={styles.cr1} onClick={()=>navigate('/create')}>Create a room</button>
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.right}>
                <img src={icon} className={styles.image} alt="icon"></img>
            </div>
        </div>
    )
}