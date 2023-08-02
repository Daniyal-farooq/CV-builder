import React from 'react'
import styles from '../styles/update.module.css'
import Button from 'react-bootstrap/Button';
const update = () => {
  return (
    <>
    <main className={styles.image}>
    <div className={`container ${styles.cont}`}>
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
                <p style={{fontSize:"50px" , fontWeight:"bold" , textAlign:"center"}}>LOGO</p>
                <p style={{fontSize:"20px" , fontWeight:"bolder"  , textAlign:"center" , color:"#2578AC"}}>Update Details</p>
               
                <div className={styles.inner}>
                    <div className="row">
                        <div className="col-12">
                        <label style={{marginTop:"20px"}} >First Name</label>
               
                        </div>
                        <div className="col-12"> <input className={styles.inpt} type='text' /></div>
                        <div className="col-12">
                        <label style={{marginTop:"20px"}} >Last Name</label>
               
                        </div>
                        <div className="col-12"> <input className={styles.inpt} type='text' /></div>
                        <div className="col-12">
                        <label style={{marginTop:"20px"}} >Email</label>
               
                        </div>
                        <div className="col-12"> <input className={styles.inpt} type='text' /></div>
                        <div className="col-12">
                        <label style={{marginTop:"20px"}} >Password</label>
               
                        </div>
                        <div className="col-12"> <input className={styles.inpt} type='text' /></div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-lg-4"><  Button style={{width:"100%" , marginTop:"40px" , backgroundColor:"#0069AC"}} className={styles.btn} variant="primary">Sign in</Button>{' '}</div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
            <div className="col-3"></div>
        </div>
    </div>
    </main>
    </>
  )
}

export default update