import { Component } from "react";
import axios from 'axios';
import '../assets/css/workerhome.css'

class userhome extends Component {
    state = {
        work: [],
        search:"",
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }
    componentDidMount() {
        axios.get("http://localhost:550/worker/show")

            .then((response) => {
                console.log(response.data)
                this.setState({
                    work: response.data
                })

            })
            .catch()

    }

    render() {

        return (
            <div className="container">
               
                <div classNamer="row p-5">
                    <div className="col p-5">
                        <br></br>
                    <input type='text' placeholder='Search Bar' value={this.state.search}
                    onChange={(event) => { this.setState({ search: event.target.value }) }} />
                                    <div class="wrapper">
                                        {
                                        this.state.work.filter((mywork) => {
                                            if (this.state.search==""){
                                                return mywork
                                            }
                                            else if(mywork.WSkills.toLowerCase().includes(this.state.search.toLowerCase())){
                                                return mywork
                                            } 
                                             else if(mywork.WFullName.toLowerCase().includes(this.state.search.toLowerCase())){
                                                return mywork
                                            }
                                            
                                        }).map((mywork) => {
                                            return (
                                                <div className="card">
                                                    <img class="card-img-top" style={{ height: "300px", width: "500px" }} src={"http://localhost:550/" + mywork.Wimage} />
                                                    <h4 className="card-title p-2">{mywork.WSkills}</h4>                                                   
                                                    <h5 className="card-title p-3">{mywork.WFullName}</h5>
                                                    <button className="bg-primary">Bid Now</button>
                                                </div>


                                            )
                                        })

                                        }
                                    </div>
                            
                </div>
                </div>
            </div >


        )
    }
}
export default userhome