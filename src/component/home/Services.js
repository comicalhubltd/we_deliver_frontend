import NavBar from "../Chunks/NavBar";
import home from "../style/Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Services = () => {

    

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

      







     









    
    






    
   
        <section style={{marginTop: "7rem"}} className={[home["block"], home["container"]].join(' ')}>
          
             <article style={{marginBottom: 0, marginTop: 0}} className={[home["grid"], home["grid--1x2"], home["feature"]].join(' ')}>
                <div className={home["feature__content"]} >
                    <span className={home["icon-container"]} >
                        <svg className={[home["icon"], home["icon--primary"]].join(' ')}>
                            <use href="../images/sprite.svg#request"   ></use>
                          </svg>
                    </span>
                    <h3 className={home["features__heading"]} >Delivery Request</h3>
                    <p>
                 Easily create and manage delivery requests in just a few taps. 
                 Whether it’s a single parcel or multiple orders, 
                 our platform makes scheduling quick, simple, and reliable.
                  </p>
                       
                </div>
        
                  <div   className={home["feature__content"]} >
                    <span className={home["icon-container"]} >
                        <svg className={[home["icon"], home["icon--primary"]].join(' ')}>
                            <use href="../images/sprite.svg#location"   ></use>
                          </svg>
                    </span>
                    <h3 className={home["features__heading"]} >Location</h3>
                    <p>
                 Track every delivery in real time. Our smart location system ensures accurate pickup and drop-off points, 
                 giving you full visibility and peace of mind. 
                 </p>
                </div>
               
             </article>

             
               <article  style={{margin: 0}} className={[home["grid"], home["grid--1x2"], home["feature"]].join(' ')}>
                <div className={home["feature__content"]} >
                    <span className={home["icon-container"]} >
                        <svg className={[home["icon"], home["icon--primary"]].join(' ')}>
                            <use href="../images/sprite.svg#vehicle"   ></use>
                          </svg>
                    </span>
                    <h3 className={home["features__heading"]} > Vehicles</h3>
                    <p>
             Choose the right vehicle for every delivery — from bikes to vans. We match your package size and urgency with the best option to ensure efficiency and safety. </p>
                       
                </div>
        
                  <div className={home["feature__content"]} >
                    <span className={home["icon-container"]} >
                        <svg className={[home["icon"], home["icon--primary"]].join(' ')}>
                            <use href="../images/sprite.svg#driver"   ></use>
                          </svg>
                    </span>
                    <h3 className={home["features__heading"]} > Drivers</h3>
                    <p>
               Our verified and professional drivers are trained to handle every delivery with care. With constant support and route optimization, they ensure timely and secure service.   
                 </p>
                </div>
               
             </article>


            <article style={{margin: 0}} className={[home["grid"], home["grid--1x2"], home["feature"]].join(' ')}>
                <div className={home["feature__content"]} >
                    <span className={home["icon-container"]} >
                        <svg className={[home["icon"], home["icon--primary"]].join(' ')}>
                            <use href="../images/sprite.svg#customer"   ></use>
                          </svg>
                    </span>
                    <h3 className={home["features__heading"]} >Customer</h3>
                    <p>
               We put our customers first. From seamless app experience to responsive support, every feature is designed to make your deliveries faster, safer, and more convenient
                </p>
                       
                </div>
        
                  <div className={home["feature__content"]} >
                    <span className={home["icon-container"]} >
                        <svg className={[home["icon"], home["icon--primary"]].join(' ')}>
                            <use href="../images/sprite.svg#subscription"   ></use>
                          </svg>
                    </span>
                    <h3 className={home["features__heading"]} >Payment</h3>
                    <p>
              Enjoy flexible and secure payment options. Whether you prefer cash, card, or wallet, our system ensures fast and hassle-free transactions for every delivery. </p>
                      
                </div>
               
             </article>


            
        
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
          
                  <section className={[home["collapsible"], home[collapsible4], home["footer__section"]].join(' ')}>
                    <header className={home["collapsible__header"]}>
                        <h2 className={[home["collapsible__heading"], home["footer__heading"]].join(' ')}>Contact US</h2>
                        <span onClick={() => handleCollapsible4()} className={home["icon-container"]}>
                            <svg className={[home["icon"], home["icon--primary"], home["icon--white"], home["collapsible--chevron"]].join(' ')}>
                                <use href="../images/sprite.svg#chevron"   ></use>
                              </svg>
                        </span>
                    </header>
                    
                
                    <div className={home["collapsible__content"]}>
                       <p>
                        Address: No. 13 Donau creasent Off Amazon Street Maitama, FCT Abuja
                     </p>
        
                     <p>
                        Tel:  +2347064939047, +2348169863672
                    </p>
                     <p>
                        {/* Mail: miqwiitechnologies@gmail.com */}
                    </p>
                     <p>
                        WhatsApp: +2347064939047
                    </p>
        
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

export default Services;