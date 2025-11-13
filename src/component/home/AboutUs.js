import NavBar from "../Chunks/NavBar";
import home from "../style/Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const AboutUs = () => {

    

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

   
       <section style={{marginTop: "7rem"}} className={[home["block"], home["block-showcase"]].join(' ')}>

            <header className={home["block__header"]}>
               <h2>About Us</h2>
            </header>
        
            
              
               
              <ul className={home["list"]}>
                <li>
                    <div className={home["media"]}>
                 
                    <div className={home["media__body"]} >
                       
                      <p style={{textAlign: "center"}}>
                       At We Deliver, we believe delivery should be simple, reliable, and built around people. What started as a small idea — to make sending and receiving items easier — has grown into a powerful platform that connects customers, riders, and businesses across cities.

We’re transforming the way logistics works by combining smart technology, skilled teams, and a commitment to customer satisfaction. From individual users who need fast parcel delivery to large businesses managing multiple orders, our system is designed for efficiency, transparency, and trust.

Our goal is to take the stress out of moving goods. Whether you’re sending documents across town, delivering groceries to families, or powering e-commerce fulfillment — we ensure your items reach their destination safely and on time. With real-time tracking, flexible payment options, and strong team support, you’re always in control.

Behind every successful delivery is a dedicated team that believes in excellence. Our riders are trained, verified, and supported by advanced logistics tools that make their work smoother and more rewarding. We stand for teamwork, innovation, and service you can count on.

At the heart of our mission is simplicity — making technology work for people, not the other way around. Every click, every route, and every experience is carefully designed to make your day easier.

As we continue to grow, our promise remains the same:
To deliver not just packages, but trust, convenience, and connection — one delivery at a time.

Would you like me to adapt it slightly to fit a specific audience (for example, “for individuals and small businesses” or “for corporate and e-commerce clients”)? That would make it sound even more tailored to your target users.     </p>
                    </div>
                </div>
            </li>



               
        
              </ul>
       
        
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
                            <li onClick={() => navigateToRegister()}><a >Create Account</a></li>
                            <li onClick={() => navigateToLogin()}><a >Login</a></li>
                            <li onClick={() => navigateToAboutUs()}><a >About Us</a></li>
                            <li onClick={() => navigateToContactUs()}><a >Contact Us</a></li>
                            <li onClick={() => navigateToService()}><a >Service</a></li>
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

export default AboutUs;