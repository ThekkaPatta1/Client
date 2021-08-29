import { Component, React, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios'
import '../assets/css/adminshowprofile.css'
import { Link, useParams, useHistory } from 'react-router-dom';
import { RestaurantOutlined } from "@material-ui/icons";
import { start } from "@popperjs/core";




function Workbidder() {
    const id = useParams()
    const routerHistory = useHistory();
    const [bidder, setBidder] = useState([])
    const [receiverId, setReceiverId] = useState()
    const [status, setStatus] = useState("")
    const [UUsername, setUUsername] = useState([])
    const [WUsername, setWUsername] = useState([])
    // const [bidder, setBidder] = useState([])
    // state = {
    //     Wid: useParams,
    //     receiverId: '',
    //     bidder: [],
    //     UUsername: '',
    //     WUsername: '',
    //     nType: 'Hire',
    //     status: '',


    // }

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await axios.get("http://localhost:550/works/bidder/" + id._id)
                setBidder(response.data)

                const res = await axios.get("http://localhost:550/work/single/" + id._id)
                setStatus(res.data.status)


                var _id = localStorage.getItem('_id');
                const result = await axios.get("http://localhost:550/user/single/" + _id)
                setUUsername(result.data.UUsername)

            }
            catch (err) {
                console.log(err)
            }
        }
        getdata()
    }, [])


    // const hire = (WUsername) => {
    //     const data = new FormData()
    //     data.append('WUsername', WUsername)
    //     data.append('Wid', id._id)
    //     alert(WUsername)

    //     axios.post("http://localhost:550/hire/worker", data)
    //         .then(() => {
    //             alert("Worker has been hired")
    //             startconversation(WUsername)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             alert("Api not hit")
    //         })

    // }

    const getWUsername = async (WUsername) => {
        try {
            await axios.get('http://localhost:550/worker/one/' + WUsername)
            .then((res)=>{
                setReceiverId(res.data._id)
                startconversation(WUsername)
            })
            .catch((err)=>{
                console.log(err)
            })
           
        }
        catch (err) {
            console.log(err)
        }

    }

    const startconversation = async (WUsername) => {
        var _id = localStorage.getItem('_id');
        console.log(_id)
        console.log(receiverId)
        const data = new FormData()
        data.append('senderId', _id)
        data.append('receiverId', receiverId)

        await axios.post('http://localhost:550/conversation', data)
            console.log('conversation started')
            startmessage(WUsername, receiverId, _id)



    }

    const startmessage = (WUsername, receiverId, senderId) => {
        var conversationId;
        const data = new FormData()
        data.append('senderId', senderId)
        data.append('receiverId', receiverId)

        axios.get('http://localhost:550/getconversation', data)
            .then((response) => {
                conversationId = response.data._id
            })

        const data2 = new FormData()
        data2.append('conversationId', conversationId)
        data2.append('sender', senderId)
        data2.append('text', 'Hey, I have have you for a work. Please, try to complete it within the time')

        axios.post('http://localhost:550/messages', data2)
            .then(() => {
                console.log('conversation started')
                setnotification(WUsername)
            })

    }


    const setnotification = async (WUsername) => {
        const workid = id._id
        const data = new FormData()
        data.append('Workid', workid)
        data.append('WUsername', WUsername)
        data.append('UUsername', UUsername)
        data.append('nType', "Hire")

        axios.post("http://localhost:550/post/notification", data)
            .then((response) => {
                console.log(response.data.message);
                routerHistory.push({
                    pathname: '/hiredworker',
                    state: {
                        workid: workid,
                        WUsername: WUsername
                    }
                })
            })

    }

    return (
        <div className="alignment">
            <br></br><br></br><br></br><br></br>
            {
                bidder.map((mybidder) => {
                    return (
                        <div>
                            <table class="table table-stripped">
                                <thead>
                                    <tr>
                                        <th scope="col" width="90px">Username</th>
                                        <th scope="col" width="90px">Bid Price</th>
                                        <th scope="col" width="90px">Worktime</th>
                                        <th scope="col" width="90px">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{mybidder.WUsername}</td>
                                        <td>Rs.{mybidder.Bidprice}</td>
                                        <td>{mybidder.Worktime}</td>

                                        <td><a className="btn btn-outline-info p-3" ><Link to={"/Profile/" + mybidder.WUsername}>View Profile</Link></a></td>
                                        <td>
                                            {
                                                status === 'Pending' ?
                                                    <button className="btn btn-outline-success p-3" onClick={() => getWUsername(mybidder.WUsername)}>Hire</button>
                                                    : ""
                                            }
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </div>

    )
}
export default Workbidder