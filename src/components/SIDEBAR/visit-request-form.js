import React, { useState }  from "react"
import axios from "axios";
import styled from 'styled-components'
import styles from '../article-preview.module.css'

const Container = styled.div`
  width:  100% ;
  margin: 2rem 0;
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
            method: "post",
            url: "https://getform.io/f/dfedd077-f1ce-4cd5-bdc3-cca7ec4ea335",
            data: new FormData(form)
        })
            .then(r => {
                handleServerResponse(true, "We have received your request and will be in contact shortly.", form);
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });
    };
    return (
            <Container>
                <h2 style={{ fontSize: '1.1rem' }}>Journalist Enquiry Form</h2>

                <div className="visit-form">
                    <form onSubmit={handleOnSubmit}>

                        <div className="checkboxes">
                            <label>I represent a:</label>
                            <div className="flex-row">
                                <div>
                                    <input className="checkbox" type="radio" id="represent-media" name="I Represent a" value="Represent Media" checked />
                                        <label htmlFor="huey">Media Outlet</label>
                                </div>

                                <div>
                                    <input className="checkbox" type="radio" id="represent-blog" name="I Represent a" value="Represent BlogORweb" />
                                        <label htmlFor="dewey">Blog/website</label>
                                </div>
                            </div>

                        </div>

                        <div className="checkboxes">
                            <label>I would like to:</label>
                            <div className="flex-row">
                                <div>
                                    <input className="checkbox" type="checkbox" id="addToMedia" name="Add to ACC's media list" value="Checked" checked />
                                    <label htmlFor="addToMedia">Add to ACC's media list</label>
                                </div>

                                <div>
                                    <input className="checkbox" type="checkbox" id="organiseVisit" name="Organise a school visit" value="Checked" />
                                    <label htmlFor="organiseVisit">Organise a school visit</label>
                                </div>
                            </div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="Outlet">Name of media outlet our blog:</label>
                            <input type="text" name="Name of outlet" className="form-control" id="Outlet"
                                    required="required"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Website">Website:</label>
                            <input type="text" name="Website" id="Website"
                                   required="required"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="representative-name">Representative's name:</label>
                            <input type="text" name="Representatives name" className="form-control" id="representative-name"
                                    required="required"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="representative-title">Representative's title:</label>
                            <input type="text" name="Representatives title" className="form-control" id="representative-title"
                                    required="required"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="representative-email" required="required">Representative's email</label>
                            <input type="email" name="Representatives email" className="form-control" id="representative-email"
                                   aria-describedby="emailHelp" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="representative-mobile">Representative's mobile:</label>
                            <input type="number" name="Representatives mobile" className="form-control" id="representative-mobile"
                                    required="required"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="visitors">Total no. of people visiting:</label>
                            <input type="number" name="no of visitors" className="form-control" id="visitors"
                                    required="required"/>
                        </div>
                        {/*DATE HERE-------*/}

                        <div className="form-group">
                            <label htmlFor="campus">Which ACC School do you wish to visit?</label>
                            <select className="form-control" id="campus" name="Which school to visit"
                                    required="required">
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

                        <div className="form-group">
                            <label htmlFor="focus-of-coverage">Focus/topic of coverage:</label>
                            <input type="text" name="Focus of coverage" className="form-control" id="focus-of-coverage"
                                   required="required"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="require-assistance">What assistance do you require from ACC:</label>
                            <input type="text" name="Assistance required" className="form-control" id="require-assistance"
                                  />
                        </div>

                        <div className="form-group">
                            <label htmlFor="comments">Comments/questions:</label>
                            <textarea type="text" name="Comments" className="form-control" id="comments" cols="40" rows="5" />
                        </div>
                        <br />
                        <button type="submit" className={styles.ctaMain}  disabled={serverState.submitting}>
                            Submit
                        </button>
                        {serverState.status && (
                            <p className={!serverState.status.ok ? "errorMsg" : "formSuccess"}>
                                {serverState.status.msg}
                            </p>
                        )}
                    </form>
                </div>
            </Container>
    );
};

export default VisitForm;
