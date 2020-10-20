import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
// import styles from '../article-preview.module.css'

const Wrapper = styled.div`
  width:  100%;
  background-color: #E9ECEF;

`

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto 0 auto;
  padding: 4rem 1rem;
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

    .forChecked{
        width: calc(100% - 1rem);
        margin-right: 0.5rem;
        margin-top: 0.2rem;
    }
    .half-width{
        width: calc(100% - 1rem);
        margin: 0.5rem;
    }
    .full-width{
        width: calc(100% - 1rem);
        margin: 0.5rem;
        .flex-row{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            label{
              flex-grow: 2;
              width: 100%;
            }
            > div{
                justify-content: flex-start;
                width: auto;
                margin-right: 1rem;
                flex-grow: 1;
             }
        }
    }

    
    @media(min-width: 768px){
        .forChecked{
            width: auto;
            margin-right: 1rem;
            padding-top: 2px;
        }
        .half-width{
             width: calc(50% - 1rem);
            margin: 0.5rem;
        }
        .full-width{
            width: calc(100% - 1rem);
            .flex-row{
              width: 50%;
              flex-direction: row;
              label{
                  flex-grow: unset;
                  width: auto;
                  margin-right: 0.5rem;
                }
                > div{
                    width: auto;
                    flex-grow: unset;
                    
                    &:nth-child(1){
                      margin-right: 1rem;
                    }
                 }
            }
        }
    }
    & label {
        display: block;
        font-size: 80%;
        margin: 0.4rem 0 5px 0;
        border: 0;
    }
    
    & input
     {
      padding: 0.7rem 0.5rem;
      border: 0;
    }
    
    & select,
    & input#visit-date
    {
        padding: 8px 0.5rem;
        border: 0;
        width: 100%;
        border-right: 1rem solid #fff;
    }
`

const VisitForm = () => {

    const [serverState, setServerState] = useState({
        submitting: false,
        status: null
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg }
        });
        if (ok) {
            form.reset();
        }
    };
    const handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: 'post',
            url: 'https://getform.io/f/dfedd077-f1ce-4cd5-bdc3-cca7ec4ea335',
            data: new FormData(form)
        })
            .then(r => {
                handleServerResponse(true, 'We have received your request and will be in contact shortly.', form);
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });
    };
    return (
        <Wrapper>
            <Container>
                <h2>Journalist Enquiry Form</h2>

                <div className="visit-form">
                    <ContactForm onSubmit={handleOnSubmit}>

                        <div className="checkboxes full-width">
                            <div className="flex-row checkboxes">
                                <label className="forChecked">I represent:</label>

                                <div>
                                    <label htmlFor="represent-media">A Media Outlet</label>
                                    <input className="checkbox" type="radio" id="represent-media" name="I Represent a" value="Represent Media" />
                                </div>

                                <div>
                                    <label htmlFor="represent-blog">A Blog/website</label>
                                    <input className="checkbox" type="radio" id="represent-blog" name="I Represent a" value="Represent Blog" />
                                </div>
                            </div>

                        </div>

                        <div className="checkboxes full-width">
                            <div className="flex-row">
                                <label className="forChecked">I would like to:</label>

                                <div>
                                    <label htmlFor="addToMedia">Be added to ACC&apos;s media list</label>
                                    <input className="checkbox" type="checkbox" id="addToMedia" name="Add to ACC's media list" value="Checked" />
                                </div>

                                <div>
                                    <label htmlFor="organiseVisit">Organise a school visit</label>
                                    <input className="checkbox" type="checkbox" id="organiseVisit" name="Organise a school visit" value="Checked" />
                                </div>
                            </div>

                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="Outlet">Name of media outlet or blog:</label>
                            <input type="text" name="Name of outlet" className="form-control" id="Outlet" required="required"/>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="Website">Website:</label>
                            <input type="text" name="Website" id="Website" required="required"/>
                        </div>

                        <div className="form-group half-width ">
                            <label htmlFor="representative-name">Representative&apos;s name:</label>
                            <input type="text" name="Representatives name" className="form-control" id="representative-name" required="required"/>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="representative-title">Representative&apos;s title:</label>
                            <input type="text" name="Representatives title" className="form-control" id="representative-title"
                                    required="required"/>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="representative-email" required="required">Representative&apos;s email</label>
                            <input type="email" name="Representatives email" className="form-control" id="representative-email"
                                   aria-describedby="emailHelp" />
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="representative-mobile">Representative&apos;s mobile:</label>
                            <input type="number" name="Representatives mobile" className="form-control" id="representative-mobile"
                                    required="required"/>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="visitors">Total no. of people visiting:</label>
                            <input type="number" name="no of visitors" className="form-control" id="visitors" required="required"/>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="visitors">Requested visit date:</label>
                            <input type="date" name="Requested visit date" className="form-control" id="visit-date" required="required"/>
                        </div>
                        {/*DATE HERE-------*/}

                        <div className="form-group half-width">
                            <label htmlFor="campus">Which ACC School do you wish to visit?</label>
                            <select className="form-control" id="campus" name="Which school to visit" required="required">
                                <option>Moreton</option>
                                <option>Singleton</option>
                                <option>Marsden Park</option>
                                <option>Hume</option>
                                <option>Darling Downs</option>
                                <option>Southlands</option>
                                <option>Hobart</option>
                                <option>Burnie</option>
                                <option>Launceston</option>
                            </select>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="focus-of-coverage">Focus/topic of coverage:</label>
                            <input type="text" name="Focus of coverage" className="form-control" id="focus-of-coverage" required="required"/>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="require-assistance">What assistance do you require from ACC?</label>
                            <input type="text" name="Assistance required" className="form-control" id="require-assistance" />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="comments">Comments/questions:</label>
                            <textarea type="text" name="Comments" className="form-control" id="comments" cols="40" rows="7" />
                        </div>
                        <br />
                        <button type="submit" className="cta-main" style={{ marginLeft: 'auto', marginRight: '0.5rem'}} disabled={serverState.submitting}>
                            Submit
                        </button>
                        {serverState.status && (
                            <p className={!serverState.status.ok ? "errorMsg" : "formSuccess"}>
                                {serverState.status.msg}
                            </p>
                        )}
                    </ContactForm>
                </div>
            </Container>
        </Wrapper>
    );
};

export default VisitForm;
