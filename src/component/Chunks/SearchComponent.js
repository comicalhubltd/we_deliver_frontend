 <SignInContainer>
                <Formik
                  initialValues={
                    {
                      status: "",
                      feedback: ""
                    }
                  }
                  validationSchema={deliveryRegistrationSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    errors,
                    handleChange,
                    handleSubmit,
                    values,
                    isSubmitting,
                    touched,
                    handleBlur,
                    setFieldValue
                  }) => { 
                    
                  // const handleFromStateChange = (event) => {
                  //   setFieldValue("from.state", event.target.value);
                  //   setFieldValue("from.lga", ""); // reset LGA when state changes
                  // };


                      
                  // const handleToStateChange = (event) => {
                  //   setFieldValue("to.state", event.target.value);
                  //   setFieldValue("to.lga", ""); // reset LGA when state changes
                  // };


                 
                
                
         
                    return ( 
                    <Card>
               
                      {/*Card Header*/}
                      <p className={style["form-header"]}>{headings[step]}</p>
          
          
                      {step === 1 && 
                      (
                        <>
          
                      
                      
                    <div
                  class={[
             dashboard["card--confirmation"],
               dashboard["card--primary"],
                                          ].join(" ")}
                                        >
                                          <div class={dashboard["card_body"]}>
                                            <div  
                                             style={{
                                             width: "100%",
                                             display: "flex",
                                             justifyContent: "center",
                                             zIndex: 1
                                             }} 
                                             class={dashboard["card--small-head"]}>
                                              <button
                                              
                                                // onClick={navigateToRequest}
                                                className={[
                                                  dashboard["btn"],
                                                  dashboard["btn--block"],
                                                  dashboard["btn--primary"],
                                                ].join(" ")}
                                              >
                                                ACCEPT
                                              </button>

                                                 <button
                                              
                                                // onClick={navigateToRequest}
                                                className={[
                                                  dashboard["btn"],
                                                  dashboard["btn--block"],
                                                  dashboard["btn--secondary"],
                                                ].join(" ")}
                                              >
                                                REJECT
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Type:</span>

                    {state.item?.type}
                  </div>

                   <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>weight:</span>

                    {state.item?.weight}
                  </div>


                    <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Type:</span>

                    {state.item?.type}
                  </div>



                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Distance:</span>

                    {state.distancekm}
                  </div>


                  
                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Fee:</span>

                    {state.deliveryFee}
                  </div>


                        <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Picker Name:</span>

                    {state.pickerName}
                  </div>


                       <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Picker Name:</span>

                    {state.pickerPhone}
                  </div>


                  <p className={style["form-header"]}>FROM Destination</p>

                  <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>State:</span>

                    {state.from?.state}
                  </div>

                 <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>LGA:</span>

                    {state.from?.lga}
                  </div>

                    <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>City:</span>

                    {state.from?.city}
                  </div>


                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Street:</span>

                    {state.from?.street}
                  </div>

                  <p className={style["form-header"]}>To Destination</p>
                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>State:</span>

                    {state.to?.state}
                  </div>

                 <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>LGA:</span>

                    {state.to?.lga}
                  </div>

                    <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>City:</span>

                    {state.to?.city}
                  </div>


                     <div
                    style={{ whiteSpace: "normal" }}
                    class={dashboard["card--details"]}
                  >
                    <span>Street:</span>

                    {state.to?.street}
                  </div>

          
                        </>
                      )}
          
                      
                       
                         {step === 2 && 
                      (

                          <>
            
            <TextField
                                  
        label="Feedback"
       name="item.description"
       value={values.feedback}
        multiline
         rows={4}
          onChange={handleChange}
           onBlur={handleBlur}
           error={touched.feedback && Boolean(errors.feedback)}
             helperText={touched.feedback && errors.feedback}
            fullWidth
              margin="normal"
                      
                                     slotProps={{
                                      formHelperText: {
                                        sx: { fontSize: 15 }, // Increase font size of helper text
                                      },
                                      input: {
                                        style: { fontSize: 18 }, // font size for input text
                                      },
                                      inputLabel: {
                                        style: { fontSize: 16 }, // font size for label text
                                      },
                                    }}
                                  >
                                   
                                
                                  
                                  </TextField>
          
                         <button
                       disabled={isSubmitting}
                      type="submit"
                      onClick={handleSubmit}
                      className={[
                      style["btn"],
                    style["btn--block"],
                      style["btn--primary"],].join(" ")}
                                                      >
                {isSubmitting ? "Submitting..." : "Add Delivery"}
                        </button>
          
                        </>
                     
                      )}
          


          
                      
                      
                
          
          
                    </Card>
                  )}}
                </Formik>
          
                <div className={style.footer__brand}>
                  <img src="/images/logo.png" alt="" />
                  <p className={style.footer__copyright}>
                    {" "}
                    (c) 2025 We Deliver, All Rights Reserved
                  </p>
                </div>
          
                <Snackbar
                  open={open}
                  autoHideDuration={3000} // Automatically hide after 1 second
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "center", horizontal: "center" }} // Position at the top center
                >
                  <div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      BackdropProps={{
                        sx: { backgroundColor: "rgba(157, 152, 202, 0.5)" }, // Darker overlay
                      }}
                      sx={{
                        "& .MuiDialog-paper": {
                          width: "100%",
                          borderRadius: "15px", // Optional: Rounded corners
                        },
                      }}
                    >
                      {alertType === "success" ? (
                        <div
                          style={{ width: "100%", background: "#fff" }}
                          class={[dashboard["card--alert-success"]].join(" ")}
                        >
                          <div class={dashboard["card_body"]}>
                            <span
                              class={[
                                dashboard["icon-container"],
                                dashboard["alert-close"],
                              ].join(" ")}
                            >
                              <IconButton onClick={handleClose}>
                                <Cancel sx={{ fontSize: 30 }} />
                              </IconButton>
                            </span>
          
                            <span class={dashboard["icon-container"]}>
                              <svg
                                class={[
                                  dashboard["icon--big"],
                                  dashboard["icon--success"],
                                ].join(" ")}
                              >
                                <use href="../images/sprite.svg#success-icon"   ></use>
                              </svg>
                            </span>
          
                            <p class={dashboard["alert-message"]}>{message}</p>
                          </div>
                          <p class={dashboard["card_footer"]}>success</p>
                        </div>
                      ) : (
                        <div
                          style={{ width: "100%", background: "#fff" }}
                          class={[dashboard["card--alert-error"]].join(" ")}
                        >
                          <div class={dashboard["card_body"]}>
                            <span
                              class={[
                                dashboard["icon-container"],
                                dashboard["alert-close"],
                              ].join(" ")}
                            >
                              <IconButton onClick={handleClose}>
                                <Cancel sx={{ fontSize: 30 }} />
                              </IconButton>
                            </span>
          
                            <span class={dashboard["icon-container"]}>
                              <svg
                                class={[
                                  dashboard["icon--big"],
                                  dashboard["icon--error"],
                                ].join(" ")}
                              >
                                <use href="../images/sprite.svg#error-icon"   ></use>
                              </svg>
                            </span>
          
                            <p class={dashboard["alert-message"]}>{message}</p>
                          </div>
                          <p class={dashboard["card_footer"]}>error</p>
                        </div>
                      )}
                    </Dialog>
                  </div>
                </Snackbar>
              </SignInContainer>