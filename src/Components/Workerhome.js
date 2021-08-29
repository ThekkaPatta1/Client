import { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../assets/css/workerhome.css'

class Workerhome extends Component {
    state = {
        work: [],
        search: "",
        workstate: "Pending",
        WUsername: "",
        // config: {
        // headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        // }
    }
    componentDidMount() {
        axios.get("http://localhost:550/work/show")

            .then((response) => {
                console.log(response.data)
                this.setState({
                    work: response.data
                })

            })
            .catch()
    }

    biddedworks = (Wid) => {
        var wid = localStorage.getItem('_id');
        axios.get("http://localhost:550/worker/single/" + wid)
            .then((response) => {
                console.log(response)
                console.log(response.data.WUsername)
               return response.data.WUsername


            })
            alert(this.state.WUsername)
            .catch((err) => {
                console.log(err.response)
            })

        const data = new FormData
        data.append('Wid', Wid)
        data.append('WUsername', this.state.WUsername)

//         axios.post("http://localhost:550/bidded/works", data)
//             .then((response) => {
//                 return response.data.data
//             })
//             .catch((err) => {
//                 console.log(err.response)
//             })

    }
    render() {
        return (
            <div className="workerhome">
                        <br></br><br></br><br></br>
                        <input type='text' placeholder='Search Bar' value={this.state.search}
                            onChange={(event) => { this.setState({ search: event.target.value }) }} />
                        <div class="wrapper">
                            {

                                this.state.work
                                // ((mywork) => {
                                //     if (this.biddedworks.bind(this,mywork._id)=== ""){
                                //         if (mywork.status.toLowerCase().includes(this.state.workstate.toLowerCase()) && this.state.search == "") {

                                //             return mywork
                                //         }
                                //         else if (mywork.status.toLowerCase().includes(this.state.workstate.toLowerCase()) && mywork.Tags.toLowerCase().includes(this.state.search.toLowerCase())) {
                                //             return mywork
                                //         }
                                //         else if (mywork.status.toLowerCase().includes(this.state.workstate.toLowerCase()) && mywork.Workdescription.toLowerCase().includes(this.state.search.toLowerCase())) {
                                //             return mywork
                                //         }
                                //         else { 
                                            
                                //         }
                                //     }
                                    

                                // })
                                .map((mywork) => {
                                    return (
                                        <div className="card">
                                            <img class="card-img-top" style={{ height: "300px", width: "400px" }} src={"http://localhost:550/" + mywork.Wimage} />
                                            <h4 className="card-title p-2">{mywork.Tags}</h4>
                                            <h5 className="card-title p-3">{mywork.Workdescription}</h5>
                                            <h2><Link to={"/bidwork/" + mywork._id}> Bid Now </Link></h2>
                                            <br></br><br></br><br></br>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                
        )
    }
}
export default Workerhome
