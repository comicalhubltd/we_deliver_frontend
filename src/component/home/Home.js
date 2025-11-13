import NavBar from "../Chunks/NavBar";
import home from "../style/Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {



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
        if (collapsible1 === "") {
            setCollapsible1("collapsible--expanded")
        } else {
            setCollapsible1("")
        }
    }

    const handleCollapsible2 = () => {

        if (collapsible2 === "") {
            setCollapsible2("collapsible--expanded")
        } else {
            setCollapsible2("")
        }

    }

    const handleCollapsible3 = () => {

        if (collapsible3 === "") {
            setCollapsible3("collapsible--expanded")
        } else {
            setCollapsible3("")
        }
    }

    const handleCollapsible4 = () => {
        if (collapsible4 === "") {
            setCollapsible4("collapsible--expanded")
        } else {
            setCollapsible4("")
        }
    }

    return (
        <>
            <NavBar />

            <section className={[home.block, home.container].join(" ")}
                style={{ marginTop: "5rem" }}>
                <div className={[home.grid, home["grid--1x2"]].join(" ")}
                    style={{ alignItems: "center", gap: "2rem" }}>


                    <header className={[home.block__header, home.hero__content].join(" ")}
                        style={{ marginTop: "0" }}>
                        <h2>Motion Meets Meaning!</h2>
                        <p className={[home.hero__tagline, home.p].join(" ")}
                            style={{ maxWidth: "500px" }}>
                            We move with precision, powered by integrity, guided by technology, and built on trust. 
                            Every delivery carries our promise — fast, safe, and unforgettable.
                        </p>
                        <button
                            onClick={navigateToRegister}
                            className={[home.btn, home["btn--primary"], home["btn--stretched"]].join(" ")}
                        >
                            Get Started
                        </button>
                    </header>


                    <picture style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            className={home.hero__image}
                            src="/images/miqwii-banner.png"
                            alt="delivery banner"
                            style={{ width: "100%", maxWidth: "480px" }}
                        />
                    </picture>
                </div>
            </section>





            <section className={[home.block, home.container].join(" ")}>
                <header className={home.block__header}>
                    <h2>We-Deliver Mission</h2>
                    <p>Providing fast, reliable, and secure delivery services that connect people and businesses with ease. 
                    We-Deliver is committed to ensuring timely deliveries, exceptional customer experience, 
                    and innovative logistics solutions that make moving goods simple, efficient, and trustworthy.</p>
                </header>


                <header className={home.block__header}>
                    <h2>We-Deliver Vision</h2>
                    <p>To become the most trusted and efficient delivery service across Africa—redefining logistics through innovation, 
                    speed, and reliability, while making every delivery a seamless experience for individuals and businesses alike.</p>
                </header>


                <div className={home["input-group"]} style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <input type="text" placeholder="We Deliver" className="input" />
                    <button className={[home.btn, home["btn--accent"]].join(" ")}>Search</button>
                </div>
                {/* <ul className={[home["list"], home["block-domain__prices"]].join(' ')}>
            <li><span className={[home["badge"], home["badge--secondary"]].join(' ')}>Technology</span></li>
            <li>Integration</li>
            <li> Innovation</li>
            
         <li> Transparency</li>
            
        </ul> */}
            </section>







            {/* <section className={[home["block"], home["container"], home["block-plans"]].join(' ')}>
            <div className={[home["grid"], home["grid--1x3"]].join(' ')}>
        
             <div className={home["plan"]}>
                 <div className={[home["card"], home["card--secondary"]].join(' ')}>
                     <header className={home["card_header"]} >
                        <h3 className={home["plan__name"]} >Phase 1</h3>
                        <span className={home["plan__price"]} >1x</span>
                        <span className={home["plan__billing-cycle"]} >Scale</span>
                        <span className={[home["badge"], home["badge--secondary"], home["badge--small"]].join(' ')}>Strategy</span>
                        <span className={home["plan__description"]}>Strategic Objectives</span>
             
                     </header>
                     <div className={home["card_body"]}>
                         <ul className={[home["list"], home["list--tick"]].join(' ')}>
                             <li className={home["list__item"]}>Deploy 30 vans (10 each in Abuja, Lagos and Kano)</li>
                             <li className={home["list__item"]}>Adopt dual-driver safety model for nonstop delivery</li>
                             <li className={home["list__item"]}>Set up branch offices in all 3 cities (Admin, Service & Storage)</li>
                              <li className={home["list__item"]}>Secure licenses and fleet insurance for compliance</li>
                              
                         </ul>
                         <button onClick={() => navigateToRegister()} className={[home["btn"], home["btn--outline"], home["btn--block"]].join(' ')}>Get Started</button>
                     </div>
                   </div>
             
             </div>
        
        
             <div className={[home["plan"]].join(' ')}>
                 <div className={[home["card"], home["card--primary"]].join(' ')}>
                     <header className={home["card_header"]}>
                        <h3 className={home["plan__name"]}>Phase 2</h3>
                        <span className={home["plan__price"]} >2x</span>
                        <span className={home["plan__billing-cycle"]}>Scale</span>
                        <span className={[home["badge"], home["badge--primary"], home["badge--small"]].join(' ')}>Strategy</span>
                        <span className={home["plan__description"]}>Strategic Objectives</span>
             
                     </header>
                     <div className={home["card_body"]}>
                         <ul className={[home["list"], home["list--tick"]].join(' ')}>
                               <li className={home["list__item"]}>Logistics automation</li>
                             <li className={home["list__item"]}>Smart routing</li>
                             <li className={home["list__item"]}>Digital payments and receipts</li>
                               <li className={home["list__item"]}>Transparent pricing and instant support.</li>
                               <li className={home["list__item"]}>Smart dispatch orchestration</li>
                           
                            
                         </ul>
                         <button onClick={() => navigateToRegister()} className={[home["btn"], home["btn--outline"], home["btn--block"]].join(' ')}>Get Started</button>
                     </div>
                   </div>
             
             </div>
        
        
             <div className={home["plan"]}>
                 <div className={[home["card"], home["card--secondary"]].join(' ')}>
                     <header className={home["card_header"]} >
                        <h3 className={home["plan__name"]}>Phase 3</h3>
                        <span className={home["plan__price"]} >3x</span>
                        <span className={home["plan__billing-cycle"]}>/Scale</span>
                        <span className={[home["badge"], home["badge--secondary"], home["badge--small"]].join(' ')}>Strategy</span>
                        <span className={home["plan__description"]} >Strategic Objectives</span>
             
                     </header>
                     <div className={home["card_body"]}>
                         <ul className={[home["list"], home["list--tick"]].join(' ')}>
                             <li className={home["list__item"]}>Maintain 60–65% operating margin via cost efficiency</li>
                             <li className={home["list__item"]}>Capture 10–15% market share across 3 major cities</li>
                             <li className={home["list__item"]}>Partner with 50 SMEs, 5 e-commerce aggregators, 10 agents</li>
                                 <li className={home["list__item"]}>Sustaining 60–65% profit margins</li>
                         </ul>
                         <button onClick={() => navigateToRegister()} className={[home["btn"], home["btn--outline"], home["btn--block"]].join(' ')}>Get Started</button>
                     </div>
                   </div>
             
             </div>
          </div>
         </section> */}




            <section className={[home.block, home.container].join(" ")}>
                <header className={home.block__header}>
                    <h2>Driven by Purpose</h2>
                    <p>We don’t just move parcels — we move possibilities. 
                        Every route we take strengthens businesses, builds trust, and connects destinies.</p>
                </header>


                {[{
                    title: "Strong Team Support",
                    img: "/images/team@1x.png",
                    icon: "team",
                    text: "Our team stands as the backbone of every success story we create. With experienced professionals across every department, we ensure that every challenge is met with collaboration, dedication, and innovation. Together, we deliver excellence and reliability you can count on."
                }, {
                    title: "Designed for Simplicity",
                    img: "/images/target@1x.png",
                    icon: "easy",
                    text: "Every feature we build is crafted with simplicity in mind. From clean interfaces to seamless functionality, our design ensures that users can focus on what truly matters — getting things done effortlessly. "
                }].map((item, i) => (
                    <article key={i} className={[home.grid, home["grid--1x2"], home.feature].join(" ")}
                        style={{ alignItems: "center", gap: "2rem" }}>
                        <div className={home.feature__content}>
                            <span className={home["icon-container"]}>
                                <svg className={[home.icon, home["icon--primary"]].join(" ")}>
                                    <use href={`../images/sprite.svg#${item.icon}`} />
                                </svg>
                            </span>
                            <h3 className={home.features__heading}>{item.title}</h3>
                            <p>{item.text}</p>
                            <a onClick={navigateToService} className={home["link-arrow"]}>Learn More</a>
                        </div>


                        <img className={home.hero__image} src={item.img} alt={item.title}
                            style={{ width: "100%", maxWidth: "420px" }} />
                    </article>
                ))}
            </section>






            <section>
                <section className={[home["block"], home["block--primary"], home["block--skewed-rigth"], home["block-showcase"]].join(' ')}>

                    <header className={home["block__header"]}>
                        <h2>Insight & Growth Overview</h2>
                    </header>

                    <div className={[home["grid"], home["grid--1x2"]].join(' ')}>
                        <img className={home["hero__image"]} src="/images/ipad@1x.png" alt="" />

                        <ul className={home["list"]}>
                            <li>
                                <div className={home["media"]}>
                                    <div className={home["media__image"]}>
                                        <svg className={[home["icon"], home["icon--white"]].join(' ')}>
                                            <use href="../images/sprite.svg#snap"   ></use>
                                        </svg>
                                    </div>
                                    <div className={home["media__body"]} >
                                        <h3 className={home["media__title"]}>Smart Insights </h3>
                                        <p>
                                            Get real-time updates on deliveries, driver locations, and order performance. With our intuitive dashboard, everything you need to manage your logistics is just a glance away.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={home["media"]}>
                                    <div className={home["media__image"]}>
                                        <svg className={[home["icon"], home["icon--white"]].join(' ')}>
                                            <use href="../images/sprite.svg#graph"   ></use>
                                        </svg>
                                    </div>
                                    <div className={home["media__body"]} >
                                        <h3 className={home["media__title"]}>Growth Analytics </h3>
                                        <p>
                                            Track your business growth with easy-to-read charts and analytics. From daily delivery trends to customer order patterns, WeDeliver helps you visualize your progress and make smarter business decisions. </p>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </div>

                </section>
            </section>








            <section>
                <section className={home["block"]} >
                    <header className={home["block__header"]}>
                        <h2>Real feedback. Real impact.</h2>
                        <p>
                            What Our Customers Are Saying
                        </p>
                    </header>



                    <div className={home["container"]}>
                        <div className={[home["card"], home["testimonial"]].join(' ')}>
                            <div className={[home["grid"], home["grid--1x2"]].join(' ')} >
                                <div className={home["testimonial__image"]}>
                                    <img src="/images/customer1.png" alt="A happy smiling customer" style={{ width: "30%", maxWidth: "420px" }}  />
                                    <span className={home["icon-container"]}>
                                        <svg className={[home["icon"], home["icon--primary"], home["icon--small"]].join(' ')} >
                                            <use href="../images/sprite.svg#quote"   ></use>
                                        </svg>
                                    </span>
                                </div>

                                <blockquote className={home["quote"]}>
                                    <p className={home["quote__text"]} >We Deliver Doesn't just move packages, they move peace of mind</p>
                                    <footer>
                                        <div className={home["media"]}>
                                            <div className={home["media__image"]} >
                                                <svg className={[home["icon"], home["icon--secondary"], home["quote__line"]].join(' ')}>
                                                    <use href="../images/sprite.svg#hyphen"   ></use>
                                                </svg>
                                            </div>
                                            <div className={home["media__body"]}>
                                                <h3 className={[home["media__title"], home["quote__author"]].join(' ')} >IMAM ALIYU</h3>

                                            </div>
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>

                        </div>
                    </div>

                    <div className={home["container"]}>
                        <div className={[home["card"], home["testimonial"]].join(' ')}>
                            <div className={[home["grid"], home["grid--1x2"]].join(' ')} >
                                <div className={home["testimonial__image"]}>
                                    <img src="/images/customer2.png" alt="A happy smiling customer" style={{ width: "30%", maxWidth: "420px" }} />
                                    <span className={home["icon-container"]}>
                                        <svg className={[home["icon"], home["icon--primary"], home["icon--small"]].join(' ')} >
                                            <use href="../images/sprite.svg#quote"   ></use>
                                        </svg>
                                    </span>


                                </div>

                                <blockquote className={home["quote"]}>
                                    <p className={home["quote__text"]} >Dependable curteous, Always on time, the kind of service you remember.</p>

                                    <footer>
                                        <div className={home["media"]}>
                                            <div className={home["media__image"]} >
                                                <svg className={[home["icon"], home["icon--secondary"], home["quote__line"]].join(' ')}>
                                                    <use href="../images/sprite.svg#hyphen"   ></use>
                                                </svg>
                                            </div>
                                            <div className={home["media__body"]}>
                                                <h3 className={[home["media__title"], home["quote__author"]].join(' ')} >HAMIDU MURTALA</h3>

                                            </div>
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>

                        </div>
                    </div>
                </section>
            </section>










            <section>
                <footer className={[home["block"], home["block--primary"], home["footer"]].join(' ')} >
                    <div className={[home["container"], home["grid"], home["footer__sections"]].join(' ')} >


                        <section className={[home["collapsible"], home[collapsible2], home["footer__section"]].join(' ')}>
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
                                    <li>Cash & Digital Payment</li>
                                    <li>Insurance Backed Service</li>
                                    <li>Efective Customer Support</li>
                                    <li>Corporate Delivery Service</li>

                                </ul>
                            </div>

                        </section>

                        <section className={[home["collapsible"], home[collapsible3], home["footer__section"]].join(' ')}>
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
                                    WhatsApp: +2347064939047
                                </p>

                            </div>

                        </section>
                        <section className={home["footer__brand"]}>
                            <img src="/images/logo.png" alt="" />
                            <p className={home["footer__copyright"]}>Copyright 2025 WE DELIVER, All Rights Reserved To The Owners</p>
                        </section>
                    </div>

                </footer>

            </section>


        </>


    );

}

export default Home;