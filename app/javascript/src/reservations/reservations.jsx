import React from 'react';
import Layout from '@src/layout';
import {handleErrors} from '@utils/fetchHelper';
import './reservations.scss';
class Reservations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userPropertyBookings: [],
        }
    }

    componentDidMount() {
        this.getUserPropertyBookings();
    }

    getUserPropertyBookings() {
        const username = this.props.data.username;
        console.log(username);

        fetch(`/api/users/${username}/properties/bookings`)
        .then(handleErrors)
        .then(data => {
            console.log('data: ', data);
            this.setState({
                userPropertyBookings: data.bookings,
            })
        })
    }

    render() {
        const {userPropertyBookings} = this.state;

        return(
            <Layout>

                <div className='container py-4'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h4 className='mb-0'>All reservations</h4>
                    </div>

                    {(userPropertyBookings.length !== 0) 
                    ?  
                        <div>
                            <div className='reservations-header-row p-4 mb-1'>
                                <div className='row no-gutters d-flex justify-content-between align-items-center text-center'>
                                    <div className='col-2'>
                                        <p className='mb-2'>Property Image</p>
                                    </div>
                                    <div className='col-2'>
                                        <p className='mb-2'>Title</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>Property ID</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>Start Date</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>End Date</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>Booked by</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>Payment Status</p>
                                    </div>
                                    <div className='col-2'>
                                        <p className='mb-2'></p>
                                    </div>
                                </div>

                            </div>

                        

                            {userPropertyBookings.map(booking => {
                                return(
                            <div key={booking.id} id={booking.id} className='reservations-wrap p-4 mb-3'>
                                <div className='row no-gutters d-flex justify-content-between align-items-center text-center'>
                                    <div className='col-2'>
                                        <div className='property-image rounded' style={{backgroundImage: `url(${escape(booking.property.image)})`}}></div>
                                    </div>
                                    <div className='col-2'>
                                        <p className='mb-2'>{booking.property.title}</p>
                                    </div>
                                    <div className='col-1'> 
                                        <p className='mb-2'>{booking.property.id}</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>{booking.start_date}</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>{booking.end_date}</p>
                                    </div>
                                    <div className='col-1'>
                                        <p className='mb-2'>{booking.user.username}</p>
                                    </div>

                                    {(booking.is_paid)
                                    ?
                                    
                                    <div className='col-1'>
                                    <p className='mb-2 text-success'>PAID</p> 
                                    </div>

                                    :

                                    <div className='col-1'>
                                        <p className='mb-2 text-danger'>PENDING</p> 
                                    </div>
                                    }

                                    <div className="col-2 d-inline-flex justify-content-center">
                                        <button type="button" className="btn btn-danger btn-sm">Send a message to the guest</button>
                                    </div>
                                </div>
                            </div>
                            )
                         })}
                        </div>
                        :
                        <div className="border border-secondary rounded text-center">
                            <p className="py-4 mb-0">Your properties don't have any active reservations at the moment.</p>
                        </div>
                        }
                </div>
            </Layout>
        )
    }
}

export default Reservations;