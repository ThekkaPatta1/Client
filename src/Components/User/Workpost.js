import axios from "axios";
import { Component } from "react";
import '../../assets/css/User/workpost.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class Workpost extends Component {
    state = {
        FullName: "",
        Username: "",
        PhoneNo: "",
        Tags: "",
        Workdescription: "",
        WorkTitle: "",
        WorkImg: [],
    }

    componentDidMount() {
        var u_id = localStorage.getItem('_id');
        axios.get("http://localhost:550/user/single/" + u_id)
            .then((response) => {
                console.log(response)
                this.setState({
                    Username: response.data.UUsername,
                    FullName: response.data.UFullName,
                    PhoneNo: response.data.UPhoneNo,
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    fileHandler = (e) => {
        this.setState({
            WorkImg: e.target.files[0]
        })
    }

    Workpost = (e) => {
        e.preventDefault();
        const data = new FormData() // new line
        data.append('FullName', this.state.FullName)
        data.append('Username', this.state.Username)
        data.append('PhoneNo', this.state.PhoneNo)
        data.append('Tags', this.state.Tags)
        data.append('WorkTitle', this.state.WorkTitle)
        data.append('Workdescription', this.state.Workdescription)
        data.append('WorkImg', this.state.WorkImg)

        axios.post("http://localhost:550/work/post", data)
            .then((response) => {
                console.log(response)
                toast.success("Work Posted Successfully", { autoClose: 1500 });
                window.setTimeout(() => {
                    window.location.href = '/userlanding';
                }, 1500);
            })
            .catch((err) => {
                console.log(err.response)
                toast.error("Work could not be posted", { autoClose: 1500 })
            })

    }
    render() {
        return (
            <div className='pworkpost'>
                <div className="section-contentwp">
                    <h1 class="section-header"><span className="content-header wow fadeIn " data-wow-delay="0.2s"
                        data-wow-duration="2s">POST the WORK that needs to be done</span></h1>
                </div>
                <div className="contact-section">
                    <div className="containerworkpost">
                        <form className='workpostform'>
                            <div className="col-md-6 form-line">
                                <div className="form-group">
                                    <label for="exampleInputUsername">Your name</label>
                                    <input type="text" className="form-control" id="" placeholder=" Enter Name" value={this.state.FullName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputUsername">Your Username</label>
                                    <input type="text" class="form-control" id="" placeholder=" Enter Name" value={this.state.Username}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPhoneNo">Enter Phone Number</label>
                                    <input type="text" class="form-control" id="exampleInputPhoneNo"
                                        placeholder=" Enter Phone Number" value={this.state.PhoneNo} />
                                </div>
                                <div class="form-group">
                                    <label for="picture">Picture</label>
                                    <input type="file" class="form-control" id="picture"
                                        placeholder=" Upload the picture" onChange={this.fileHandler} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputTag">Tags</label><br />
                                    <h4><select name="tags" id="tags" className="form-control" value={this.state.Tags}
                                        onChange={(event) => { this.setState({ Tags: event.target.value }) }}>
                                        <option value="Choose" className="optionTag" >Choose One</option>
                                        <option value="plumber" className="optionTag">Plumber</option>
                                        <option value="mechanic" className="optionTag">Mechanic</option>
                                        <option value="Construction" className="optionTag">Construction</option>
                                    </select>
                                    </h4>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="description"> Work Title</label>
                                    <textarea class="form-control" id="description" placeholder="Enter Your Message"
                                        value={this.state.WorkTitle} onChange={(event) => { this.setState({ WorkTitle: event.target.value }) }}></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="description"> Work Description</label>
                                    <textarea class="form-control" id="description" placeholder="Enter Your Message"
                                        value={this.state.Workdescription} onChange={(event) => { this.setState({ Workdescription: event.target.value }) }}></textarea>
                                </div>
                                <div>

                                    <button type='button' id="btnpost" class='btn btn-secondary' onClick={this.Workpost} >Post the Work</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Workpost