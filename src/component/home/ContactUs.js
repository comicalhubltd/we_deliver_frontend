import NavBar from "../Chunks/NavBar";
import home from "../style/Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const ContactUs = () => {

    

    const [collapsible1, setCollapsible1] = useState("");
    const [collapsible2, setCollapsible2] = useState("");
    const [collapsible3, setCollapsible3] = useState("");
    const [collapsible4, setCollapsible4] = useState("");
    const navigate = useNavigate();


 const navigateToRegister = () => {
    navigate("/customer/register");
  }

  const navigateToLogin = () => {
    navigate("/customer/login");
  }

  const navigateToService = () => {
    navigate("/services");
  }

  const navigateToAboutUs = () => {
    navigate("/about-us");
  }


   const navigateToContactUs = () => {
    navigate("/contact-us");
  }


     const handleCollapsible1 = () => {
        if (collapsible1 === ""){
            setCollapsible1("collapsible--expanded")
        } else {
            setCollapsible1("")
        }
     }

      const handleCollapsible2 = () => {

         if (collapsible2 === ""){
            setCollapsible2("collapsible--expanded")
        } else {
            setCollapsible2("")
        }
        
     }

      const handleCollapsible3 = () => {
        
         if (collapsible3 === ""){
            setCollapsible3("collapsible--expanded")
        } else {
            setCollapsible3("")
        }
     }

      const handleCollapsible4 = () => {
         if (collapsible4 === ""){
            setCollapsible4("collapsible--expanded")
        } else {
            setCollapsible4("")
        }
     }

    return(
        <>
         <NavBar/> 

      







     









    
    






    
   
       <section style={{marginTop: "7rem"}} className={[home["block"], home["block--primary"], home["block-showcase"]].join(' ')}>

            <header className={home["block__header"]}>
               <h2>Contact Us</h2>
            </header>
        
            <div className={[home["grid"], home["grid--1x2"]].join(' ')}>
              
               
              <ul className={home["list"]}>
                <li>
                    <div className={home["media"]}>
                 
                    <div className={home["media__body"]} >
                        <h3 className={home["media__title"]}>Tel </h3>
                      <p>
                      +2347064939047, +2348169863672
                      </p>
                    </div>
                </div>
            </li>



               <li>
                    <div className={home["media"]}>
                 
                    <div className={home["media__body"]} >
                        <h3 className={home["media__title"]}>Mail </h3>
                      <p>
                       comicalhultechnolgies@gmail.com, evercorpmultipurposecoop@gmail.com
                      </p>
                    </div>
                </div>
            </li>


            
                <li>
                    <div className={home["media"]}>
                 
                    <div className={home["media__body"]} >
                        <h3 className={home["media__title"]}>Address </h3>
                      <p>
                         
                      </p>
                    </div>
                </div>
            </li>
               
          
        
              </ul>
            </div>
        
        </section>
        <section>
        <footer className={[home["block"], home["block--primary"], home["footer"]].join(' ')} >
            <div className={[home["container"], home["grid"], home["footer__sections"]].join(' ')} >
            
        
                <section className={[home["collapsible"], home[collapsible2],  home["footer__section"]].join(' ')}>
                    <header className={home["collapsible__header"]}>
                        <h2 className={[home["collapsible__heading"], home["footer__heading"]].join(' ')}>Services</h2>
                        <span onClick={() => handleCollapsible2()} className={home["icon-container"]}>
                            <svg className={[home["icon"], home["icon--primary"], home["icon--white"], home["collapsible--chevron"]].join(' ')}>
                                <use href="../images/sprite.svg#chevron"   ></use>
                              </svg>
                        </span>
                    </header>
                    
                
                   
                    <div className={home["collapsible__content"]}>
                        <ul className={home["list"]} >
                              <li>Inter-state Delivery Network</li>
                            <li>Real-Time Tracking</li>
                            <li>Cash and Digital Payment</li>
                            <li>Insurance Backed Service</li>
 			   <li>Effective Customer Service</li>
			   <li>Corporate Delivery Service</li>
                           
                        </ul>
                    </div>
                
                </section>
        
                 <section className={[home["collapsible"], home[collapsible3],  home["footer__section"]].join(' ')}>
                    <header className={home["collapsible__header"]}>
                        <h2 className={[home["collapsible__heading"], home["footer__heading"]].join(' ')}>LINKS</h2>
                        <span onClick={() => handleCollapsible3()} className={home["icon-container"]}>
                            <svg className={[home["icon"], home["icon--primary"], home["icon--white"], home["collapsible--chevron"]].join(' ')}>
                                <use href="../images/sprite.svg#chevron"   ></use>
                              </svg>
                        </span>
                    </header>
                    
                
                     <div className={home["collapsible__content"]}>
                        <ul className={home["list"]} >
                            <li onClick={() => navigateToRegister()}><a href="#"   >Create Account</a></li>
                            <li onClick={() => navigateToLogin()}><a href="#"   >Login</a></li>
                            <li onClick={() => navigateToAboutUs()}><a href="#"   >About Us</a></li>
                            <li onClick={() => navigateToContactUs()}><a href="#"   >Contact Us</a></li>
                            <li onClick={() => navigateToService()}><a href="#"   >Service</a></li>
                        </ul>
                    </div>
                
                </section>
          
                <section className={home["footer__brand"]}>
                    <img src="/images/logo.png" alt=""/>
                    <p className={home["footer__copyright"]}>Copyright 2025 WE DELIVER, All Rights Reserved To The Owners</p>
                </section>
            </div>
        
        </footer>
        
     </section>
     

        </>
      

    );

}

export default ContactUs;